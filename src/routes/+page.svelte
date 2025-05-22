<script lang="ts">
    import Player from "../components/player.svelte";
    import { hasRoundStarted } from "../gameState.svelte";

    let playerNames: string[] = $state([]);
    const AddPlayer = () => {
        const name = prompt("Please enter new player's name:", "John");
        if (name) playerNames.push(name);
    }
</script>

{#each playerNames as name}
    <Player name={name} />
{/each}
<button onclick={AddPlayer} disabled={$hasRoundStarted}>Add player</button>
<button onclick={() => hasRoundStarted.set(!$hasRoundStarted)}>
    {$hasRoundStarted ? "End round" : "Start round"}
</button>