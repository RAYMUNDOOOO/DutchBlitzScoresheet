<script lang="ts">
    import { hasRoundStarted } from "../gameState.svelte";
    import { onDestroy } from "svelte";

    let { name } = $props();

    let dutchPile: number = $state(0);
    let blitzPile: number = $state(0);
    let score: number = 0;
    let displayedScore: number = $state(0);

    let isReady: boolean = $state(false);
    let hasWon: boolean = $derived.by(() => {
        let hasWon = false;
        if (score >= 75) hasWon = true;
        return hasWon;
    });

    function updateScore() {
        if (isReady) {
            displayedScore = score;
            displayedScore += (dutchPile - blitzPile);
        } else {
            displayedScore = score;
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
        <input type="checkbox" id="ready" bind:checked={isReady} onchange={updateScore} name="ready" />
    </div>
</div>