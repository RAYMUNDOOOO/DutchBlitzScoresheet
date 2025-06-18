<script lang="ts">
    interface Player {
        name: string;
        score: number;
    }

    const playerMap = new Map<string, Player>();

    // ALTERING PLAYER REGISTRY
    export const PlayerRegistry = $state({
        players: playerMap,
        add: (newName: string) => {
            let newPlayer: Player = {
                name: newName,
                score: 0
            }

            playerMap.set(crypto.randomUUID(), newPlayer);
        },
        delete: (id: string) => { playerMap.delete(id); }
    })

    // UPDATE PLAYER ATTRIBUTES
    export const RenamePlayer = (id: string, name: string) => {
        let player = playerMap.get(id);
        if (player !== undefined) {
            player.name = name;
        }
    }

    export const UpdateScore = (id: string, pointsScored: number) => {
        let player = playerMap.get(id);
        if (player !== undefined) {
            player.score += pointsScored;
        }
    }
</script>