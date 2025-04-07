import * as server from '../entries/pages/_page.server.js';
import stylesheet_2 from '../stylesheets/2.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.BKYlsmrQ.js","_app/immutable/chunks/CCL35J2P.js","_app/immutable/chunks/CRk2hgVu.js","_app/immutable/chunks/-Ts6F4AD.js","_app/immutable/chunks/BscLUmOG.js","_app/immutable/chunks/BQd6-EzH.js","_app/immutable/chunks/C06XQsmi.js","_app/immutable/chunks/BN_nbJLP.js"];
export const stylesheets = ["_app/immutable/assets/2.COgWUHki.css"];
export const fonts = [];
export const inline_styles = () => ({
	"_app/immutable/assets/2.COgWUHki.css": stylesheet_2
});
