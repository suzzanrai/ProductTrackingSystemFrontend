import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "./src/app/routeTree.gen.ts",
      routesDirectory: "./src/routes"
    }),
    react(),
  ],
  
  resolve: {
    alias: {
      "@app": path.resolve(import.meta.dirname, "src/app"),
      "@components": path.resolve(import.meta.dirname, "src/components"),
      "@providers": path.resolve(import.meta.dirname, "src/app/providers"),
      "@pages": path.resolve(import.meta.dirname, "src/pages"),
      "@widgets": path.resolve(import.meta.dirname, "src/widgets"),
      "@features": path.resolve(import.meta.dirname, "src/features"),
      "@entities": path.resolve(import.meta.dirname, "src/entities"),
      "@shared": path.resolve(import.meta.dirname, "src/shared"),
    },
  },
});
