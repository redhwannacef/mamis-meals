import type { Route } from "./+types/recipes-page";
import style from "./recipes-page.css?url";
import { Link } from "react-router";
import { recipes } from "virtual:recipes";

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

export default function Page() {
  return (
    <main>
      <section id="notebook">
        <header>
          <Link to="/">‹ Front Cover</Link>
          <h1>Recipes</h1>
        </header>
        <ul>
          {Object.values(recipes).map((recipe) => (
            <li key={recipe.slug}>
              <Link to={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
