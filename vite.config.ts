import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { recipesMdPlugin } from "./recipesMdPlugin";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), recipesMdPlugin()],
});
