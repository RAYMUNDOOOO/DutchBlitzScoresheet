<script lang="ts">
    import Player from "../components/player.svelte";
    import { hasRoundStarted } from "../gameState.svelte";

    let numPlayers: number[] = $state([]);
    const AddPlayer = () => {
        numPlayers.push(numPlayers.length);
    }
</script>

{#each numPlayers as player}
    <Player />
{/each}
<button onclick={AddPlayer} disabled={$hasRoundStarted}>Add player</button>
<button onclick={() => hasRoundStarted.set(!$hasRoundStarted)}>
    {$hasRoundStarted ? "End round" : "Start round"}
</button>