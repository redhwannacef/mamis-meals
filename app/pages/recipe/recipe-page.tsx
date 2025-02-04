import { Link } from "react-router";
import { recipes } from "virtual:recipes";
import {
  Page as NotebookPage,
  Header,
  Content,
  styles as notebookStyles,
} from "~/components/notebook/notebook";
import type { Route } from "./+types/recipe-page";
import { Tags, styles as tagsStyles } from "~/components/tags/tags";

export function meta({ params }: Route.MetaArgs): Route.MetaDescriptors {
  const title = recipes[params.slug]?.title || "Not Found";
  return [
    { title: `${title} | Mami's Meals` },
    {
      name: "description",
      content: "A collection of recipes for family and friends.",
    },
  ];
}

export function links(): Route.LinkDescriptors {
  return [
    { rel: "stylesheet", href: notebookStyles },
    { rel: "stylesheet", href: tagsStyles },
  ];
}

export default function Page({ params }: Route.ComponentProps) {
  const recipe = recipes[params.slug];
  if (!recipe) throw new Error("Recipe not found");
  return (
    <main>
      <NotebookPage>
        <Header>
          <Link to="/recipes">‹ Recipes</Link>
          <h1>{recipe.title}</h1>
        </Header>
        <Content>
          <Tags tags={recipe.tags} hideAllTag />
          <article
            className="lines"
            dangerouslySetInnerHTML={{ __html: recipe.html }}
          />
        </Content>
      </NotebookPage>
    </main>
  );
}
