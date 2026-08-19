import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Served from https://nytsu.github.io/ — repo name matches the username, so this is a
// GitHub *user site* and lives at the domain root. base stays "/".
// If this ever moves to a project repo (nytsu.github.io/<repo>/), base must become "/<repo>/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    // Multi-page, statically generated per route — no client-side router.
    // Each entry builds its own real index.html, so GitHub Pages serves
    // /justin/ directly with no SPA-fallback trick required.
    //
    // Plain strings, not path.resolve(__dirname, ...): rollupOptions.input
    // paths are already resolved relative to the project root, and this file
    // has no @types/node available for __dirname.
    rollupOptions: {
      input: {
        main: "index.html",
        justin: "justin/index.html",
      },
    },
  },
});
