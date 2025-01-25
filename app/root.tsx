import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinkDescriptor,
} from "react-router";
import type { Route } from "./+types/root";
import resetStyles from "./styles/reset.css?url";
import fontsStyles from "./styles/fonts.css?url";
import globalStyles from "./styles/global.css?url";

export function links(): Route.LinkDescriptors {
  return [
    preloadFont("/fonts/Kalam-Light.ttf"),
    preloadFont("/fonts/Kalam-Regular.ttf"),
    preloadFont("/fonts/Kalam-Bold.ttf"),
    { rel: "stylesheet", href: resetStyles },
    { rel: "stylesheet", href: fontsStyles },
    { rel: "stylesheet", href: globalStyles },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

function preloadFont(href: string): LinkDescriptor {
  return {
    rel: "preload",
    as: "font",
    href,
    type: "font/ttf",
    crossOrigin: "anonymous",
  };
}
