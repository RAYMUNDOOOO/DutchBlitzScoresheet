<script lang="ts">
    interface Player {
        name: string;
        score: number;
    }

    const players = new Map<string, Player>();

    // ALTERING PLAYER REGISTRY
    export const AddPlayer = (newName: string) => {
        let newPlayer: Player = {
            name: newName,
            score: 0
        }

        players.set(crypto.randomUUID(), newPlayer);
    }

    export const DeletePlayer = (id: string) => { players.delete(id); }

    export const RenamePlayer = (id: string, name: string) => {
        let player = players.get(id);
        if (player !== undefined) {
            player.name = name;
        }
    }

    // SCORE UPDATE
    export const UpdateScore = (id: string, pointsScored: number) => {
        let player = players.get(id);
        if (player !== undefined) {
            player.score += pointsScored;
        }
    }
</script>