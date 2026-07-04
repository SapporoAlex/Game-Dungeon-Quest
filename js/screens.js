// Port of main_menu(), mission_select_screen() and store_screen() from
// Dungeon Quest.py.
import { images } from "./assets.js";
import { WIDTH } from "./render.js";
import { drawPanel, drawAbilitiesHUD } from "./render.js";
import { Player } from "./entities.js";
import { loadItems, saveItems } from "./save.js";

const CENTER_X = WIDTH / 2 - 122;

function rectFor(key, x, y) {
  const img = images[key];
  return { x, y, w: img ? img.width : 0, h: img ? img.height : 0 };
}

export function pointInRect(px, py, rect) {
  return px >= rect.x && px <= rect.x + rect.w && py >= rect.y && py <= rect.y + rect.h;
}

// ---------- Main menu ----------

export const mainMenuRects = {
  selectMission: () => rectFor("select_mission_button", CENTER_X, 400),
  store: () => rectFor("store_button", CENTER_X, 500),
  exit: () => rectFor("exit_game_button", CENTER_X, 600),
};

export function drawMainMenu(ctx) {
  ctx.drawImage(images.main_bg, 0, 0);
  ctx.drawImage(images.title_img, 0, 0);
  ctx.drawImage(images.main_menu_bg, 100, 0);
  ctx.drawImage(images.select_mission_button, CENTER_X, 400);
  ctx.drawImage(images.store_button, CENTER_X, 500);
  ctx.drawImage(images.exit_game_button, CENTER_X, 600);
}

// ---------- Mission select ----------

export const missionSelectRects = {
  level_0: () => rectFor("mission_0_button", CENTER_X, 400),
  level_1: () => rectFor("mission_1_button", CENTER_X, 460),
  level_2: () => rectFor("mission_2_button", CENTER_X, 520),
  level_3: () => rectFor("mission_3_button", CENTER_X, 580),
};

export function drawMissionSelect(ctx) {
  ctx.drawImage(images.main_bg, 0, 0);
  ctx.drawImage(images.title_img, 0, 0);
  ctx.drawImage(images.main_menu_bg, 100, 0);
  ctx.drawImage(images.mission_0_button, CENTER_X, 400);
  ctx.drawImage(images.mission_1_button, CENTER_X, 460);
  ctx.drawImage(images.mission_2_button, CENTER_X, 520);
  ctx.drawImage(images.mission_3_button, CENTER_X, 580);
}

// ---------- Store ----------

const STORE_BG_KEYS = ["store_1_bg", "store_2_bg", "store_3_bg", "store_4_bg"];

export const storeRects = {
  speed: () => rectFor("buy_speed_potion_img", 100, 200),
  attack: () => rectFor("buy_attack_potion_img", 100, 270),
  search: () => rectFor("buy_search_potion_img", 100, 340),
  maxhealth: () => rectFor("buy_maxhealth_potion_img", 100, 410),
  potion: () => rectFor("buy_potion_img", 100, 480),
  exit: () => rectFor("exit_store_img", 50, 600),
};

export function createShopPlayer() {
  const player = new Player(450, 350);
  loadItems(player);
  settlePlayerToMax(player);
  return player;
}

// Mirrors Player.reset_player(): current counters snap to the (possibly
// just-upgraded) maxima so the store always shows "fully rested" totals.
function settlePlayerToMax(player) {
  player.health = player.maximumHealth;
  player.movement = player.maximumMovement;
  player.search = player.maxSearch;
  player.attack = player.maxAttack;
}

export function applyStorePurchase(player, key) {
  if (key === "speed" && player.loot >= 5) {
    player.loot -= 5;
    player.maximumMovement += 2;
  } else if (key === "attack" && player.loot >= 8) {
    player.loot -= 8;
    player.maxAttack += 1;
  } else if (key === "maxhealth" && player.loot >= 8) {
    player.loot -= 8;
    player.maximumHealth += 2;
  } else if (key === "potion" && player.loot >= 1) {
    player.loot -= 1;
    player.potion += 1;
  } else if (key === "search" && player.loot >= 5) {
    player.loot -= 5;
    player.maxSearch += 1;
  }
  saveItems(player);
  loadItems(player);
  settlePlayerToMax(player);
}

export function pickStoreBackground() {
  return STORE_BG_KEYS[Math.floor(Math.random() * STORE_BG_KEYS.length)];
}

export function drawStore(ctx, player, bgKey) {
  ctx.drawImage(images[bgKey], 0, 0);
  drawPanel(ctx);
  drawAbilitiesHUD(ctx, player, {
    move: "move_button_img",
    attack: "attack_button_img",
    search: "search_button_img",
  });
  ctx.drawImage(images.buy_speed_potion_img, 100, 200);
  ctx.drawImage(images.buy_attack_potion_img, 100, 270);
  ctx.drawImage(images.buy_search_potion_img, 100, 340);
  ctx.drawImage(images.buy_maxhealth_potion_img, 100, 410);
  ctx.drawImage(images.buy_potion_img, 100, 480);
  ctx.drawImage(images.exit_store_img, 50, 600);
}
