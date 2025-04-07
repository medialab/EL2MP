import { writable } from "svelte/store";

export const selectedCard = writable("Qualifying");
export const isAlterEgoMode = writable(true);

export const currentCardColor = writable("white");
