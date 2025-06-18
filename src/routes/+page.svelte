<script lang="ts">
    import { PlayerRegistry } from "../game-state/PlayerRegistry.svelte.ts";
    import Player from "../components/Player.svelte";
</script>

<div class="player-list">
    {#if PlayerRegistry.players.size > 0}
        {#each Array.from(PlayerRegistry.players.values()) as player}
            <Player 
                id={player.id} 
                name={player.name} 
                score={player.score} 
            />
        {/each}
    {/if}
</div>
<div class="add-player">
    <button onclick={() => {
        let name = prompt("Enter player name: ");
        if (name !== null) PlayerRegistry.add(name);
    }}>Add Player</button>
</div>