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
    let roundHistory: number[] = $state([]);
    let roundTimerId: number = 0;
    let roundTimeElapsed: number = $state(0);
    let roundTimeElapsedString: string = $derived.by(() => {
        const minutes: string = Math.floor(roundTimeElapsed / 60).toString().padStart(2, "0");          // Minutes elapsed with a leading 0
        const seconds: string = Math.floor(roundTimeElapsed % 60).toString().padStart(2, "0");          // Seconds elapsed with a leading 0
        const milliseconds: string = ((roundTimeElapsed % 60) % 1).toFixed(2).replace(/\d+\./g, '');    // Milliseconds elapsed - regex to remove the whole number of the decimal
        const roundTimeElapsedString: string = `${minutes}:${seconds}:${milliseconds}`; 

        return roundTimeElapsedString;
    })

    // Start the round and increment how much time has elapsed for the round.
    function startRound() {
        if (playerNames.length === 0) {
           let confirmation = confirm("There are no players in this game yet, are you sure you want to start?");
           if (!confirmation) return;
        }

        hasRoundStarted.set(true);
        timeRoundStarted.set(Date.now());

        roundTimerId = setInterval(() => {
            roundTimeElapsed += Date.now() - $timeRoundStarted;
            roundTimeElapsed /= 1000;
        }, 5);
    }

    // End the round and reset timer and game state.
    function endRound() {
        roundHistory.push(roundTimeElapsed);
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
    {$hasRoundStarted ? roundTimeElapsedString : "Start round"}
</button>
{#each roundHistory as timeElapsed, i}
    <div>Round {i + 1} - Time elapsed: {timeElapsed.toFixed(2)}</div>
{/each}