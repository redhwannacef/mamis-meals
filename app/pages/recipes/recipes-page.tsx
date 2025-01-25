import type { Route } from "./+types/recipes-page";
import style from "./recipes-page.css?url";
import { Link } from "react-router";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Mami's Meals | Recipes" },
    {
      name: "description",
      content: "A collection of recipes for family and friends.",
    },
  ];
}

export function links(): Route.LinkDescriptors {
  return [{ rel: "stylesheet", href: style }];
}

export function clientLoader() {
  return {
    recipes: [
      {
        title: "Msemmen",
        slug: "msemmen",
      },
    ],
  };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { recipes } = loaderData;

  return (
    <main>
      <section id="notebook">
        <header>
          <Link to="/">‹ Front Cover</Link>
          <h1>Recipes</h1>
        </header>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.slug}>
              <Link to={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
