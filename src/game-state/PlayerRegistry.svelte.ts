import { SvelteMap } from 'svelte/reactivity'

interface Player {
	id: string,
	name: string;
	score: number;
}

let playerMap = new SvelteMap<string, Player>();

// ALTERING PLAYER REGISTRY
export const PlayerRegistry = $state({
	players: playerMap,

	add: (newName: string) => {
        const generatedId = crypto.randomUUID();
		let newPlayer: Player = {
			id: generatedId,
			name: newName,
			score: 0
		};

		playerMap.set(generatedId, newPlayer);
        console.log(`Added player: ${newName} with ID: ${generatedId}`);

		return newPlayer.id;
	},

	delete: (id: string) => {
		playerMap.delete(id);
		console.log(`Deleted player with ID: ${id}`);
	}
});

// UPDATE PLAYER ATTRIBUTES
export const RenamePlayer = (id: string, name: string) => {
	let player = playerMap.get(id);
	if (player !== undefined) {
		player.name = name;
	}
};

export const UpdateScore = (id: string, pointsScored: number) => {
	let player = playerMap.get(id);
	if (player !== undefined) {
		player.score += pointsScored;
	}
};
