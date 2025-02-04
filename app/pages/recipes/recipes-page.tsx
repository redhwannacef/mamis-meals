import type { Route } from "./+types/recipes-page";
import { Link, redirect } from "react-router";
import { recipes as allRecipes, tags } from "virtual:recipes";
import {
  Page as NotebookPage,
  Header,
  Content,
  styles as notebookStyles,
} from "~/components/notebook/notebook";
import { Tags, styles as tagsStyles } from "~/components/tags/tags";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Recipes | Mami's Meals" },
    {
      name: "description",
      content: "A collection of recipes for family and friends.",
    },
  ];
}

export function links(): Route.LinkDescriptors {
  return [
    { rel: "stylesheet", href: tagsStyles },
    { rel: "stylesheet", href: notebookStyles },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const tag = searchParams.get("tag");
  if (tag === "All") return redirect("/recipes");
  if (!tag) return { tag: "All" };
  if (!tags.includes(tag)) return redirect("/recipes");
  return { tag };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const tag = loaderData.tag;
  const recipes =
    tag === "All"
      ? Object.values(allRecipes)
      : Object.values(allRecipes).filter((recipe) => recipe.tags.includes(tag));
  return (
    <main>
      <NotebookPage>
        <Header>
          <Link to="/">‹ Front Cover</Link>
          <h1>Recipes</h1>
        </Header>
        <Content>
          <Tags tags={tags} highlighted={tag} />
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.slug}>
                <Link to={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
              </li>
            ))}
          </ul>
        </Content>
      </NotebookPage>
    </main>
  );
}
