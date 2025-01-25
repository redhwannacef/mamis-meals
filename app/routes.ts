import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/home-page.tsx"),
  route("recipes", "pages/recipes/recipes-page.tsx"),
] satisfies RouteConfig;
