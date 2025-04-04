
import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env, set_safe_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\" amp style=\"background-color: #ffffff\" color-scheme=\"light\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta\n      name=\"description\"\n      content=\"Exploring the transformative impact of Large Language Models (LLMs) on research, creativity, and communication across various domains.\"\n    />\n    <link rel=\"icon\" href=\"og_images/favicon.ico\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    " + head + "\n\n    <noscript>\n      <style>\n        /**\n          * Reinstate scrolling for non-JS clients\n          */\n        .simplebar-content-wrapper {\n          scrollbar-width: auto;\n          -ms-overflow-style: auto;\n        }\n\n        .simplebar-content-wrapper::-webkit-scrollbar,\n        .simplebar-hide-scrollbar::-webkit-scrollbar {\n          display: initial;\n          width: initial;\n          height: initial;\n        }\n      </style>\n    </noscript>\n  </head>\n  <body data-sveltekit-preload-data=\"hover\">\n    <div class=\"major_div\" style=\"display: contents\">" + body + "</div>\n  </body>\n</html>\n\n<svelte:head>\n  <!-- Page Title -->\n  <title>Écologies des Pratiques LLMs (EL2MP)</title>\n\n  <!-- Canonical URL -->\n  <link rel=\"canonical\" href=\"https://medialab.github.io/EL2MP/\" />\n\n  <!-- Open Graph Meta Tags -->\n  <meta\n    property=\"og:logo\"\n    content=\"https://raw.githubusercontent.com/medialab/EL2MP/f2be408a5d92875040f0f0ba385a1fa67ad30b10/static/og_images/opengraph.jpg\"\n  />\n  <meta property=\"og:type\" content=\"website\" />\n  <meta property=\"og:title\" content=\"Écologies des Pratiques LLMs (EL2MP)\" />\n  <meta\n    property=\"og:description\"\n    content=\"Exploring the transformative impact of Large Language Models (LLMs) on research, creativity, and communication across various domains.\"\n  />\n  <meta property=\"og:url\" content=\"https://medialab.github.io/EL2MP/\" />\n  <meta\n    property=\"og:image\"\n    content=\"https://raw.githubusercontent.com/medialab/EL2MP/f2be408a5d92875040f0f0ba385a1fa67ad30b10/static/og_images/opengraph.jpg\n    \"\n  />\n  <meta\n    property=\"og:image:alt\"\n    content=\"Écologies des Pratiques LLMs (EL2MP) Logo\"\n  />\n  <meta\n    property=\"og:site_name\"\n    content=\"Écologies des Pratiques LLMs (EL2MP)\"\n  />\n\n  <!-- Instant Articles Meta Tags -->\n  <meta property=\"ia:markup_url\" content=\"https://medialab.github.io/EL2MP/\" />\n  <meta\n    property=\"ia:markup_url_dev\"\n    content=\"https://medialab.github.io/EL2MP/dev/\"\n  />\n  <meta\n    property=\"ia:rules_url\"\n    content=\"https://medialab.github.io/EL2MP/rules/\"\n  />\n  <meta\n    property=\"ia:rules_url_dev\"\n    content=\"https://medialab.github.io/EL2MP/rules-dev/\"\n  />\n\n  <!-- Twitter Card Meta Tags -->\n  <meta name=\"twitter:card\" content=\"summary_large_image\" />\n  <meta name=\"twitter:title\" content=\"Écologies des Pratiques LLMs (EL2MP)\" />\n  <meta\n    name=\"twitter:description\"\n    content=\"Exploring the transformative impact of Large Language Models (LLMs) on research, creativity, and communication across various domains.\"\n  />\n  <meta\n    name=\"twitter:image\"\n    content=\"https://raw.githubusercontent.com/medialab/EL2MP/f2be408a5d92875040f0f0ba385a1fa67ad30b10/static/og_images/opengraph.jpg\n    \"\n  />\n  <meta\n    name=\"twitter:image:alt\"\n    content=\"Écologies des Pratiques LLMs (EL2MP) Logo\"\n  />\n  <meta name=\"twitter:site\" content=\"@your_twitter_handle\" />\n  <meta name=\"twitter:creator\" content=\"@your_twitter_handle\" />\n\n  <!-- Author and Publish Date (for LinkedIn, Facebook) -->\n  <meta name=\"author\" content=\"Médialab, Sciences Po\" />\n  <meta name=\"article:published_time\" content=\"2025-01-01T12:00:00+00:00\" />\n  <!-- Replace with actual publish date -->\n\n  <!-- Favicon -->\n  <link rel=\"icon\" href=\"og_images/favicon.ico\" />\n</svelte:head>\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "4l7ziu"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let init;
	({ handle, handleFetch, handleError, init } = await import("../../../src/hooks.server.js"));

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation, set_safe_public_env };
