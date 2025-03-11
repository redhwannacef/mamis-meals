declare module "virtual:recipes" {
  type Recipe = {
    title: string;
    slug: string;
    html: string;
    tags: string[];
    images: string[];
  };

  export const recipes: Record<string, Recipe>, tags: string[];
}
