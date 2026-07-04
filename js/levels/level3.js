// Port of the level_3 ("the Rampage") setup + scripted events, including the
// big battle finale, from Dungeon Quest.py.
import { grid, randInt } from "../maps.js";
import { Door, Goblin, Skeleton, ChaosWarrior, Dragon, Table, Barrel, Crate, Chest } from "../entities.js";
import { addDoor, makeRoomFlags } from "./common.js";

export function setup(level) {
  level.player.x = 50;
  level.player.y = 600;
  level.rooms = makeRoomFlags();
  level.flags = {
    startMessage: 0,
    bigBattle: false,
  };

  addDoor(level, "door1", new Door(50, 500, "door_ew"));
  addDoor(level, "door2", new Door(50, 200, "door_ew"));
  addDoor(level, "door3", new Door(200, 50, "door_ns"));
  addDoor(level, "door4", new Door(350, 200, "door_ew"));
  addDoor(level, "door5", new Door(300, 500, "door_ew"));
  addDoor(level, "door6", new Door(450, 600, "door_ns"));
  addDoor(level, "door7", new Door(600, 500, "door_ew"));
  addDoor(level, "door8", new Door(550, 200, "door_ew"));
  addDoor(level, "door9", new Door(700, 50, "door_ns"));
}

// Once every enemy from the big battle horde is dead, reopen the exit tiles.
function checkBigBattleOver(level) {
  if (level.enemies.length === 0) {
    grid[14][18] = randInt(1, 5);
    grid[15][18] = randInt(1, 5);
    grid[14][19] = randInt(1, 5);
    grid[1][14] = randInt(1, 5);
    grid[15][19] = 20;
    return false;
  }
  return true;
}

export async function checkLevelEvents(level, ctx) {
  const { player } = level;
  const f = level.flags;

  if (f.bigBattle) {
    f.bigBattle = checkBigBattleOver(level);
  }

  if ((player.x === 0 && player.y === 750) || (player.x === 950 && player.y === 750)) {
    await ctx.completeQuest();
  }
}

export async function checkRoomTriggers(level, ctx) {
  const { player, enemies, tables, chests, barrels, crates } = level;
  const rooms = level.rooms;
  const doorOpen = (key) => !level.doors.includes(level.doorRefs[key]);

  if (doorOpen("door1") && rooms.room1closed) {
    rooms.room1closed = false;
    const v = randInt(1, 3);
    if (v === 1) {
      enemies.push(new Goblin(50, 300));
      enemies.push(new Goblin(150, 350));
      enemies.push(new Goblin(50, 450));
      crates.push(new Crate(100, 350, "chest_img_left"));
    }
    if (v === 2) {
      enemies.push(new Skeleton(100, 350));
      barrels.push(new Barrel(150, 300));
      barrels.push(new Barrel(150, 350));
      barrels.push(new Barrel(150, 400));
    }
    if (v === 3) {
      enemies.push(new ChaosWarrior(100, 350));
      chests.push(new Chest(50, 350, "chest_img_right"));
    }
  }

  if (doorOpen("door2") && rooms.room2closed) {
    rooms.room2closed = false;
    const v = randInt(1, 3);
    if (v === 1) {
      if (player.x === 50 && player.y === 50) await ctx.activateArrowTrap();
      if (player.x === 100 && player.y === 100) await ctx.activateArrowTrap();
      enemies.push(new Skeleton(50, 100));
      enemies.push(new Goblin(150, 0));
      crates.push(new Crate(50, 0, "chest_img_down"));
    }
    if (v === 2) {
      if (player.x === 100 && player.y === 50) await ctx.activateArrowTrap();
      if (player.x === 150 && player.y === 100) await ctx.activateArrowTrap();
      enemies.push(new Skeleton(0, 0));
      enemies.push(new Skeleton(50, 50));
      enemies.push(new Skeleton(0, 100));
      enemies.push(new Skeleton(50, 150));
    }
    if (v === 3) {
      if (player.x === 50 && player.y === 150) await ctx.activateArrowTrap();
      enemies.push(new Goblin(150, 150));
      enemies.push(new Goblin(0, 150));
      enemies.push(new Goblin(0, 100));
      enemies.push(new Goblin(150, 50));
    }
  }

  if (doorOpen("door3") && rooms.room3closed) {
    rooms.room3closed = false;
    const spawnTables = () => {
      tables.push(new Table(300, 50, "table_ns"));
      tables.push(new Table(350, 50, "table_ns"));
      tables.push(new Table(300, 50, "table_ew"));
      tables.push(new Table(300, 100, "table_ew"));
    };
    const v = randInt(1, 3);
    if (v === 1) {
      spawnTables();
      enemies.push(new ChaosWarrior(250, 0));
      enemies.push(new ChaosWarrior(250, 150));
      enemies.push(new ChaosWarrior(400, 50));
    }
    if (v === 2) {
      spawnTables();
      enemies.push(new ChaosWarrior(300, 0));
      enemies.push(new ChaosWarrior(250, 150));
    }
    if (v === 3) {
      spawnTables();
      enemies.push(new ChaosWarrior(350, 0));
      enemies.push(new ChaosWarrior(250, 150));
      enemies.push(new ChaosWarrior(400, 50));
    }
  }

  if (doorOpen("door4") && rooms.room4closed) {
    rooms.room4closed = false;
    const v = randInt(1, 3);
    if (v === 1) {
      enemies.push(new Goblin(250, 350));
      enemies.push(new Goblin(400, 350));
      enemies.push(new Goblin(250, 450));
      enemies.push(new Goblin(400, 300));
      crates.push(new Crate(300, 350));
      barrels.push(new Barrel(350, 350));
    }
    if (v === 2) {
      enemies.push(new Goblin(250, 350));
      enemies.push(new Goblin(400, 350));
      crates.push(new Crate(300, 350));
      barrels.push(new Barrel(350, 350));
    }
    if (v === 3) {
      enemies.push(new Goblin(250, 350));
      enemies.push(new Goblin(400, 350));
      const trapSpots = [
        [250, 300], [250, 400], [300, 300], [300, 400],
        [350, 300], [350, 400], [400, 300], [400, 400],
      ];
      for (const [x, y] of trapSpots) {
        if (player.x === x && player.y === y) await ctx.activateArrowTrap();
      }
      crates.push(new Crate(300, 350));
      barrels.push(new Barrel(350, 350));
    }
  }

  if (doorOpen("door5") && rooms.room5closed) {
    rooms.room5closed = false;
    enemies.push(new ChaosWarrior(300, 50));
    enemies.push(new ChaosWarrior(300, 100));
    enemies.push(new ChaosWarrior(350, 50));
    enemies.push(new ChaosWarrior(350, 100));
    enemies.push(new Skeleton(50, 100));
    enemies.push(new Goblin(150, 0));
    const v = randInt(1, 3);
    if (v >= 1) {
      enemies.push(new Skeleton(300, 700));
      enemies.push(new Skeleton(350, 700));
      chests.push(new Chest(300, 750, "chest_img_up"));
      chests.push(new Chest(350, 750, "chest_img_up"));
    }
    if (v >= 2) {
      enemies.push(new Skeleton(300, 650));
      chests.push(new Chest(250, 650, "chest_img_right"));
    }
    if (v >= 3) {
      enemies.push(new Skeleton(400, 700));
      chests.push(new Chest(400, 750, "chest_img_up"));
    }
  }

  if (doorOpen("door6") && rooms.room6closed) {
    rooms.room6closed = false;
    barrels.push(new Barrel(650, 750));
    enemies.push(new Skeleton(300, 700));
    const v = randInt(1, 3);
    if (v === 1) {
      enemies.push(new Goblin(500, 550));
      enemies.push(new Goblin(550, 550));
      enemies.push(new Goblin(600, 550));
      enemies.push(new Goblin(650, 550));
      enemies.push(new Goblin(500, 750));
      enemies.push(new Goblin(550, 750));
      enemies.push(new Goblin(600, 750));
      enemies.push(new Goblin(650, 650));
    }
    if (v === 2) {
      enemies.push(new Goblin(500, 550));
      enemies.push(new Goblin(600, 550));
      enemies.push(new Goblin(650, 550));
      enemies.push(new Goblin(500, 750));
      enemies.push(new Goblin(550, 750));
      enemies.push(new Goblin(600, 750));
    }
    if (v === 3) {
      enemies.push(new Goblin(550, 550));
      enemies.push(new Goblin(650, 550));
      enemies.push(new Goblin(500, 750));
      enemies.push(new Goblin(600, 750));
    }
  }

  if (doorOpen("door7") && rooms.room7closed) {
    rooms.room7closed = false;
    tables.push(new Table(550, 300, "table_ns"));
    barrels.push(new Barrel(600, 350));
    const v = randInt(1, 3);
    if (v === 1) {
      enemies.push(new ChaosWarrior(500, 300));
      enemies.push(new ChaosWarrior(500, 400));
      enemies.push(new ChaosWarrior(600, 300));
      enemies.push(new ChaosWarrior(650, 400));
    }
    if (v === 2) {
      enemies.push(new ChaosWarrior(500, 300));
      enemies.push(new ChaosWarrior(500, 400));
      enemies.push(new ChaosWarrior(600, 300));
    }
    if (v === 3) {
      enemies.push(new ChaosWarrior(500, 300));
      enemies.push(new ChaosWarrior(650, 400));
    }
  }

  if (doorOpen("door8") && rooms.room8closed) {
    rooms.room8closed = false;
    enemies.push(new Goblin(550, 550));
    enemies.push(new Goblin(650, 550));
    enemies.push(new Goblin(500, 750));
    enemies.push(new Goblin(600, 750));
    enemies.push(new ChaosWarrior(300, 50));
    enemies.push(new ChaosWarrior(300, 100));
    enemies.push(new ChaosWarrior(350, 50));
    enemies.push(new ChaosWarrior(350, 100));
    enemies.push(new Skeleton(50, 100));
    enemies.push(new Goblin(150, 0));
    const v = randInt(1, 3);
    if (v === 1) {
      const trapSpots = [[650, 150], [600, 100], [550, 50], [500, 0]];
      for (const [x, y] of trapSpots) {
        if (player.x === x && player.y === y) await ctx.activateArrowTrap();
      }
    }
    if (v >= 2) {
      if (player.x === 600 && player.y === 50) await ctx.activateArrowTrap();
    }
  }

  if (doorOpen("door9") && rooms.room9closed && player.x === 750) {
    rooms.room9closed = false;
    const v = randInt(1, 4);
    enemies.length = 0;
    level.flags.bigBattle = true;

    const setWallOverrides = () => {
      grid[14][18] = randInt(16, 19);
      grid[15][18] = randInt(16, 19);
      grid[14][19] = randInt(16, 19);
      grid[1][14] = randInt(16, 19);
    };

    if (v === 1) {
      for (let i = 0; i < 16; i++) {
        for (let j = 15; j < 20; j++) grid[i][j] = randInt(11, 15);
      }
      setWallOverrides();
      enemies.push(new Dragon(900, 600));
      enemies.push(new Dragon(800, 300));
      enemies.push(new Dragon(900, 150));
    }
    if (v === 2) {
      for (let i = 0; i < 16; i++) {
        for (let j = 15; j < 20; j++) grid[i][j] = randInt(1, 5);
      }
      setWallOverrides();
      enemies.push(new ChaosWarrior(800, 150));
      enemies.push(new ChaosWarrior(850, 200));
      enemies.push(new ChaosWarrior(900, 250));
      enemies.push(new ChaosWarrior(950, 300));
      enemies.push(new ChaosWarrior(900, 450));
      enemies.push(new Goblin(800, 550));
      enemies.push(new Goblin(850, 450));
      enemies.push(new Goblin(950, 550));
    }
    if (v === 3) {
      for (let i = 0; i < 16; i++) {
        for (let j = 15; j < 20; j++) grid[i][j] = randInt(6, 10);
      }
      setWallOverrides();
      const coords = [
        [950, 100], [950, 200], [950, 300], [950, 400], [950, 500],
        [900, 600], [900, 700], [900, 800], [900, 900],
        [750, 500], [750, 600], [750, 700], [750, 800], [750, 850],
      ];
      for (const [x, y] of coords) enemies.push(new Skeleton(x, y));
    }
    if (v === 4) {
      for (let i = 2; i < 14; i++) grid[i][17] = randInt(6, 10);
      setWallOverrides();
      enemies.push(new Dragon(900, 600));
      enemies.push(new Skeleton(950, 200));
      enemies.push(new Skeleton(950, 300));
      enemies.push(new Skeleton(950, 400));
      enemies.push(new Goblin(800, 550));
      enemies.push(new Goblin(850, 450));
      enemies.push(new Goblin(950, 550));
      enemies.push(new ChaosWarrior(900, 250));
      enemies.push(new ChaosWarrior(950, 300));
    }
  }
}
