import { afterEach, describe, expect, test } from 'vitest';
import { PlayerRegistry, UpdateScore } from "../src/game-state/PlayerRegistry.svelte";

function AddPlayerToRegistry(name: string) {
    return PlayerRegistry.add(name);
}

afterEach(async () => {
    await PlayerRegistry.players.clear();
})

describe('Player registry', () => {
    test('Add a player', () => {
	    let newName = 'Ramon';
	    let id = AddPlayerToRegistry(newName);
	    expect(PlayerRegistry.players.get(id)?.name).toBe(newName);
	    expect(PlayerRegistry.players.get(id)?.score).toBe(0);
    });

    test('Delete newly created player', () => {
        let newName = 'Ramon';
        let id = AddPlayerToRegistry(newName);
        PlayerRegistry.delete(id);
        expect(PlayerRegistry.players.size).toBe(0);
    });

    test('Update score', () => {
        let ramon = AddPlayerToRegistry('ramon');
        let george = AddPlayerToRegistry('george');
        UpdateScore(ramon, 10);
        UpdateScore(george, -54);

        expect(PlayerRegistry.players.get(ramon)?.score).toBe(10);
        expect(PlayerRegistry.players.get(george)?.score).toBe(-54);
    })

    test('Add multiple players with the same name', () => {
        let ramon1 = AddPlayerToRegistry('ramon');
        let ramon2 = AddPlayerToRegistry('ramon');

        expect(ramon1 === ramon2).toBeFalsy();
    })
});

