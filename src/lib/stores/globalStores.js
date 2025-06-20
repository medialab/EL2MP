import { writable } from "svelte/store";

export const selectedCard = writable("Qualifying");
export const isAlterEgoMode = writable(true);

export const currentCardColor = writable("white");
export const highestZIndex = writable(4);
export const lastCardColor = writable(null);

export const isDesktop = writable(null);
export const isMobileDevice = writable(null);

export const isFirstReset = writable(true);

export const transitionTime = 1;
export const transitionCurve = "ease-in-out";

export const startX = writable(null);
export const startY = writable(null);

export const currentFocus = writable(null);
export const currentHash = writable(null);

// Page load tracking stores

export const isPageLoaded = writable(false);
export const showSharer = writable(false);
export const finalShareData = writable(null);
export const sharerVisibility = writable(false);
export const sharingTextMobile = writable("We're preparing your image...");

export const shareInfo = writable({
  title: "", // Block title
  exTitle: "", // Exercise title
  text: "", // Social message body
  url: "", // Absolute URL to the exercise
});
