

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.D0Dx5IAy.js","_app/immutable/chunks/DTAO8KxP.js","_app/immutable/chunks/xfYQIRJl.js"];
export const stylesheets = [];
export const fonts = [];
