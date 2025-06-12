import { writable } from "svelte/store";

export const selectedCard = writable("Qualifying");
export const isAlterEgoMode = writable(true);

export const currentCardColor = writable("white");
export const highestZIndex = writable(4);
export const lastCardColor = writable(null);

export const isDesktop = writable(null);
export const isMobileDevice = writable(null);

export const isFirstReset = writable(true);

export const transitionTime = 1.5;

export const startX = writable(null);
export const startY = writable(null);
