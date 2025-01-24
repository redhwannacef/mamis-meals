import type { Route } from "./+types/home-page";
import style from "./home-page.css?url";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Mami's Meals" },
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
      <header id="notebook-header">
        <h1>Mamis Meals</h1>
        <h2>A collection of recipes for family and friends, enjoy!</h2>
      </header>
    </main>
  );
}
