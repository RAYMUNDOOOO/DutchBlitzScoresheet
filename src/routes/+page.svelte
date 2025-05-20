<script lang="ts">
    import Player from "../components/player.svelte";

    let numPlayers: number[] = $state([]);
    const AddPlayer = () => {
        numPlayers.push(numPlayers.length);
    }
</script>

<button onclick={AddPlayer}>Add player</button>
{#each numPlayers as player}
    <Player />
{/each}