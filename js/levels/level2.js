// Port of the level_2 ("Quest 2" - hunt the red dragon) setup + scripted
// events from Dungeon Quest.py.
import { randInt } from "../maps.js";
import { Door, Goblin, Skeleton, ChaosWarrior, Dragon, Table, Barrel, Crate, Chest } from "../entities.js";
import { addDoor, anyOpen, makeRoomFlags } from "./common.js";

export function setup(level) {
  level.player.x = 0;
  level.player.y = 0;
  level.rooms = makeRoomFlags();
  level.flags = {
    startMessage: 0,
    dragonRef: null,
    dragonExists: false,
    dragonDead: 0,
  };

  addDoor(level, "door1", new Door(150, 50, "door_ew"));
  addDoor(level, "door2", new Door(800, 200, "door_ew"));
  addDoor(level, "door3", new Door(300, 350, "door_ew"));
  addDoor(level, "door5", new Door(200, 450, "door_ew"));
  addDoor(level, "door6", new Door(300, 450, "door_ew"));
  addDoor(level, "door7", new Door(650, 450, "door_ew"));
  addDoor(level, "door8", new Door(800, 450, "door_ew"));
  addDoor(level, "door9", new Door(150, 700, "door_ew"));
  addDoor(level, "door10", new Door(550, 150, "door_ns"));
  addDoor(level, "door11", new Door(250, 250, "door_ns"));
  addDoor(level, "door12", new Door(400, 250, "door_ns"));
  addDoor(level, "door13", new Door(50, 400, "door_ns"));
  addDoor(level, "door14", new Door(400, 550, "door_ns"));
  addDoor(level, "door15", new Door(250, 650, "door_ns"));
  addDoor(level, "door16", new Door(550, 300, "door_ns"));
  addDoor(level, "door17", new Door(700, 300, "door_ns"));
}

export async function checkLevelEvents(level, ctx) {
  const { player, enemies } = level;
  const f = level.flags;

  if (player.x === 0 && player.y === 0 && f.startMessage === 0) {
    f.startMessage += 1;
    await ctx.showMessage("defeat_the_red_dragon_msg");
  }

  if (f.dragonRef && enemies.includes(f.dragonRef)) {
    f.dragonExists = true;
  }

  if (f.dragonExists) {
    const dragonAlive = enemies.includes(f.dragonRef);
    if (!dragonAlive && f.dragonDead === 0) {
      f.dragonDead += 1;
      await ctx.showMessage("red_dragon_defeated_msg");
    }
    if (!dragonAlive && player.x === 0 && player.y === 0) {
      await ctx.completeQuest();
    }
  }
}

export async function checkRoomTriggers(level) {
  const { enemies, tables, chests, barrels, crates } = level;
  const rooms = level.rooms;
  const f = level.flags;

  if (anyOpen(level, ["door1", "door11"]) && rooms.room1closed) {
    rooms.room1closed = false;
    enemies.push(new Goblin(150, 250));
    tables.push(new Table(100, 300, "table_ew"));
  }

  if (anyOpen(level, ["door11", "door12", "door3"]) && rooms.room2closed) {
    rooms.room2closed = false;
    enemies.push(new Skeleton(350, 150));
  }

  if (anyOpen(level, ["door10", "door2"]) && rooms.room3closed) {
    rooms.room3closed = false;
    enemies.push(new Goblin(650, 150));
    enemies.push(new Goblin(750, 100));
    barrels.push(new Barrel(850, 100));
  }

  if (anyOpen(level, ["door16", "door17"]) && rooms.room4closed) {
    rooms.room4closed = false;
    enemies.push(new ChaosWarrior(600, 250));
    crates.push(new Crate(650, 250));
  }

  if (anyOpen(level, ["door2", "door17", "door8"]) && rooms.room5closed) {
    rooms.room5closed = false;
    enemies.push(new Skeleton(850, 300));
    enemies.push(new Goblin(750, 350));
    tables.push(new Table(850, 350, "table_ns"));
  }

  if (anyOpen(level, ["door3", "door13", "door5", "door6"]) && rooms.room6closed) {
    rooms.room6closed = false;
    enemies.push(new Skeleton(250, 400));
    crates.push(new Crate(350, 400));
  }

  if (anyOpen(level, ["door14", "door7"]) && rooms.room7closed) {
    rooms.room7closed = false;
    enemies.push(new Goblin(450, 500));
    enemies.push(new Goblin(500, 600));
    barrels.push(new Barrel(450, 400));
  }

  if (anyOpen(level, ["door5", "door9", "door15"]) && rooms.room8closed) {
    rooms.room8closed = false;
    enemies.push(new Goblin(150, 550));
    crates.push(new Crate(100, 500));
    tables.push(new Table(100, 550, "table_ns"));
  }

  if (anyOpen(level, ["door6", "door14", "door15"]) && rooms.room9closed) {
    rooms.room9closed = false;
    barrels.push(new Barrel(350, 650));
  }

  if (anyOpen(level, ["door7", "door8"]) && rooms.room10closed) {
    rooms.room10closed = false;
    enemies.push(new ChaosWarrior(800, 550));
    enemies.push(new ChaosWarrior(650, 550));
    const dragon = new Dragon(700, 600);
    f.dragonRef = dragon;
    enemies.push(dragon);
    chests.push(new Chest(850, 600, "chest_img_left"));
    tables.push(new Table(600, 550, "table_ns"));
  }

  if (!level.doors.includes(level.doorRefs.door9) && rooms.room11closed) {
    rooms.room11closed = false;
    barrels.push(new Barrel(350, 750));
  }

  if (anyOpen(level, ["door10", "door12", "door16"]) && rooms.room12closed) {
    rooms.room12closed = false;
    enemies.push(new Skeleton(500, 0));
    enemies.push(new Goblin(500, 250));
    barrels.push(new Barrel(650, 0));
  }
}
