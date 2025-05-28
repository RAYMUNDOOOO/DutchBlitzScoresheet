import { writable } from 'svelte/store';

// ROUND INFORMATION
export const hasRoundStarted = writable(false);     // Boolean to indicate if the round has started
export const timeRoundStarted = writable(0);        // Set initially on round start to keep track of time elapsed in round
export const numPlayersReady = writable(0);

// WINNERS
export const winners: string[] = [];
export const addWinner = (name: string) => {
    winners.push(name);
}
export const removeWinner = (name: string) => {
    let index = winners.indexOf(name);
    if (index >= 0) {
        winners.splice(index, 1);
    }
}