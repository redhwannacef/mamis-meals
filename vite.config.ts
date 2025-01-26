import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "node:fs/promises";
import markdownit from "markdown-it";
import graymatter from "gray-matter";

export default defineConfig({
  base: "/mamis-meals/",
  plugins: [reactRouter(), tsconfigPaths(), recipesMdPlugin()],
});

type RecipeFile = { slug: string; title: string; html: string };

function recipesMdPlugin() {
  const virtualModuleId = "virtual:recipes";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "recipes-md",
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const recipeMap: Record<string, RecipeFile> = {};
        for (const recipeFile of await fs.readdir("./recipes")) {
          const recipe = await fs.readFile(`./recipes/${recipeFile}`, "utf-8");
          const { data, content } = graymatter(recipe);
          recipeMap[data["slug"]] = {
            title: data["title"],
            slug: data["slug"],
            html: markdownit().render(content),
          };
        }

        return `export const recipes = ${JSON.stringify(recipeMap)}`;
      }
    },
  };
}
