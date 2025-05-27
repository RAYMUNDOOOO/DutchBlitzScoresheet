import { writable } from 'svelte/store';

// ROUND INFORMATION
export const hasRoundStarted = writable(false);     // Boolean to indicate if the round has started
export const timeRoundStarted = writable(0);        // Set initially on round start to keep track of time elapsed in round
export let readyChecks = $state({
    numPlayersReady: 0
})