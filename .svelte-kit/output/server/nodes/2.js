import * as server from '../entries/pages/_page.server.js';
import stylesheet_2 from '../stylesheets/2.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.BnK-aC4H.js","_app/immutable/chunks/Clu_m_3U.js","_app/immutable/chunks/CfUOohTe.js","_app/immutable/chunks/CJ3UEpp_.js","_app/immutable/chunks/CkJT2ZpQ.js","_app/immutable/chunks/CJz518lz.js","_app/immutable/chunks/DNqrX47K.js","_app/immutable/chunks/o3RMZ0sa.js"];
export const stylesheets = ["_app/immutable/assets/2.COUiI6HW.css"];
export const fonts = [];
export const inline_styles = () => ({
	"_app/immutable/assets/2.COUiI6HW.css": stylesheet_2
});
