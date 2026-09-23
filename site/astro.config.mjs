// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { openExternalLinks } from "./src/lib/open-external-links.ts";
import { stripAuthoredHeader } from "./src/lib/strip-authored-header.ts";

// Share cards need absolute URLs. Previews point at their own deployment so a
// preview's cards show that preview's images.
const vercelHost =
  (process.env.VERCEL_ENV === "production" &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  process.env.VERCEL_URL;
const site = vercelHost ? `https://${vercelHost}` : "http://localhost:4321";

export default defineConfig({
  site,
  integrations: [icon(), react()],
  markdown: {
    // defaultColor:false emits both themes as custom properties rather than
    // baking one in, so global.css can pick between them with light-dark().
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-dimmed" },
      defaultColor: false,
    },
    processor: satteri({
      mdastPlugins: [stripAuthoredHeader],
      hastPlugins: [openExternalLinks],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    // OG images use a native Node binding; Vite's client optimizer cannot bundle it.
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
    // Summaries live outside site/, so the dev server has to read up a level.
    server: { fs: { allow: [".."] } },
  },
});
