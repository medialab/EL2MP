import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.CKHF2km3.js","_app/immutable/chunks/IBrRsL71.js","_app/immutable/chunks/xfYQIRJl.js","_app/immutable/chunks/DMjyJ-JH.js","_app/immutable/chunks/DTAO8KxP.js","_app/immutable/chunks/DeyAs8CV.js","_app/immutable/chunks/CKMTV11-.js"];
export const stylesheets = ["_app/immutable/assets/2.DzNUNAFM.css"];
export const fonts = [];
