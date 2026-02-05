import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        recipeDetails: resolve(__dirname, "src/recipe-details/index.html"),
        favorites: resolve(__dirname, "src/favorites.html"),
      },
    },
  },
});
