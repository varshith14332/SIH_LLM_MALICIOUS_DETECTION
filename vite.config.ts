import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: path.resolve(__dirname, "client"), // Root is client folder
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./src", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/spa"), // Output folder for Vercel
    emptyOutDir: true, // Clear folder before build
    rollupOptions: {
      input: path.resolve(__dirname, "client/src/index.html"), // SPA entry point
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"), // src alias
      "@shared": path.resolve(__dirname, "shared"),
      // Force single React copy to avoid invalid hook calls
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom"],
  },
}));
