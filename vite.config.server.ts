import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    ssr: path.resolve(__dirname, "server/node-build.ts"), // Entry for SSR
    outDir: path.resolve(__dirname, "dist/server"),       // Output folder
    target: "node22",                                     // Node target
    rollupOptions: {
      external: [
        // Node built-ins
        "fs","path","url","http","https","os","crypto","stream",
        "util","events","buffer","querystring","child_process",
        // Dependencies not to bundle
        "express","cors"
      ],
      output: {
        format: "es",
        entryFileNames: "[name].mjs"
      }
    },
    minify: false,    // Keep readable for debugging
    sourcemap: true,  // Useful for stack traces
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
    dedupe: ["react","react-dom"]
  },
  define: {
    "process.env.NODE_ENV": '"production"'
  }
});
