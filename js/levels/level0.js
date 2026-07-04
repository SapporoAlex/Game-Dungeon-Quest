// Port of the level_0 (tutorial) setup + scripted events from Dungeon Quest.py.
import { Door, Goblin, Table, Barrel } from "../entities.js";
import { addDoor, makeRoomFlags } from "./common.js";

export function setup(level) {
  level.player.x = 150;
  level.player.y = 300;
  level.rooms = makeRoomFlags();
  level.flags = {
    startMessage: 0,
    doorMessage: 0,
    arrowMessage: 0,
    searchMessage: 0,
    potionMessage: 0,
    attackMessage: 0,
    exitMessage: 0,
  };

  addDoor(level, "door1", new Door(100, 400, "door_ns"));
  addDoor(level, "door2", new Door(300, 400, "door_ns"));
  addDoor(level, "door3", new Door(500, 400, "door_ns"));
  addDoor(level, "door4", new Door(700, 400, "door_ns"));
}

// Checked every frame while it's the player's turn, regardless of phase.
export async function checkLevelEvents(level, ctx) {
  const { player } = level;
  const f = level.flags;

  if (player.x === 150 && player.y === 300 && f.startMessage === 0) {
    f.startMessage += 1;
    await ctx.showMessage("use_arrow_keys_msg");
  }
  if (player.x === 50 && player.y === 400 && f.doorMessage === 0) {
    f.doorMessage += 1;
    await ctx.showMessage("doors_msg");
  }
  if (player.x === 200 && player.y === 400 && f.arrowMessage === 0) {
    f.arrowMessage += 1;
    await ctx.activateArrowTrap();
  }
  if (!level.doors.includes(level.doorRefs.door2) && f.searchMessage === 0) {
    f.searchMessage += 1;
    level.tables.push(new Table(400, 250, "table_ew"));
    level.barrels.push(new Barrel(350, 250, "barrel_img"));
    await ctx.showMessage("search_msg");
  }
  if (player.potion === 1 && f.potionMessage === 0) {
    f.potionMessage += 1;
    await ctx.showMessage("click_on_potion_msg");
  }
  if (!level.doors.includes(level.doorRefs.door3) && f.attackMessage === 0) {
    f.attackMessage += 1;
    level.enemies.push(new Goblin(650, 400));
    await ctx.showMessage("attack_msg");
  }
  if (!level.doors.includes(level.doorRefs.door4) && f.exitMessage === 0) {
    f.exitMessage += 1;
    await ctx.showMessage("step_on_stairwell_msg");
  }
  if (player.x === 850 && player.y === 450) {
    await ctx.completeQuest();
  }
}

// Level 0 has no generic door/room ambush pattern - it's a straight line of
// scripted beats, so there's nothing to do here every movement-phase frame.
export function checkRoomTriggers() {}
