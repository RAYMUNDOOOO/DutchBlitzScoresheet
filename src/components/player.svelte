<script lang="ts">
	let { name, score } = $props();
	let dutchPile: number = $state(0);
	let blitzPile: number = $state(0);

    const BroadcastReady = () => {
        console.log("Ready!");
    }
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
            onchange={BroadcastReady}
        />
    </div>
</div>

<style>
	.container {
		display: flex;
	}
</style>
