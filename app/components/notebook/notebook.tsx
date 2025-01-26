import type { ComponentProps } from "react";

export { default as styles } from "./notebook.css?url";

export function Page(props: ComponentProps<"section">) {
  return <section id="notebook" {...props} />;
}

export function Header(props: ComponentProps<"header">) {
  return <header {...props} />;
}

export function Content(props: ComponentProps<"article">) {
  return (
    <section>
      <article id="content" {...props} />
    </section>
  );
}
