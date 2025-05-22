<script lang="ts">
    import Player from "../components/player.svelte";
    import { hasRoundStarted, timeRoundStarted } from "../gameState.svelte";

    // PLAYER MANAGEMENT
    let playerNames: string[] = $state([]);
    const AddPlayer = () => {
        const name = prompt("Please enter new player's name:", "John");
        if (name) playerNames.push(name);
    }

    // ROUND MANAGEMENT
    let roundTimerId: number = 0;
    let roundTimeElapsed: number = $state(0);
    function startRound() {
        hasRoundStarted.set(true);
        timeRoundStarted.set(Date.now());
        roundTimerId = setInterval(() => {
            const now = Date.now();
            roundTimeElapsed += $timeRoundStarted - now;
            roundTimeElapsed = parseFloat((roundTimeElapsed / 1000).toFixed(3));
        }, 5);
    }

    function endRound() {
        roundTimeElapsed = 0;
        timeRoundStarted.set(0);
        hasRoundStarted.set(false);
        clearInterval(roundTimerId);
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
    onclick={$hasRoundStarted ? endRound : startRound}
    >
    {$hasRoundStarted ? roundTimeElapsed : "Start round"}
</button>