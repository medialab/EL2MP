import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";

// vite.config.js

export default defineConfig({
  plugins: [
    enhancedImages({
      // Preserve original format and don't auto-convert to PNG
      imagetools: {
        defaultDirectives: (url) => {
          console.log("🖼️ Processing image:", url.pathname);
          const params = new URLSearchParams({
            format: "jpg", // Keep as JPEG
            quality: "80", // Good compression
          });
          console.log("📐 Applied directives:", params.toString());
          return params;
        },
      },
    }),
    sveltekit(),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  server: {
    port: 3000, // Change this number to your desired port
    strictPort: true, // This will fail if the port is already in use
    https: {
      key: "./localhost+3-key.pem",
      cert: "./localhost+3.pem",
    }, // Enable HTTPS with trusted certificates
    host: "0.0.0.0", // Allow external access (for mobile testing)
  },
  preview: {
    https: {
      key: "./localhost+3-key.pem",
      cert: "./localhost+3.pem",
    },
    host: "0.0.0.0", // Allow external access (for mobile testing)
  },
  build: {
    rollupOptions: {
      // Nothing to see here
    },
  },
});
