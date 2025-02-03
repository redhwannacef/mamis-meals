import { type Plugin } from "vite";
import fs from "node:fs/promises";
import graymatter from "gray-matter";
import markdownit from "markdown-it";

export function recipesMdPlugin(): Plugin {
  const virtualModuleId = "virtual:recipes";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "recipes-md",

    configureServer({ watcher }) {
      watcher.add("recipes");
    },

    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },

    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const recipeMap = await getRecipes();
        return `export const recipes = ${JSON.stringify(recipeMap)}`;
      }
    },

    async handleHotUpdate({ file, server }) {
      if (file.startsWith("recipes")) {
        const module = server.moduleGraph.getModuleById(
          resolvedVirtualModuleId,
        );
        if (!module) return;
        server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      }
    },
  };
}

export async function getRecipes() {
  const recipeMap: Record<string, RecipeFile> = {};
  for (const recipeFile of await fs.readdir("./recipes")) {
    const recipe = await fs.readFile(`./recipes/${recipeFile}`, "utf-8");
    const { data, content } = graymatter(recipe);
    recipeMap[data["slug"]] = {
      title: data["title"],
      slug: data["slug"],
      tags: data["tags"] || [],
      html: markdownit().render(content),
    };
  }
  return recipeMap;
}

type RecipeFile = { slug: string; title: string; html: string; tags: string[] };
