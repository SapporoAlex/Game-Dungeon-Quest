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

// Draws a plain bordered button with text - used for menu entries that don't
// have their own hand-drawn art (Duo Mode, and the duo-run store/end screens).
function drawTextButton(ctx, rect, label) {
  ctx.save();
  ctx.fillStyle = "#3a2c18";
  ctx.strokeStyle = "#d8b25a";
  ctx.lineWidth = 3;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(rect.x, rect.y, rect.w, rect.h, 10);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  }
  ctx.fillStyle = "#f0e2b8";
  ctx.font = "bold 22px 'Trebuchet MS', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2 + 2);
  ctx.restore();
}

// ---------- Main menu ----------

export const mainMenuRects = {
  selectMission: () => rectFor("select_mission_button", CENTER_X, 400),
  store: () => rectFor("store_button", CENTER_X, 500),
  exit: () => rectFor("exit_game_button", CENTER_X, 600),
  // No hand-drawn art for this one - same footprint as the button above it.
  duoMode: () => ({ ...rectFor("exit_game_button", 0, 0), x: CENTER_X, y: 700 }),
};

export function drawMainMenu(ctx) {
  ctx.drawImage(images.main_bg, 0, 0);
  ctx.drawImage(images.title_img, 0, 0);
  ctx.drawImage(images.main_menu_bg, 100, 0);
  ctx.drawImage(images.select_mission_button, CENTER_X, 400);
  ctx.drawImage(images.store_button, CENTER_X, 500);
  ctx.drawImage(images.exit_game_button, CENTER_X, 600);
  drawTextButton(ctx, mainMenuRects.duoMode(), "Duo Mode");
}

// ---------- Mission select ----------
// The level list itself is a native <select> overlay (see index.html /
// game.js) rather than canvas buttons, so this screen just draws the shared
// backdrop underneath that overlay.

export function drawMissionSelect(ctx) {
  ctx.drawImage(images.main_bg, 0, 0);
  ctx.drawImage(images.title_img, 0, 0);
  ctx.drawImage(images.main_menu_bg, 100, 0);
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

function applyUpgrade(player, key) {
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
}

export function applyStorePurchase(player, key) {
  applyUpgrade(player, key);
  saveItems(player);
  loadItems(player);
  settlePlayerToMax(player);
}

// Duo Mode's store: each player spends their own (in-memory, per-run) gold -
// there's no shared localStorage save to touch here, unlike classic mode.
export function applyDuoPurchase(player, key) {
  applyUpgrade(player, key);
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

// ---------- Duo Mode: between-level store ----------
// Same shop, same prices as classic mode (applyDuoPurchase reuses the exact
// same upgrade rules) - but each of the two players spends their own gold in
// turn, and there's no "exit to menu" here, only "hand off" / "continue".

export const duoStoreRects = {
  ...storeRects,
  next: () => ({ x: 50, y: 600, w: 220, h: 60 }),
};

export function drawDuoStore(ctx, duo, bgKey) {
  const shopper = duo.players[duo.storeTurnIndex];
  ctx.drawImage(images[bgKey], 0, 0);
  drawPanel(ctx);
  drawAbilitiesHUD(ctx, shopper, {
    move: "move_button_img",
    attack: "attack_button_img",
    search: "search_button_img",
  });
  ctx.drawImage(images.buy_speed_potion_img, 100, 200);
  ctx.drawImage(images.buy_attack_potion_img, 100, 270);
  ctx.drawImage(images.buy_search_potion_img, 100, 340);
  ctx.drawImage(images.buy_maxhealth_potion_img, 100, 410);
  ctx.drawImage(images.buy_potion_img, 100, 480);

  ctx.save();
  ctx.font = "bold 26px 'Trebuchet MS', sans-serif";
  ctx.textAlign = "left";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000";
  const label = `Player ${duo.storeTurnIndex + 1} - ${shopper.character.label}: spend your gold`;
  ctx.strokeText(label, 50, 100);
  ctx.fillStyle = "#f0e2b8";
  ctx.fillText(label, 50, 100);
  ctx.restore();

  drawTextButton(ctx, duoStoreRects.next(), duo.storeTurnIndex === 0 ? "Player 2's Turn" : "Continue");
}

// ---------- Duo Mode: run-over stats screen ----------

export function drawDuoEnd(ctx, duo) {
  ctx.drawImage(images.main_bg, 0, 0);
  ctx.drawImage(images.died_msg, WIDTH / 2 - images.died_msg.width / 2, 120);

  ctx.save();
  ctx.textAlign = "center";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#f0e2b8";
  ctx.font = "bold 24px 'Trebuchet MS', sans-serif";
  let y = 420;
  for (const stat of duo.finalStats) {
    const line = `${stat.label}: ${stat.loot} gold - ${stat.kills} kills`;
    ctx.strokeText(line, WIDTH / 2, y);
    ctx.fillText(line, WIDTH / 2, y);
    y += 44;
  }
  ctx.font = "18px 'Trebuchet MS', sans-serif";
  const prompt = "Click anywhere to return to the main menu";
  ctx.strokeText(prompt, WIDTH / 2, y + 30);
  ctx.fillText(prompt, WIDTH / 2, y + 30);
  ctx.restore();
}
