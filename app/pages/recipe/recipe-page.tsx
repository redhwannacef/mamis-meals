import { Link } from "react-router";
import { recipes } from "virtual:recipes";
import {
  Page as NotebookPage,
  Header,
  Content,
  styles as notebookStyles,
} from "~/components/notebook/notebook";
import type { Route } from "./+types/recipe-page";
import styles from "./recipe-page.css?url";

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
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: notebookStyles },
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
          <Tags tags={recipe.tags} />
          <article
            className="lines"
            dangerouslySetInnerHTML={{ __html: recipe.html }}
          />
        </Content>
      </NotebookPage>
    </main>
  );
}

function Tags({ tags }: { tags: string[] }) {
  if (!tags.length) return null;

  return (
    <ul className="tags">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
