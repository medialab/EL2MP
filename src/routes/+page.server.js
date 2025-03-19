/* THIS IS PAGE.SERVER.JS */
/** @type {import('./$types').PageLoad} */

export const prerender = true;
export const trailingSlash = "always";

import { mergeAlias } from "vite";
import { config as configs } from "$database/config.js";
import { onMount } from "svelte";
import backgroundImage from "$media/Dot_background.png?enhanced";
import { id } from "date-fns/locale";
import { photos, capitolsCover, general } from "$database/config.js";

import {
  cardsDb,
  floatersDb,
  alterEgosDb,
  projectDescription,
} from "$database/global_db.js";

export function load({ params }) {
  return {
    backgroundImage,
    logoImage: general.logoImage,
    circular_logo: general.circle_logo,
    cardsDb,
    floatersDb,
    alterEgosDb,
    projectDescription,
    condensed_logo: general.condensed_logo,
    condensed_logo_white: general.condensed_logo_white,
  };
}

/*
//this below is a test to fetching things from a JSON

//console.log("Photos:", configs.photos);
//console.log("Capitols Cover:", configs.capitolsCover);
//console.log("General:", configs.general);

const defaultImage = { default: "$media/photos/img1.jpg?enhanced" };
const defaultLogo = "$media/photos/img1.jpg?enhanced";
const defaultFloater = "$media/photos/img1.jpg?enhanced";

export async function load({ fetch }) {
  let db;

  try {
    const response = await fetch("/global_db.json"); // Use the correct path to your JSON file
    if (!response.ok) {
      throw new Error(`Failed to fetch database: ${response.statusText}`);
    }

    db = await response.json();
    resolveConfigs(db);
  } catch (error) {
    console.error("Error fetching the database:", error);
    return {
      error: true,
    };
  }

  const { cardsDb, floatersDb, projectDescription } = db;

  //console.log("cardsDb", cardsDb);

  return {
    backgroundImage,
    logoImage: configs.general["logo_complete.svg"]?.default,
    cardsDb,
    floatersDb,
    projectDescription,
    condensed_logo: configs.general["logo_condensed.svg"]?.default,
  };
}

const resolveConfigs = (db) => {
  for (const cardKey in db.cardsDb) {
    const card = db.cardsDb[cardKey];

    // Resolve CoverImg
    if (card.CoverImg && card.CoverImg.trim() !== "") {
      const photoModule = configs.photos[`$lib/media/photos/${card.CoverImg}`];
      if (photoModule) {
        card.CoverImg = photoModule.default;
      } else {
        console.warn("CoverImg not found:", card.CoverImg);
        card.CoverImg = defaultImage;
      }
    } else {
      console.warn("CoverImg not provided for card:", cardKey);
      card.CoverImg = defaultImage;
    }

    // Resolve Content pictures
    card.Content.forEach((content, idx) => {
      if (content.picture && content.picture.trim() !== "") {
        const photoModule =
          configs.photos[`$lib/media/photos/${content.picture}`];
        if (photoModule) {
          content.picture = photoModule.default;
        } else {
          console.warn("Content picture not found:", content.picture);
          content.picture = defaultImage;
        }
      } else {
        console.warn(
          "Content picture not provided in card",
          cardKey,
          "at index",
          idx
        );
        content.picture = defaultImage;
      }
    });

    // Resolve logoImage
    if (card.logoImage && card.logoImage.trim() !== "") {
      const generalModule = configs.general[`$lib/media/${card.logoImage}`];
      if (generalModule) {
        card.logoImage = generalModule.default;
      } else {
        console.warn("logoImage not found:", card.logoImage);
        card.logoImage = defaultLogo;
      }
    } else {
      console.warn("logoImage not provided for card:", cardKey);
      card.logoImage = defaultLogo;
    }
  }

  for (const floaterKey in db.floatersDb) {
    const floater = db.floatersDb[floaterKey];

    // Resolve Floater Images
    if (floater.Img && floater.Img.trim() !== "") {
      const photoModule = configs.photos[`$lib/media/photos/${floater.Img}`];
      if (photoModule) {
        floater.Img = photoModule.default;
      } else {
        console.warn("Floater Img not found:", floater.Img);
        floater.Img = defaultFloater;
      }
    } else {
      console.warn("Floater Img not provided for floater:", floaterKey);
      floater.Img = defaultFloater;
    }
  }
};
*/
