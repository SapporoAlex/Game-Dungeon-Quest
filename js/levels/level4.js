// Quest 4 ("The Sunken Vault") setup + scripted events.
// Layout: a 2x3 grid of rooms (see gameMap4 in maps.js) - entrance top-left,
// dragon's lair bottom-right - fully connected by 7 doors so the player can
// approach the lair from either the top-right or bottom-mid room.
import { Door, Goblin, Skeleton, ChaosWarrior, Dragon, Table, Barrel, Crate, Chest } from "../entities.js";
import { addDoor, anyOpen, makeRoomFlags } from "./common.js";

const STAIRS_X = 850;
const STAIRS_Y = 600;

export function setup(level) {
  level.player.x = 100;
  level.player.y = 100;
  level.rooms = makeRoomFlags();
  level.flags = {
    startMessage: 0,
    arrow1: 0,
    arrow2: 0,
    dragonRef: null,
    dragonExists: false,
    dragonDead: 0,
  };

  addDoor(level, "doorA", new Door(300, 150, "door_ns"));
  addDoor(level, "doorB", new Door(650, 150, "door_ns"));
  addDoor(level, "doorC", new Door(300, 550, "door_ns"));
  addDoor(level, "doorD", new Door(650, 550, "door_ns"));
  addDoor(level, "doorE", new Door(100, 350, "door_ew"));
  addDoor(level, "doorF", new Door(450, 350, "door_ew"));
  addDoor(level, "doorG", new Door(800, 350, "door_ew"));

  // Entrance room furniture.
  level.tables.push(new Table(150, 200, "table_ew"));
  level.barrels.push(new Barrel(200, 100));
}

export async function checkLevelEvents(level, ctx) {
  const { player } = level;
  const f = level.flags;

  if (player.x === 100 && player.y === 100 && f.startMessage === 0) {
    f.startMessage += 1;
    await ctx.showMessage("use_arrow_keys_msg");
  }

  if (f.dragonRef && level.enemies.includes(f.dragonRef)) {
    f.dragonExists = true;
  }
  if (f.dragonExists) {
    const dragonAlive = level.enemies.includes(f.dragonRef);
    if (!dragonAlive && f.dragonDead === 0) {
      f.dragonDead += 1;
      await ctx.showMessage("red_dragon_defeated_msg");
    }
    if (!dragonAlive && player.x === STAIRS_X && player.y === STAIRS_Y) {
      await ctx.completeQuest();
    }
  }
}

export async function checkRoomTriggers(level, ctx) {
  const { enemies, tables, chests, barrels, crates, player } = level;
  const rooms = level.rooms;
  const f = level.flags;

  // Top-mid room - reached via doorA out of the entrance.
  if (anyOpen(level, ["doorA"]) && rooms.room1closed) {
    rooms.room1closed = false;
    enemies.push(new Goblin(400, 100));
    enemies.push(new Goblin(450, 200));
    crates.push(new Crate(500, 150));
  }
  if (player.x === 250 && player.y === 100 && f.arrow1 === 0) {
    f.arrow1 = 1;
    await ctx.activateArrowTrap();
  }

  // Top-right room - reached via doorB out of the top-mid room.
  if (anyOpen(level, ["doorB"]) && rooms.room2closed) {
    rooms.room2closed = false;
    enemies.push(new Skeleton(750, 100));
    enemies.push(new ChaosWarrior(800, 200));
    tables.push(new Table(900, 150, "table_ew"));
  }

  // Bottom-left room - reached via doorE out of the entrance.
  if (anyOpen(level, ["doorE"]) && rooms.room3closed) {
    rooms.room3closed = false;
    enemies.push(new Goblin(100, 450));
    barrels.push(new Barrel(150, 500));
  }

  // Bottom-mid room (central hub) - reached from either the bottom-left or
  // top-mid room.
  if (anyOpen(level, ["doorC", "doorF"]) && rooms.room4closed) {
    rooms.room4closed = false;
    enemies.push(new ChaosWarrior(450, 450));
    enemies.push(new Skeleton(500, 500));
    crates.push(new Crate(550, 450));
    tables.push(new Table(400, 550, "table_ns"));
  }
  if (player.x === 600 && player.y === 450 && f.arrow2 === 0) {
    f.arrow2 = 1;
    await ctx.activateArrowTrap();
  }

  // Dragon's lair - reached from either the bottom-mid or top-right room.
  if (anyOpen(level, ["doorD", "doorG"]) && rooms.room5closed) {
    rooms.room5closed = false;
    enemies.push(new ChaosWarrior(750, 450));
    enemies.push(new ChaosWarrior(900, 500));
    const dragon = new Dragon(850, 550);
    f.dragonRef = dragon;
    enemies.push(dragon);
    chests.push(new Chest(900, 600, "chest_img_left"));
    chests.push(new Chest(800, 650, "chest_img_down"));
  }
}
