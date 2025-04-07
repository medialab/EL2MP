/* THIS IS PAGE.SERVER.JS */
/** @type {import('./$types').PageLoad} */

export const prerender = true;
export const trailingSlash = "always";

import { mergeAlias } from "vite";
import { config as configs } from "$database/config.js";
import { onMount } from "svelte";

import backgroundImage from "$media/logos/Dot_background.png?enhanced";

import { id } from "date-fns/locale";
import { photos, capitolsCover, general } from "$database/config.js";

import { cardsDb, floatersDb, alterEgosDb } from "$database/global_db.js";

export function load({ params }) {
  return {
    backgroundImage,
    logoImage: general.logoImage,
    circular_logo: general.circle_logo,
    cardsDb,
    floatersDb,
    alterEgosDb,
    condensed_logo: general.condensed_logo,
    condensed_logo_white: general.condensed_logo_white,
  };
}
