import { writable } from 'svelte/store';

export const hasRoundStarted = writable(false);
export const timeRoundStarted = writable(0);