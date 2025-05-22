<script lang="ts">
    import { hasRoundStarted } from "../gameState.svelte";

    let name: string = "John";
    let dutchPile: number = $state(0);
    let blitzPile: number = $state(0);
    let score: number = $state(0);
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
    <p>Score: {dutchPile - blitzPile}</p>
</div>