import type { Route } from "./+types/recipes-page";
import { Link } from "react-router";
import { recipes } from "virtual:recipes";
import {
  Page as NotebookPage,
  Header,
  Content,
  styles as notebookStyles,
} from "~/components/notebook/notebook";

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
  return [{ rel: "stylesheet", href: notebookStyles }];
}

export default function Page() {
  return (
    <main>
      <NotebookPage>
        <Header>
          <Link to="/">‹ Front Cover</Link>
          <h1>Recipes</h1>
        </Header>
        <Content>
          <ul>
            {Object.values(recipes).map((recipe) => (
              <li key={recipe.slug}>
                <Link
                  to={`/recipes/${recipe.slug}`}
                  onMouseEnter={() => prefetchImages(recipe.images)}
                  onFocus={() => prefetchImages(recipe.images)}
                >
                  {recipe.title}
                </Link>
              </li>
            ))}
          </ul>
        </Content>
      </NotebookPage>
    </main>
  );
}

function prefetchImages(images: string[]) {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
