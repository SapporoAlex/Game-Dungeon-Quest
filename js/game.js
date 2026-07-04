// Main orchestrator: state machine + per-frame update/render + input.
// Port of the top-level while-loops (main_menu, mission_select_screen,
// store_screen, and the big `while mission_selected` game loop) from
// Dungeon Quest.py.
import { images, playSfx, playRandomSfx, playRandomMusic, playMusic, isMusicPlaying } from "./assets.js";
import { ATTACK_SOUND_KEYS, DEATH_SOUND_KEYS, ENEMY_DEATH_SOUND_KEYS } from "./assets.js";
import * as maps from "./maps.js";
import { gameState, LEVEL } from "./state.js";
import { Player, calculateDistance, rollDice, countHits } from "./entities.js";
import { loadItems, saveItems, resetItems, resetPlayerTurn } from "./save.js";
import * as render from "./render.js";
import * as screens from "./screens.js";
import * as level0 from "./levels/level0.js";
import * as level1 from "./levels/level1.js";
import * as level2 from "./levels/level2.js";
import * as level3 from "./levels/level3.js";

const LEVEL_MODULES = {
  [LEVEL.TUTORIAL]: { mod: level0, mapGen: maps.gameMap0, rampage: false },
  [LEVEL.QUEST_1]: { mod: level1, mapGen: maps.gameMap1, rampage: false },
  [LEVEL.QUEST_2]: { mod: level2, mapGen: maps.gameMap2, rampage: false },
  [LEVEL.RAMPAGE]: { mod: level3, mapGen: maps.gameMap3, rampage: true },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const app = {
  mode: "menu", // 'menu' | 'missionSelect' | 'store' | 'playing'
  level: null,
  storePlayer: null,
  storeBgKey: null,
  busy: false,
  ui: {
    phaseImageKey: "panel_status_base_img",
    buttonImages: { move: "move_button_img", attack: "attack_button_img", search: "search_button_img" },
    diceResult: null,
    messageKey: null,
  },
};

// Debug hook for inspecting live state from the console (and for the
// automated smoke tests run during development).
if (typeof window !== "undefined") window.__dq = app;

function resetButtonImages() {
  app.ui.buttonImages = { move: "move_button_img", attack: "attack_button_img", search: "search_button_img" };
}

async function withBusy(fn) {
  if (app.busy) return;
  app.busy = true;
  try {
    await fn();
  } finally {
    app.busy = false;
  }
}

// ---------- Level context passed to level scripts ----------

function makeLevelCtx(level) {
  return {
    showMessage: (key, ms = 1000) => showMessage(key, ms),
    activateArrowTrap: () => activateArrowTrap(level),
    completeQuest: () => completeQuest(level),
  };
}

async function showMessage(key, ms = 1000) {
  app.ui.messageKey = key;
  await sleep(ms);
  app.ui.messageKey = null;
}

async function activateArrowTrap(level) {
  const damage = maps.randInt(0, 2);
  for (let i = 0; i < damage; i++) playRandomSfx(DEATH_SOUND_KEYS);
  level.player.health -= damage;
  await showMessage("arrow_trap_msg");
}

async function performSearch(level, player) {
  player.search -= 1;
  const luck = maps.randInt(1, 4);
  if (luck <= 1) {
    await showMessage("nothing_found_msg");
  } else if (luck === 2) {
    await showMessage("potion_found_msg");
    if (player.potion < 20) player.potion += 1;
  } else {
    await showMessage("gold_found_msg");
    if (player.loot < 20) player.loot += maps.randInt(1, 3);
  }
}

async function completeQuest(level) {
  await showMessage("quest_complete");
  saveItems(level.player);
  app.level = null;
  switchToMenu();
}

async function playerDied(level) {
  await showMessage("died_msg");
  resetItems();
  app.level = null;
  switchToMenu();
}

// ---------- Mode transitions ----------

function switchToMenu() {
  app.mode = "menu";
  playMusic("menu_theme", true);
}

function switchToMissionSelect() {
  app.mode = "missionSelect";
}

function switchToStore() {
  app.mode = "store";
  app.storePlayer = screens.createShopPlayer();
  app.storeBgKey = screens.pickStoreBackground();
}

function startLevel(levelKey) {
  const config = LEVEL_MODULES[levelKey];
  gameState.isRampageLevel = config.rampage;
  maps.resetNonFloorTiles();
  config.mapGen();

  const level = {
    key: levelKey,
    player: new Player(0, 0),
    enemies: [],
    doors: [],
    doorRefs: {},
    tables: [],
    chests: [],
    barrels: [],
    crates: [],
    fires: [],
    rooms: {},
    flags: {},
    playerTurn: true,
    phase: "movement", // 'movement' | 'attack' | 'idle'
    searching: false,
    dying: false,
  };
  loadItems(level.player);
  config.mod.setup(level);
  level.ctx = makeLevelCtx(level);

  app.level = level;
  app.mode = "playing";
  resetButtonImages();
  app.ui.phaseImageKey = "player_movement_phase_img";
  app.ui.diceResult = null;
  app.ui.messageKey = null;
  playRandomMusic();
}

// ---------- Combat ----------

function defenseDiceForEnemy(enemy) {
  if (enemy.kind === "Goblin") return 1;
  if (enemy.kind === "Skeleton") return 2;
  return 3;
}

async function playAttackSwooshes(skulls) {
  for (let i = 0; i < skulls; i++) {
    playRandomSfx(ATTACK_SOUND_KEYS);
    await sleep(200);
  }
}

async function playerAttacksEnemy(level, enemy) {
  await withBusy(async () => {
    const attackRolls = rollDice(3);
    const skulls = countHits(attackRolls);
    const defenseRolls = rollDice(defenseDiceForEnemy(enemy));
    const shields = countHits(defenseRolls);
    app.ui.diceResult = { skulls, shields };
    await playAttackSwooshes(skulls);
    await sleep(1000);
    level.player.attack -= 1;
    if (skulls > shields) {
      enemy.health -= 1;
      if (enemy.health <= 0) {
        level.enemies.splice(level.enemies.indexOf(enemy), 1);
        playRandomSfx(ENEMY_DEATH_SOUND_KEYS);
        await sleep(200);
      }
    }
    app.ui.diceResult = null;
  });
}

async function runEnemyTurn(level) {
  await withBusy(async () => {
    level.playerTurn = false;
    resetButtonImages();
    app.ui.phaseImageKey = "enemy_movement_phase_img";
    for (const enemy of level.enemies.slice()) {
      enemy.moveTowardsPlayer(level.player.x, level.player.y);
      await sleep(200);
    }

    app.ui.phaseImageKey = "enemy_attack_phase_img";
    for (const enemy of level.enemies.slice()) {
      if (level.player.x <= 50) continue;
      const result = enemy.attackPlayer(level.player, level.fires);
      if (result) {
        app.ui.diceResult = result;
        await playAttackSwooshes(result.skulls);
        await sleep(400);
        app.ui.diceResult = null;
      }
    }

    saveItems(level.player);
    resetPlayerTurn(level.player);
    level.playerTurn = true;
    level.phase = "movement";
    app.ui.phaseImageKey = "player_movement_phase_img";
    app.ui.buttonImages = { move: "move_button_pressed_img", attack: "attack_button_img", search: "search_button_img" };
  });
}

// ---------- Hit testing ----------

function isClickOnEnemy(level, x, y, enemy) {
  const img = images[enemy.enemyImageKey];
  const w = img ? img.width : 50;
  const h = img ? img.height : 50;
  const inBox = x >= enemy.x && x <= enemy.x + w && y >= enemy.y && y <= enemy.y + h;
  const range = enemy.kind === "Dragon" ? 100 : 50;
  return inBox && calculateDistance(level.player.x, level.player.y, enemy.x, enemy.y) <= range;
}

function isClickOnFurniture(level, x, y, item, range) {
  const img = images[item.hitboxImageKey];
  const w = img ? img.width : 50;
  const h = img ? img.height : 50;
  const inBox = x >= item.x && x <= item.x + w && y >= item.y && y <= item.y + h;
  return inBox && calculateDistance(level.player.x, level.player.y, item.x, item.y) <= range;
}

// ---------- Player-turn input ----------

function pressMove() {
  const level = app.level;
  level.phase = "movement";
  app.ui.phaseImageKey = "player_movement_phase_img";
  app.ui.buttonImages = { move: "move_button_pressed_img", attack: "attack_button_img", search: "search_button_img" };
}

function pressAttack() {
  const level = app.level;
  level.phase = "attack";
  app.ui.phaseImageKey = "player_attack_phase_img";
  app.ui.buttonImages = { move: "move_button_img", attack: "attack_button_pressed_img", search: "search_button_img" };
}

function pressSearch() {
  const level = app.level;
  if (level.player.search > 0) {
    level.searching = true;
    app.ui.buttonImages = { move: "move_button_img", attack: "attack_button_img", search: "search_button_pressed_img" };
  }
}

function pressPotion() {
  const level = app.level;
  const player = level.player;
  if (player.potion > 0 || player.health !== player.maximumHealth) {
    player.health = player.maximumHealth;
    player.potion -= 1;
  }
  app.ui.buttonImages = { move: "move_button_img", attack: "attack_button_img", search: "search_button_img" };
}

function pressPass() {
  const level = app.level;
  if (app.busy) return;
  level.phase = "idle";
  runEnemyTurn(level);
}

function tryOpenDoor(level, x, y) {
  for (const door of level.doors) {
    if (isClickOnFurniture(level, x, y, door, 50)) {
      level.doors.splice(level.doors.indexOf(door), 1);
      return true;
    }
  }
  return false;
}

async function handleAttackPhaseClick(level, x, y) {
  if (level.player.attack === 0) return;
  for (const enemy of level.enemies) {
    if (isClickOnEnemy(level, x, y, enemy)) {
      await playerAttacksEnemy(level, enemy);
      break;
    }
  }
}

async function handleSearchClick(level, x, y) {
  const groups = [
    { list: level.tables, range: 100 },
    { list: level.barrels, range: 50 },
    { list: level.crates, range: 50 },
    { list: level.chests, range: 50 },
  ];
  for (const { list, range } of groups) {
    for (const item of list) {
      if (!isClickOnFurniture(level, x, y, item, range)) continue;
      if (item.searched === 0 && level.player.search >= 1) {
        item.searched += 1;
        await withBusy(() => performSearch(level, level.player));
      } else if (item.searched >= 1 && level.player.search >= 1) {
        await withBusy(() => showMessage("nothing_found_msg"));
      }
      return;
    }
  }
}

async function handleGameplayClick(x, y) {
  const level = app.level;
  if (!level || !level.playerTurn || app.busy) return;

  const moveRect = { x: render.WIDTH - 170, y: 200, w: images.move_button_img.width, h: images.move_button_img.height };
  const attackRect = { x: render.WIDTH - 170, y: 270, w: images.attack_button_img.width, h: images.attack_button_img.height };
  const searchRect = { x: render.WIDTH - 170, y: 340, w: images.search_button_img.width, h: images.search_button_img.height };
  const potionRect = { x: render.WIDTH - 170, y: 410, w: images.potion_img.width, h: images.potion_img.height };
  const passRect = { x: render.WIDTH - 170, y: 725, w: images.pass_button_img.width, h: images.pass_button_img.height };

  if (screens.pointInRect(x, y, moveRect)) {
    playSfx("click");
    pressMove();
    return;
  }
  if (screens.pointInRect(x, y, attackRect)) {
    playSfx("click");
    pressAttack();
    return;
  }
  if (screens.pointInRect(x, y, searchRect)) {
    if (level.player.search > 0) playSfx("click");
    pressSearch();
    return;
  }
  if (screens.pointInRect(x, y, potionRect)) {
    playSfx("click");
    pressPotion();
    return;
  }
  if (screens.pointInRect(x, y, passRect)) {
    playSfx("click");
    pressPass();
    return;
  }

  // Fallback: clicking anywhere else tries to open an adjacent door,
  // regardless of the current phase (mirrors the original's click handling).
  tryOpenDoor(level, x, y);

  if (level.phase === "attack") {
    await handleAttackPhaseClick(level, x, y);
  }
  if (level.searching) {
    await handleSearchClick(level, x, y);
  }
}

function handleArrowKey(direction) {
  const level = app.level;
  if (!level || !level.playerTurn || app.busy) return;
  if (level.phase !== "movement" || level.player.movement <= 0) return;

  let dx = 0;
  let dy = 0;
  if (direction === "left") {
    dx = -maps.GRID_SIZE;
    level.player.playerImageKey = "barbarian_img_left";
  } else if (direction === "right") {
    dx = maps.GRID_SIZE;
    level.player.playerImageKey = "barbarian_img_right";
  } else if (direction === "up") {
    dy = -maps.GRID_SIZE;
    level.player.playerImageKey = "barbarian_img_up";
  } else if (direction === "down") {
    dy = maps.GRID_SIZE;
    level.player.playerImageKey = "barbarian_img_down";
  }
  level.player.move(dx, dy, level.enemies, level.doors);
}

// ---------- Screen click dispatch ----------

async function handleCanvasClick(x, y) {
  if (app.mode === "menu") {
    if (screens.pointInRect(x, y, screens.mainMenuRects.selectMission())) {
      playSfx("click");
      switchToMissionSelect();
    } else if (screens.pointInRect(x, y, screens.mainMenuRects.store())) {
      playSfx("click");
      switchToStore();
    } else if (screens.pointInRect(x, y, screens.mainMenuRects.exit())) {
      playSfx("click");
      // Browsers won't let a page close itself unless it was opened by
      // script, so this is a best-effort stand-in for pygame.quit()/exit().
      window.close();
    }
    return;
  }
  if (app.mode === "missionSelect") {
    if (screens.pointInRect(x, y, screens.missionSelectRects.level_0())) {
      playSfx("click");
      startLevel(LEVEL.TUTORIAL);
    } else if (screens.pointInRect(x, y, screens.missionSelectRects.level_1())) {
      playSfx("click");
      startLevel(LEVEL.QUEST_1);
    } else if (screens.pointInRect(x, y, screens.missionSelectRects.level_2())) {
      playSfx("click");
      startLevel(LEVEL.QUEST_2);
    } else if (screens.pointInRect(x, y, screens.missionSelectRects.level_3())) {
      playSfx("click");
      startLevel(LEVEL.RAMPAGE);
    }
    return;
  }
  if (app.mode === "store") {
    const player = app.storePlayer;
    if (screens.pointInRect(x, y, screens.storeRects.speed())) {
      playSfx("click");
      screens.applyStorePurchase(player, "speed");
    } else if (screens.pointInRect(x, y, screens.storeRects.attack())) {
      playSfx("click");
      screens.applyStorePurchase(player, "attack");
    } else if (screens.pointInRect(x, y, screens.storeRects.maxhealth())) {
      playSfx("click");
      screens.applyStorePurchase(player, "maxhealth");
    } else if (screens.pointInRect(x, y, screens.storeRects.potion())) {
      playSfx("click");
      screens.applyStorePurchase(player, "potion");
    } else if (screens.pointInRect(x, y, screens.storeRects.search())) {
      playSfx("click");
      screens.applyStorePurchase(player, "search");
    } else if (screens.pointInRect(x, y, screens.storeRects.exit())) {
      playSfx("click");
      saveItems(player);
      switchToMenu();
    }
    return;
  }
  if (app.mode === "playing") {
    await handleGameplayClick(x, y);
  }
}

// ---------- Input wiring ----------

function canvasToInternal(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = render.WIDTH / rect.width;
  const scaleY = render.HEIGHT / rect.height;
  return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}

function setupInput() {
  canvas.addEventListener("pointerdown", (e) => {
    const { x, y } = canvasToInternal(e.clientX, e.clientY);
    handleCanvasClick(x, y);
  });

  window.addEventListener("keydown", (e) => {
    const map = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" };
    if (map[e.key]) {
      e.preventDefault();
      handleArrowKey(map[e.key]);
    }
  });

  const bind = (id, fn) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      fn();
    });
  };

  bind("btn-move", () => {
    if (app.mode === "playing" && app.level?.playerTurn && !app.busy) {
      playSfx("click");
      pressMove();
    }
  });
  bind("btn-attack", () => {
    if (app.mode === "playing" && app.level?.playerTurn && !app.busy) {
      playSfx("click");
      pressAttack();
    }
  });
  bind("btn-search", () => {
    if (app.mode === "playing" && app.level?.playerTurn && !app.busy) {
      if (app.level.player.search > 0) playSfx("click");
      pressSearch();
    }
  });
  bind("btn-potion", () => {
    if (app.mode === "playing" && app.level?.playerTurn && !app.busy) {
      playSfx("click");
      pressPotion();
    }
  });
  bind("btn-pass", () => {
    if (app.mode === "playing" && app.level?.playerTurn && !app.busy) {
      playSfx("click");
      pressPass();
    }
  });

  for (const dirBtn of document.querySelectorAll(".dpad-btn")) {
    dirBtn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      handleArrowKey(dirBtn.dataset.dir);
    });
  }
}

// ---------- Per-frame update ----------

async function updatePlaying() {
  const level = app.level;
  if (!level) return;

  if (level.player.health <= 0 && !level.dying && !app.busy) {
    level.dying = true;
    await withBusy(() => playerDied(level));
    return;
  }
  if (!level.player || app.mode !== "playing") return;

  if (!isMusicPlaying()) playRandomMusic();

  if (level.playerTurn && !app.busy) {
    const config = LEVEL_MODULES[level.key];
    await withBusy(() => config.mod.checkLevelEvents(level, level.ctx));
    if (!app.busy && level.phase === "movement") {
      await withBusy(() => config.mod.checkRoomTriggers(level, level.ctx));
    }
    if (level.player.movement === 0) level.phase = level.phase === "movement" ? "idle" : level.phase;
    if (level.player.attack === 0 && level.phase === "attack") level.phase = "idle";
    if (level.player.search === 0) level.searching = false;
  }
}

function draw() {
  if (app.mode === "menu") {
    screens.drawMainMenu(ctx);
  } else if (app.mode === "missionSelect") {
    screens.drawMissionSelect(ctx);
  } else if (app.mode === "store") {
    screens.drawStore(ctx, app.storePlayer, app.storeBgKey);
  } else if (app.mode === "playing" && app.level) {
    render.displayEverything(ctx, app.level, app.ui);
  }
}

let lastUpdateRunning = false;
function frame() {
  if (app.mode === "playing" && !lastUpdateRunning) {
    lastUpdateRunning = true;
    updatePlaying().finally(() => {
      lastUpdateRunning = false;
    });
  }
  draw();
  requestAnimationFrame(frame);
}

export function startGame() {
  setupInput();
  switchToMenu();
  requestAnimationFrame(frame);
}
