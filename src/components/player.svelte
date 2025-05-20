<script lang="ts">
    let name: string = "John";
    let dutchPile: number = 0;
    let blitzPile: number = 0;
    let score: number = 0;
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
        <input type="number" id="dutch-pile" name="dutch-pile" min=0 value=0 />
    </div>
    <div>
        <label for="blitz-pile">Blitz pile</label>
        <input type="number" id="blitz-pile" name="blitz-pile" min=0 value=0 />
    </div>
    <p>Score: {score}</p>
</div>