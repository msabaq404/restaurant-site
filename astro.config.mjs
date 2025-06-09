// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
// https://astro.build/config
export default defineConfig({
  server: {
    allowedHosts: true
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['svelte']
    },
  },

  integrations: [
    svelte({
      preprocess: [],
      compilerOptions: {
        dev: true
      }
    })
  ],
  base: "/restaurant-site"
});