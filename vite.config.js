import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";

// vite.config.js

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  },
  server: {
    port: 3000, // Change this number to your desired port
    strictPort: true, // This will fail if the port is already in use
  },
  build: {
    rollupOptions: {
      // Nothing to see here
    },
  },
});
