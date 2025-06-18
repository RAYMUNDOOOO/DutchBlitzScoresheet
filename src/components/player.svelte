<script lang="ts">
    import { UpdateScore } from '../game-state/PlayerRegistry.svelte.ts';
	let { id, name, score } = $props();
	let dutchPile: number = $state(0);
	let blitzPile: number = $state(0);
    let isReady: boolean = $state(false);
</script>

<div class="container">
	<h1>{name}</h1>
	<div>
		<label for="dutch-pile">Dutch pile</label>
		<input 
            type="number" 
            id="dutch-pile" 
            name="dutch-pile" 
            bind:value={dutchPile} 
            min="0" 
        />
	</div>
    <div>
		<label for="blitz-pile">Blitz pile</label>
		<input 
            type="number" 
            id="blitz-pile" 
            name="blitz-pile" 
            bind:value={blitzPile} 
            min="0" 
        />
    </div>
    <h1>Score: {score}</h1>
    <div>
        <label for="ready">Ready?</label>
        <input
            type="checkbox"
            id="ready"
            name="ready"
            bind:checked={isReady}
            onchange={() => {
                if (isReady) {
                    UpdateScore(id, dutchPile - blitzPile);
                } else {
                    UpdateScore(id, (dutchPile - blitzPile) * -1);
                }
            }}
        />
    </div>
</div>

<style>
	.container {
		display: flex;
	}
</style>
