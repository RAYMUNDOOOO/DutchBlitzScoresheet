<script lang="ts">
    import Player from "../components/player.svelte";
    import { hasRoundStarted } from "../gameState.svelte";

    let playerNames: string[] = $state([]);
    const AddPlayer = () => {
        const name = prompt("Please enter new player's name:", "John");
        if (name) playerNames.push(name);
    }
</script>

<style>
    button {
        border-color: black;
        border-width: 1px;
        border-radius: 3px;
    }
</style>

{#each playerNames as name}
    <Player name={name} />
{/each}
<button onclick={AddPlayer} disabled={$hasRoundStarted}>Add player</button>
<button 
    style={$hasRoundStarted ? "color: red" : "color: green"} 
    onclick={() => hasRoundStarted.set(!$hasRoundStarted)}
    >
    {$hasRoundStarted ? "End round" : "Start round"}
</button>