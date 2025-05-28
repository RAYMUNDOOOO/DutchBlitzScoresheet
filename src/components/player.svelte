<script lang="ts">
    import { hasRoundStarted, numPlayersReady, addWinner, removeWinner } from "../gameState.svelte";
    import { onDestroy } from "svelte";

    let { name } = $props();

    let dutchPile: number = $state(0);
    let blitzPile: number = $state(0);
    let score: number = 0;
    let displayedScore: number = $state(0);

    let isReady: boolean = $state(false);
    let hasWon: boolean = $derived.by(() => {
        let hasWon = false;
        if (displayedScore >= 75) {
            hasWon = true;
            addWinner(name);
        } else {
            removeWinner(name);
        }

        return hasWon;
    });

    /**
     * When the player is ready, update their displayed score and add to the ready check counter so the 
     * main page knows whether everyone is ready to start the round.
     * 
     * If the player is not ready, don't update their displayed score and decrement the ready check counter
     * so the main page knows not everyone is ready to start the round.
     */
    function onReady() {
        if (isReady) {
            displayedScore = score;
            displayedScore += (dutchPile - blitzPile);
            $numPlayersReady++;
        } else {
            displayedScore = score;
            $numPlayersReady--;
        }
    }

    const unsubscribe = hasRoundStarted.subscribe((started) => {
        if (started) {
            score = displayedScore;
            isReady = false;
            dutchPile = 0;
            blitzPile = 0;
        }
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<style>
    #player-container {
        display: flex;
    }
</style>

<div id="player-container">
    <h1 style={hasWon ? "color: green" : "color: black"}>{name}</h1>
    <div>
        <label for="dutch-pile">Dutch pile</label>
        <input type="number" id="dutch-pile" bind:value={dutchPile} name="dutch-pile" min=0 disabled={$hasRoundStarted} />
    </div>
    <div>
        <label for="blitz-pile">Blitz pile</label>
        <input type="number" id="blitz-pile" bind:value={blitzPile} name="blitz-pile" min=0 disabled={$hasRoundStarted}/>
    </div>
    <p>Score: {displayedScore}</p>
    <div>
        <label for="ready">Ready?</label>
        <input type="checkbox" id="ready" bind:checked={isReady} onchange={onReady} name="ready" disabled={$hasRoundStarted} />
    </div>
</div>