// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    tailwindcss(),
    // ...,
  ],
  // base: "/",
  // server: {
  //   host: "0.0.0.0",
  //   port: 4173,
  //   proxy: {
  //     "/api": {
  //       target: "API URL",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
