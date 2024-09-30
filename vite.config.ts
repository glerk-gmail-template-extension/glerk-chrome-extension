import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { resolve } from "path";
import { manifest } from "./manifest.config";

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        content: resolve(__dirname, "src/pages/content/index.tsx"),
        background: resolve(__dirname, "src/pages/background/index.ts"),
      },
      output: {
        chunkFileNames: "assets/chunk-[hash].js",
      },
    },
  },
});
