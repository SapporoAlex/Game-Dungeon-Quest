// Port of the Furniture/Enemy/Player class hierarchy from Dungeon Quest.py.
import { grid, GRID_SIZE, GRID_COLS, GRID_ROWS, randInt } from "./maps.js";
import { gameState } from "./state.js";
import { images, playSfx, playRandomSfx } from "./assets.js";
import { DEATH_SOUND_KEYS } from "./assets.js";

export function calculateDistance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

export function rollDice(numDice, sides = 2) {
  const rolls = [];
  for (let i = 0; i < numDice; i++) rolls.push(randInt(1, sides));
  return rolls;
}

// A roll of 2 (out of 2 sides) counts as a hit, mirroring count_skulls/count_shields.
export function countHits(rolls) {
  return rolls.filter((r) => r === 2).length;
}

// ---------- Furniture ----------

class Furniture {
  constructor(x, y, imageKey) {
    this.x = x;
    this.y = y;
    this.imageKey = imageKey;
  }

  draw(ctx) {
    const img = images[this.imageKey];
    if (img) ctx.drawImage(img, this.x, this.y);
  }
}

export class Door extends Furniture {
  constructor(x, y, imageKey) {
    super(x, y, imageKey);
    this.hitboxImageKey = "door_ns"; // original always sizes the click-box off door_ns
  }
}

export class Crate extends Furniture {
  constructor(x, y, imageKey = "crate_img", searched = 0) {
    super(x, y, imageKey);
    this.hitboxImageKey = "crate_img";
    this.searched = searched;
  }
}

export class Barrel extends Furniture {
  constructor(x, y, imageKey = "barrel_img", searched = 0) {
    super(x, y, imageKey);
    this.hitboxImageKey = "barrel_img";
    this.searched = searched;
  }
}

export class Table extends Furniture {
  constructor(x, y, imageKey, searched = 0) {
    super(x, y, imageKey);
    this.hitboxImageKey = "table_ns";
    this.searched = searched;
  }
}

export class Chest extends Furniture {
  constructor(x, y, imageKey, searched = 0) {
    super(x, y, imageKey);
    this.hitboxImageKey = "chest_img_left";
    this.searched = searched;
  }
}

export class Fire {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.imageKey = "fire_img";
  }

  draw(ctx) {
    const img = images[this.imageKey];
    if (img) ctx.drawImage(img, this.x, this.y);
  }
}

// ---------- Enemies ----------

function isTilePassable(gridX, gridY) {
  if (!(gridX >= 0 && gridX < GRID_COLS && gridY >= 0 && gridY < GRID_ROWS)) return false;
  const tile = grid[gridY][gridX];
  return gameState.isRampageLevel ? tile <= 15 : tile <= 10;
}

// In duo mode there are two players on the board at once; every enemy simply
// goes after whichever one is currently closest. With a single player this
// trivially resolves to that one player, so classic mode is unaffected.
function nearestTarget(enemy, players) {
  let best = players[0];
  let bestDistance = calculateDistance(enemy.x, enemy.y, best.x, best.y);
  for (let i = 1; i < players.length; i++) {
    const distance = calculateDistance(enemy.x, enemy.y, players[i].x, players[i].y);
    if (distance < bestDistance) {
      best = players[i];
      bestDistance = distance;
    }
  }
  return best;
}

// Shared movement AI for all enemy types: step at most one tile towards the
// nearest player, provided that player is within [100, 500] px and the
// destination tile isn't a wall. (Faithful to the original's
// move_towards_player, which computed the destination once and only ever
// advanced a single step.)
function moveTowardsPlayer(enemy, players, spriteKeys) {
  const target = nearestTarget(enemy, players);
  const distance = calculateDistance(enemy.x, enemy.y, target.x, target.y);
  if (distance > 500 || distance < 100) return;

  let dx = 0;
  let dy = 0;
  if (target.x > enemy.x) {
    dx = GRID_SIZE;
    enemy.enemyImageKey = spriteKeys.right;
  } else if (target.x < enemy.x) {
    dx = -GRID_SIZE;
    enemy.enemyImageKey = spriteKeys.left;
  }
  if (target.y > enemy.y) {
    dy = GRID_SIZE;
    enemy.enemyImageKey = spriteKeys.down;
  } else if (target.y < enemy.y) {
    dy = -GRID_SIZE;
    enemy.enemyImageKey = spriteKeys.up;
  }

  const newX = enemy.x + dx;
  const newY = enemy.y + dy;
  const gridX = Math.floor(newX / GRID_SIZE);
  const gridY = Math.floor(newY / GRID_SIZE);

  if (isTilePassable(gridX, gridY)) {
    enemy.x = newX;
    enemy.y = newY;
  }
}

// Shared attack resolution: enemy rolls `attackDice` against the nearest
// player, who always defends with 3 dice. The original never let enemies
// attack a player sitting at x <= 50 (the entrance column) - preserved here,
// now checked against whichever player was actually targeted. Returns the
// dice info (plus which player got hit) so the UI can render skulls/shields.
function enemyAttackPlayer(enemy, players, attackDice, range) {
  const target = nearestTarget(enemy, players);
  if (target.x <= 50) return null;
  const distance = calculateDistance(enemy.x, enemy.y, target.x, target.y);
  if (distance > range) return null;

  const attackRolls = rollDice(attackDice);
  const skulls = countHits(attackRolls);
  const defenseRolls = rollDice(3);
  const shields = countHits(defenseRolls);
  const damage = Math.max(0, skulls - shields);
  target.health -= damage;
  for (let i = 0; i < damage; i++) {
    playRandomSfx(DEATH_SOUND_KEYS);
  }
  return { attackRolls, defenseRolls, skulls, shields, damage, target };
}

class Enemy {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
  }

  draw(ctx) {
    const img = images[this.enemyImageKey];
    if (img) ctx.drawImage(img, this.x, this.y);
  }
}

export class Goblin extends Enemy {
  constructor(x, y, health = 1) {
    super(x, y, health);
    this.kind = "Goblin";
    this.enemyImageKey = "goblin_down_img";
  }

  moveTowardsPlayer(players) {
    moveTowardsPlayer(this, players, {
      right: "goblin_right_img",
      left: "goblin_left_img",
      down: "goblin_down_img",
      up: "goblin_up_img",
    });
  }

  attackPlayer(players) {
    return enemyAttackPlayer(this, players, 1, 50);
  }
}

export class Skeleton extends Enemy {
  constructor(x, y, health = 1) {
    super(x, y, health);
    this.kind = "Skeleton";
    this.enemyImageKey = "skeleton_down_img";
  }

  moveTowardsPlayer(players) {
    moveTowardsPlayer(this, players, {
      right: "skeleton_right_img",
      left: "skeleton_left_img",
      down: "skeleton_down_img",
      up: "skeleton_up_img",
    });
  }

  attackPlayer(players) {
    return enemyAttackPlayer(this, players, 3, 50);
  }
}

export class ChaosWarrior extends Enemy {
  constructor(x, y, health = 2) {
    super(x, y, health);
    this.kind = "ChaosWarrior";
    this.enemyImageKey = "chaos_warrior_down_img";
  }

  moveTowardsPlayer(players) {
    moveTowardsPlayer(this, players, {
      right: "chaos_warrior_right_img",
      left: "chaos_warrior_left_img",
      down: "chaos_warrior_down_img",
      up: "chaos_warrior_up_img",
    });
  }

  attackPlayer(players) {
    return enemyAttackPlayer(this, players, 3, 50);
  }
}

export class Dragon extends Enemy {
  constructor(x, y, health = 4) {
    super(x, y, health);
    this.kind = "Dragon";
    this.enemyImageKey = "dragon_down_img";
  }

  moveTowardsPlayer(players) {
    moveTowardsPlayer(this, players, {
      right: "dragon_right_img",
      left: "dragon_left_img",
      down: "dragon_down_img",
      up: "dragon_up_img",
    });
  }

  // Range 200 (4 tiles): dragon breathes fire from a distance and always
  // leaves a Fire decal on the (nearest) targeted player's tile while in range.
  attackPlayer(players, fires) {
    const target = nearestTarget(this, players);
    const distance = calculateDistance(this.x, this.y, target.x, target.y);
    if (distance > 200) return null;
    const result = enemyAttackPlayer(this, players, 5, 200);
    if (fires) fires.push(new Fire(target.x, target.y));
    return result;
  }
}

// ---------- Player ----------

// Stat presets for the two playable characters. Duo Mode gives player 1 the
// barbarian and player 2 the elf/rogue; classic single-player always uses
// the barbarian (the default param below keeps every existing `new Player(x,y)`
// call site working unchanged).
export const CHARACTERS = {
  barbarian: {
    label: "Barbarian",
    spriteBase: "barbarian_img",
    maximumMovement: 6,
    maxAttack: 2,
    maxSearch: 1,
    maximumHealth: 5,
  },
  elf: {
    label: "Elf (Rogue)",
    spriteBase: "elf_img",
    maximumMovement: 7,
    maxAttack: 1,
    maxSearch: 2,
    maximumHealth: 4,
  },
};

export class Player {
  constructor(x, y, character = CHARACTERS.barbarian) {
    this.character = character;
    this.playerImageKey = `${character.spriteBase}_down`;
    this.x = x;
    this.y = y;
    this.maximumMovement = character.maximumMovement;
    this.movement = character.maximumMovement;
    this.maxAttack = character.maxAttack;
    this.attack = character.maxAttack;
    this.maxSearch = character.maxSearch;
    this.search = character.maxSearch;
    this.maximumHealth = character.maximumHealth;
    this.health = character.maximumHealth;
    this.potion = 0;
    this.loot = 0;
    this.kills = 0;
  }

  // `otherPlayers` is only non-trivial in Duo Mode - it stops the two
  // players from ever standing on the same tile. Classic mode either omits
  // it or passes an array containing only `this`, which is a no-op.
  move(dx, dy, enemies, doors, otherPlayers = []) {
    const newX = this.x + dx;
    const newY = this.y + dy;
    for (const enemy of enemies) {
      if (newX === enemy.x && newY === enemy.y) return false;
    }
    for (const door of doors) {
      if (newX === door.x && newY === door.y) return false;
    }
    for (const other of otherPlayers) {
      if (other !== this && newX === other.x && newY === other.y) return false;
    }
    const gridX = Math.floor(newX / GRID_SIZE);
    const gridY = Math.floor(newY / GRID_SIZE);
    if (gridX >= 0 && gridX < GRID_COLS && gridY >= 0 && gridY < GRID_ROWS) {
      const tile = grid[gridY][gridX];
      const passable = gameState.isRampageLevel
        ? tile <= 15 || tile >= 20
        : tile <= 10 || tile >= 15;
      if (passable) {
        this.x = newX;
        this.y = newY;
        this.movement -= 1;
        return true;
      }
    }
    return false;
  }
}
