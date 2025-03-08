import { type Plugin } from "vite";
import fs from "node:fs/promises";
import graymatter from "gray-matter";
import type MarkdownIt from "markdown-it";
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
        const recipes = await getRecipes();
        const tags = getTags(recipes);
        return `export const recipes = ${JSON.stringify(recipes)}, tags = ${JSON.stringify(tags)};`;
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
  const markdownRenderer = getMarkdownRenderer();
  for (const recipeFile of await fs.readdir("./recipes")) {
    const recipe = await fs.readFile(`./recipes/${recipeFile}`, "utf-8");
    const { data, content } = graymatter(recipe);
    recipeMap[data["slug"]] = {
      title: data["title"],
      slug: data["slug"],
      tags: data["tags"] || [],
      html: markdownRenderer.render(content),
    };
  }
  return recipeMap;
}

function getMarkdownRenderer() {
  const markdown = markdownit();
  markdown.use(unwrapImagesPlugin);
  return markdown;
}

function getTags(recipeMap: Record<string, RecipeFile>) {
  const uniqueTags = new Set(
    Object.values(recipeMap).flatMap((recipe) => recipe.tags),
  );
  return Array.from(uniqueTags);
}

type RecipeFile = { slug: string; title: string; html: string; tags: string[] };

const extensionVariant: Record<string, string> = {
  webp: "photo",
  png: "sketch",
};

function unwrapImagesPlugin(md: MarkdownIt) {
  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const imageHtml = defaultRender(tokens, idx, options, env, self);

    const imageExtension = getExtension(tokens[idx]);
    const variant = extensionVariant[imageExtension] || "";

    return `<div class="image-wrapper" data-variant="${variant}"><div>${imageHtml}</div></div>`; // Wrap the image in a div instead of <p>
  };
}

// @ts-ignore
function getExtension(token: MarkdownIt.Token): string {
  const src = token.attrGet("src");
  if (!src) throw new Error("Image token has no src attribute");
  return src.split(".").pop();
}
