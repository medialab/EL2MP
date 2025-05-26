import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    paths: {
      base: "",
    },

    adapter: adapter({}),

    alias: {
      $styles: "/src/lib/styles",
      $media: "src/lib/media",
      $database: "src/lib/database",
      $routes: "src/routes",
      $videos: "src/lib/media/videos",
    },

    inlineStyleThreshold: Infinity,
  },
};

export default config;
