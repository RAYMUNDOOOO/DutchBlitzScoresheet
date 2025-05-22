<script lang="ts">
    import { hasRoundStarted } from "../gameState.svelte";
    import { onDestroy } from "svelte";

    let { name } = $props();
    let dutchPile: number = $state(0);
    let blitzPile: number = $state(0);
    let score: number = $state(0);

    const unsubscribe = hasRoundStarted.subscribe((started) => {
        if (started) {
            let roundScore = dutchPile - blitzPile;
            score += roundScore;

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
    <h1>{name}</h1>
    <div>
        <label for="dutch-pile">Dutch pile</label>
        <input type="number" id="dutch-pile" bind:value={dutchPile} name="dutch-pile" min=0 disabled={$hasRoundStarted} />
    </div>
    <div>
        <label for="blitz-pile">Blitz pile</label>
        <input type="number" id="blitz-pile" bind:value={blitzPile} name="blitz-pile" min=0 disabled={$hasRoundStarted}/>
    </div>
    <p>Score: {score}</p>
</div>