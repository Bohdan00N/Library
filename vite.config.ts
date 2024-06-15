import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { ghPages } from 'vite-plugin-gh-pages';

// const repoName = 'library'
export default defineConfig({
  plugins: [react(), ghPages()],
  // base:`/${repoName}/`,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/main.tsx')
    }
  },
  server: {
    open: true,
  },
})