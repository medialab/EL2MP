// Enable/disable SSR
export const ssr = true;

// Configure hydration
export const csr = true;

// Configure prerendering
export const prerender = true;

// Configure preloading
export const load = async () => {
  return {
    dependencies: ["og_images/background.png"],
  };
};
