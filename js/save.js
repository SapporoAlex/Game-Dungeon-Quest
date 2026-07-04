// Port of items.txt persistence (Player.load_items/save_items/reset_items)
// using localStorage instead of a flat file.
const STORAGE_KEY = "dungeonQuestSave";

const DEFAULTS = {
  gold: 0,
  healthpotions: 0,
  maxhealth: 5,
  maxspeed: 6,
  maxattack: 2,
  maxsearch: 1,
};

function readSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

function writeSave(partial) {
  const current = readSave();
  const next = { ...current, ...partial };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable (e.g. private mode) - progress just won't persist.
  }
  return next;
}

// Mirrors Player.load_items(): only touches maxima + consumables, not the
// player's current-turn counters.
export function loadItems(player) {
  const save = readSave();
  player.loot = save.gold;
  player.potion = save.healthpotions;
  player.maximumHealth = save.maxhealth;
  player.maximumMovement = save.maxspeed;
  player.maxAttack = save.maxattack;
  player.maxSearch = save.maxsearch;
}

// Mirrors Player.save_items().
export function saveItems(player) {
  writeSave({
    gold: player.loot,
    healthpotions: player.potion,
    maxspeed: player.maximumMovement,
    maxsearch: player.maxSearch,
    maxattack: player.maxAttack,
    maxhealth: player.maximumHealth,
  });
}

// Mirrors Player.reset_items(): wipes progress back to factory defaults,
// called when the player dies.
export function resetItems() {
  writeSave({ ...DEFAULTS });
}

// Mirrors Player.reset_player_turn(): restores the player's per-turn
// counters (but NOT health) from the saved maxima. Called at the end of the
// enemy turn, handing control back to the player.
export function resetPlayerTurn(player) {
  const save = readSave();
  player.movement = save.maxspeed;
  player.attack = save.maxattack;
  player.search = save.maxsearch;
}
