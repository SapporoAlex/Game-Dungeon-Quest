// Port of the drawing routines from Dungeon Quest.py (draw_floor_tiles,
// display_panel, display_abilities, display_everything, etc).
import { images } from "./assets.js";
import { grid, GRID_SIZE, GRID_ROWS, GRID_COLS } from "./maps.js";
import { gameState } from "./state.js";

export const WIDTH = 1200;
export const HEIGHT = 800;
export const PANEL_X = WIDTH - 200;
export const GRID_COLOR = "rgb(155,155,155)";

const FLOOR_KEYS = [
  "floor_tile_img_1", "floor_tile_img_2", "floor_tile_img_3", "floor_tile_img_4", "floor_tile_img_5",
  "floor_tile_img_6", "floor_tile_img_7", "floor_tile_img_8", "floor_tile_img_9", "floor_tile_img_10",
];
const WALL_KEYS = ["wall_img_1", "wall_img_2", "wall_img_3", "wall_img_4"];
const GREEN_KEYS = ["floor_tile_g_img_1", "floor_tile_g_img_2", "floor_tile_g_img_3", "floor_tile_g_img_4", "floor_tile_g_img_5"];
const BLUE_KEYS = ["floor_tile_b_img_1", "floor_tile_b_img_2", "floor_tile_b_img_3", "floor_tile_b_img_4", "floor_tile_b_img_5"];

// tile_dict: levels 0-2 (values 1-10 floor, 11-14 wall, 15 stairs, 16 chain)
function tileKey(value) {
  if (value <= 10) return FLOOR_KEYS[value - 1];
  if (value <= 14) return WALL_KEYS[value - 11];
  if (value === 15) return "stairs_img";
  return "chain_img";
}

// colour_tile_dict: the Rampage level (values 1-5 green, 6-10 blue,
// 11-15 red/floor, 16-19 wall, 20 stairs, 21 chain)
function colourTileKey(value) {
  if (value <= 5) return GREEN_KEYS[value - 1];
  if (value <= 10) return BLUE_KEYS[value - 6];
  if (value <= 15) return FLOOR_KEYS[value - 11];
  if (value <= 19) return WALL_KEYS[value - 16];
  if (value === 20) return "stairs_img";
  return "chain_img";
}

function drawImg(ctx, key, x, y) {
  const img = images[key];
  if (img && img.complete !== false) {
    ctx.drawImage(img, x, y);
  }
}

export function drawFloorTiles(ctx) {
  const rampage = gameState.isRampageLevel;
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const value = grid[row][col];
      const key = rampage ? colourTileKey(value) : tileKey(value);
      drawImg(ctx, key, col * GRID_SIZE, row * GRID_SIZE);
    }
  }
}

export function drawGridLines(ctx) {
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= PANEL_X; x += GRID_SIZE) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, HEIGHT);
  }
  for (let y = 0; y <= HEIGHT; y += GRID_SIZE) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(PANEL_X, y + 0.5);
  }
  ctx.stroke();
}

export function drawPanel(ctx) {
  drawImg(ctx, "panel_img", PANEL_X, 0);
}

export function drawPhaseIcon(ctx, phaseImageKey) {
  drawImg(ctx, phaseImageKey, WIDTH - 175, 25);
}

const NUMBER_KEYS = {
  "-5": "minus_five_img", "-4": "minus_four_img", "-3": "minus_three_img",
  "-2": "minus_two_img", "-1": "minus_one_img", 0: "zero_img", 1: "one_img",
  2: "two_img", 3: "three_img", 4: "four_img", 5: "five_img", 6: "six_img",
  7: "seven_img", 8: "eight_img", 9: "nine_img", 10: "ten_img", 11: "eleven_img",
  12: "twelve_img", 13: "thirteen_img", 14: "fourteen_img", 15: "fifteen_img",
  16: "sixteen_img", 17: "seventeen_img", 18: "eighteen_img", 19: "nineteen_img",
  20: "twenty_img",
};

export function numberKey(n) {
  const clamped = Math.max(-5, Math.min(20, n));
  return NUMBER_KEYS[clamped];
}

export function drawAbilitiesHUD(ctx, player, buttonImages) {
  drawImg(ctx, buttonImages.move, WIDTH - 170, 200);
  drawImg(ctx, buttonImages.attack, WIDTH - 170, 270);
  drawImg(ctx, buttonImages.search, WIDTH - 170, 340);
  drawImg(ctx, "potion_img", WIDTH - 170, 410);
  drawImg(ctx, "life_img", WIDTH - 170, 480);
  drawImg(ctx, "loot_img", WIDTH - 170, 550);
  drawImg(ctx, numberKey(player.movement), WIDTH - 80, 200);
  drawImg(ctx, numberKey(player.attack), WIDTH - 80, 270);
  drawImg(ctx, numberKey(player.search), WIDTH - 80, 340);
  drawImg(ctx, numberKey(player.potion), WIDTH - 80, 410);
  drawImg(ctx, numberKey(player.health), WIDTH - 80, 480);
  drawImg(ctx, numberKey(player.loot), WIDTH - 80, 550);
}

export function drawPassButton(ctx) {
  drawImg(ctx, "pass_button_img", WIDTH - 170, 725);
}

const SKULL_KEYS = { 1: "one_skull_img", 2: "two_skull_img", 3: "three_skull_img", 4: "four_skull_img", 5: "five_skull_img", 6: "six_skull_img" };
const SHIELD_KEYS = { 1: "one_shield_img", 2: "two_shield_img", 3: "three_shield_img" };

export function drawDiceOverlay(ctx, diceResult) {
  if (!diceResult) return;
  const { skulls, shields } = diceResult;
  if (skulls > 0 && SKULL_KEYS[skulls]) drawImg(ctx, SKULL_KEYS[skulls], WIDTH - 170, HEIGHT - 180);
  if (shields > 0 && SHIELD_KEYS[shields]) drawImg(ctx, SHIELD_KEYS[shields], WIDTH - 170, HEIGHT - 130);
}

export function drawEntities(ctx, level) {
  for (const p of level.players) {
    drawImg(ctx, p.playerImageKey, p.x, p.y);
  }
  for (const fire of level.fires) fire.draw(ctx);
  for (const enemy of level.enemies) enemy.draw(ctx);
  for (const door of level.doors) door.draw(ctx);
  for (const crate of level.crates) crate.draw(ctx);
  for (const barrel of level.barrels) barrel.draw(ctx);
  for (const table of level.tables) table.draw(ctx);
  for (const chest of level.chests) chest.draw(ctx);
}

export function drawMessageOverlay(ctx, messageKey) {
  if (!messageKey) return;
  drawImg(ctx, messageKey, 300, 250);
}

// For one-off flavor text with no matching pre-made image (e.g. Duo Mode's
// "all quests complete" banner) - a plain word-wrapped bordered box.
export function drawTextMessageOverlay(ctx, text) {
  if (!text) return;

  ctx.save();
  ctx.font = "bold 26px 'Trebuchet MS', sans-serif";
  const maxTextWidth = WIDTH - 380;
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxTextWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);

  const lineHeight = 34;
  const paddingY = 30;
  const boxHeight = lines.length * lineHeight + paddingY * 2;
  const boxWidth = Math.min(WIDTH - 200, maxTextWidth + 80);
  const boxX = WIDTH / 2 - boxWidth / 2;
  const boxY = HEIGHT / 2 - boxHeight / 2;

  ctx.fillStyle = "rgba(10, 9, 6, 0.92)";
  ctx.strokeStyle = "#d8b25a";
  ctx.lineWidth = 3;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 12);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
  }

  ctx.fillStyle = "#f0e2b8";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let y = boxY + paddingY + lineHeight / 2;
  for (const l of lines) {
    ctx.fillText(l, WIDTH / 2, y);
    y += lineHeight;
  }
  ctx.restore();
}

// Duo Mode extras: a small HP readout above each player's sprite (so you can
// track your partner's health even on your own turn) and a turn banner. The
// main stat panel (drawAbilitiesHUD) already shows whichever player is
// active, so this only adds what that panel can't.
export function drawDuoHUD(ctx, level) {
  for (const p of level.players) {
    drawImg(ctx, numberKey(p.health), p.x + 15, Math.max(0, p.y - 22));
  }

  const label = `Player ${level.activePlayerIndex + 1}'s Turn (${level.player.character.label})`;
  ctx.save();
  ctx.font = "bold 20px 'Trebuchet MS', sans-serif";
  ctx.textBaseline = "top";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000";
  ctx.strokeText(label, 10, 6);
  ctx.fillStyle = "#d8b25a";
  ctx.fillText(label, 10, 6);
  ctx.restore();
}

// Full-frame render, equivalent to display_everything().
export function displayEverything(ctx, level, ui) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  drawPanel(ctx);
  drawPhaseIcon(ctx, ui.phaseImageKey);
  drawImg(ctx, ui.buttonImages.move, WIDTH - 170, 200);
  drawImg(ctx, ui.buttonImages.attack, WIDTH - 170, 270);
  drawImg(ctx, ui.buttonImages.search, WIDTH - 170, 340);
  drawPassButton(ctx);
  drawFloorTiles(ctx);
  drawGridLines(ctx);
  drawAbilitiesHUD(ctx, level.player, ui.buttonImages);
  drawEntities(ctx, level);
  if (level.players.length > 1) drawDuoHUD(ctx, level);
  drawDiceOverlay(ctx, ui.diceResult);
  drawMessageOverlay(ctx, ui.messageKey);
  drawTextMessageOverlay(ctx, ui.textMessage);
}
