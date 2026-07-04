// Port of the level_1 ("Quest 1") setup + scripted events from Dungeon Quest.py.
import { randInt } from "../maps.js";
import { Door, Goblin, Skeleton, ChaosWarrior, Dragon, Table, Barrel, Crate, Chest } from "../entities.js";
import { addDoor, anyOpen, makeRoomFlags } from "./common.js";

export function setup(level) {
  level.player.x = 450;
  level.player.y = 350;
  level.player.health -= 2;
  level.rooms = makeRoomFlags();
  level.flags = {
    startMessage: 0,
    arrow1: 0,
    arrow2: 0,
    arrow3: 0,
    arrow4: 0,
    arrow5: 0,
    arrow7: 0,
    arrow8: 0,
    arrow9: 0,
  };

  addDoor(level, "door1", new Door(500, 50, "door_ew"));
  addDoor(level, "door2", new Door(200, 150, "door_ns"));
  addDoor(level, "door3", new Door(700, 150, "door_ns"));
  addDoor(level, "door4", new Door(400, 200, "door_ns"));
  addDoor(level, "door5", new Door(150, 300, "door_ew"));
  addDoor(level, "door6", new Door(600, 300, "door_ew"));
  addDoor(level, "door7", new Door(800, 300, "door_ew"));
  addDoor(level, "door8", new Door(400, 400, "door_ns"));
  addDoor(level, "door9", new Door(550, 400, "door_ns"));
  addDoor(level, "door10", new Door(150, 450, "door_ew"));
  addDoor(level, "door11", new Door(300, 450, "door_ew"));
  addDoor(level, "door12", new Door(800, 450, "door_ew"));
  addDoor(level, "door13", new Door(550, 550, "door_ns"));
  addDoor(level, "door14", new Door(200, 600, "door_ns"));
  addDoor(level, "door15", new Door(700, 600, "door_ns"));
  addDoor(level, "door16", new Door(450, 700, "door_ew"));
}

export async function checkLevelEvents(level, ctx) {
  const { player } = level;
  const f = level.flags;

  if (player.x === 450 && player.y === 350 && f.startMessage === 0) {
    f.startMessage += 1;
    await ctx.showMessage("escape_msg");
  }
  if (player.x === 0 && player.y === 350) {
    await ctx.completeQuest();
  }
}

export async function checkRoomTriggers(level, ctx) {
  const { player, enemies, tables, chests, barrels, crates } = level;
  const rooms = level.rooms;
  const f = level.flags;

  if (anyOpen(level, ["door8", "door11"]) && rooms.room1closed) {
    rooms.room1closed = false;
    enemies.push(new Goblin(350, 350));
    barrels.push(new Barrel(250, 350));
  }

  if (anyOpen(level, ["door11", "door14"]) && rooms.room2closed) {
    rooms.room2closed = false;
    crates.push(new Crate(350, 650));
  }

  if (player.x === 250 && player.y === 500 && f.arrow1 === 0) {
    f.arrow1 = 1;
    await ctx.activateArrowTrap();
  }
  if (player.x === 300 && player.y === 550 && f.arrow2 === 0) {
    f.arrow2 = 1;
    await ctx.activateArrowTrap();
  }
  if (player.x === 350 && player.y === 600 && f.arrow3 === 0) {
    f.arrow3 = 1;
    await ctx.activateArrowTrap();
  }

  if (anyOpen(level, ["door10", "door14"]) && rooms.room3closed) {
    rooms.room3closed = false;
    barrels.push(new Barrel(100, 650));
  }
  if (player.x === 150 && player.y === 550 && f.arrow4 === 0) {
    f.arrow4 = 1;
    await ctx.activateArrowTrap();
  }
  if (player.x === 100 && player.y === 600 && f.arrow5 === 0) {
    f.arrow5 = 1;
    await ctx.activateArrowTrap();
  }

  if (anyOpen(level, ["door10", "door5"]) && rooms.room4closed) {
    rooms.room4closed = false;
    enemies.push(new Goblin(150, 350));
    tables.push(new Table(100, 350, "table_ns"));
  }

  if (anyOpen(level, ["door5", "door2"]) && rooms.room5closed) {
    rooms.room5closed = false;
    enemies.push(new Goblin(100, 150));
    enemies.push(new Goblin(150, 100));
    chests.push(new Chest(100, 100, "chest_img_down"));
  }
  if (player.x === 450 && player.y === 150 && f.arrow7 === 0) {
    f.arrow7 = 1;
    await ctx.activateArrowTrap();
  }
  if (player.x === 500 && player.y === 150 && f.arrow8 === 0) {
    f.arrow8 = 1;
    await ctx.activateArrowTrap();
  }

  if (anyOpen(level, ["door2", "door4"]) && rooms.room6closed) {
    rooms.room6closed = false;
    enemies.push(new Skeleton(350, 150));
    enemies.push(new ChaosWarrior(300, 100));
    enemies.push(new ChaosWarrior(300, 200));
    tables.push(new Table(300, 250, "table_ew"));
  }

  if (anyOpen(level, ["door4", "door1"]) && rooms.room7closed) {
    rooms.room7closed = false;
    barrels.push(new Barrel(500, 250));
  }

  if (anyOpen(level, ["door9", "door6"]) && rooms.room8closed) {
    rooms.room8closed = false;
    enemies.push(new Goblin(650, 350));
    crates.push(new Crate(650, 400));
  }

  if (anyOpen(level, ["door6", "door3"]) && rooms.room9closed) {
    rooms.room9closed = false;
    chests.push(new Chest(600, 150, "chest_img_right"));
    const spawnValue = randInt(1, 3);
    if (spawnValue === 1) enemies.push(new Goblin(650, 100));
    if (spawnValue === 2) enemies.push(new Skeleton(650, 100));
    if (spawnValue === 3) enemies.push(new ChaosWarrior(650, 100));
  }

  if (anyOpen(level, ["door3", "door7"]) && rooms.room10closed) {
    rooms.room10closed = false;
    tables.push(new Table(750, 100, "table_ew"));
    crates.push(new Crate(850, 250));
    const spawnValue2 = randInt(1, 3);
    if (spawnValue2 === 1) enemies.push(new Goblin(800, 150));
    if (spawnValue2 === 2) enemies.push(new Skeleton(800, 150));
    if (spawnValue2 === 3) enemies.push(new ChaosWarrior(800, 150));
    const spawnValue3 = randInt(1, 3);
    if (spawnValue3 === 1) enemies.push(new Goblin(800, 200));
    if (spawnValue3 === 2) enemies.push(new Skeleton(800, 200));
    if (spawnValue3 === 3) enemies.push(new ChaosWarrior(800, 200));
  }

  if (anyOpen(level, ["door7", "door12"]) && rooms.room11closed) {
    rooms.room11closed = false;
    const spawnValue4 = randInt(1, 3);
    if (spawnValue4 === 1) enemies.push(new Goblin(850, 350));
    if (spawnValue4 === 2) enemies.push(new Skeleton(850, 350));
    if (spawnValue4 === 3) {
      enemies.push(new ChaosWarrior(800, 400));
      enemies.push(new Skeleton(850, 400));
      tables.push(new Table(750, 350, "table_ns"));
    }
  }

  if (anyOpen(level, ["door12", "door15"]) && rooms.room12closed) {
    rooms.room12closed = false;
    const spawnValue5 = randInt(1, 3);
    if (spawnValue5 <= 2) enemies.push(new Skeleton(800, 550));
    if (spawnValue5 === 3) enemies.push(new ChaosWarrior(800, 550));
    const spawnValue6 = randInt(1, 3);
    if (spawnValue6 === 1) {
      enemies.push(new Goblin(750, 600));
      enemies.push(new Goblin(800, 600));
      enemies.push(new Goblin(850, 600));
      enemies.push(new Goblin(750, 650));
      enemies.push(new Goblin(800, 650));
      enemies.push(new Goblin(850, 650));
    }
    if (spawnValue6 === 2) {
      enemies.push(new Skeleton(750, 600));
      enemies.push(new Skeleton(800, 600));
      enemies.push(new Skeleton(850, 600));
    }
    if (spawnValue6 === 3) {
      enemies.push(new ChaosWarrior(750, 600));
      enemies.push(new ChaosWarrior(850, 600));
    }
  }

  if (anyOpen(level, ["door15", "door13"]) && rooms.room13closed) {
    rooms.room13closed = false;
    chests.push(new Chest(600, 600, "chest_img_right"));
    chests.push(new Chest(600, 500, "chest_img_down"));
    chests.push(new Chest(650, 500, "chest_img_down"));
  }

  if (anyOpen(level, ["door13", "door16"]) && rooms.room14closed) {
    rooms.room14closed = false;
    const spawnValue7 = randInt(1, 5);
    if (spawnValue7 <= 4) {
      enemies.push(new Skeleton(450, 600));
      enemies.push(new Skeleton(500, 600));
      enemies.push(new Skeleton(500, 500));
    }
    if (spawnValue7 === 5) {
      enemies.push(new Dragon(450, 600));
    }
  }

  if (anyOpen(level, ["door1", "door16"]) && rooms.room15closed && player.x === 0) {
    rooms.room15closed = false;
    const spawnValue3 = randInt(1, 3);
    if (spawnValue3 === 1) {
      enemies.push(new Goblin(0, 300));
      enemies.push(new Goblin(0, 400));
      enemies.push(new Goblin(0, 700));
      enemies.push(new Goblin(0, 50));
    }
    if (spawnValue3 === 2) {
      enemies.push(new Skeleton(0, 300));
      enemies.push(new Skeleton(0, 400));
      enemies.push(new Skeleton(0, 200));
    }
    if (spawnValue3 === 3) {
      enemies.push(new ChaosWarrior(0, 300));
      enemies.push(new ChaosWarrior(0, 400));
    }
  }
  if (player.x === 250 && player.y === 0 && f.arrow9 === 0) {
    f.arrow9 = 1;
    await ctx.activateArrowTrap();
  }
}
