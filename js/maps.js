// Port of game_maps.py — grid-based dungeon layouts.
// Tile value ranges (levels 0-2, i.e. "level_3 === false" in the original naming):
//   1-10  floor (random decorative variant)
//   11-14 wall
//   15    stairwell
//   16    chain decoration
// Tile value ranges when the 4th quest (chosen_map === LEVEL.RAMPAGE) is active:
//   1-5   green floor, 6-10 blue floor, 11-15 red/rubble floor, 16-19 wall, 20 stairs, 21 chains

export const GRID_SIZE = 50;
export const GRID_ROWS = 16; // height 800 / 50
export const GRID_COLS = 20; // (width 1200 - 200 side panel) / 50

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const grid = [];
for (let row = 0; row < GRID_ROWS; row++) {
  grid.push(new Array(GRID_COLS).fill(1));
}

export function randomizeFloor() {
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      grid[row][col] = randInt(1, 10);
    }
  }
}
randomizeFloor();

// Equivalent of clear_floor_tiles()'s grid mutation: anything that isn't a
// plain floor tile (walls/stairs/chain/colour-zone remnants) reverts to floor.
export function resetNonFloorTiles() {
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      if (grid[row][col] > 10) {
        grid[row][col] = randInt(1, 10);
      }
    }
  }
}

export function gameMap0() {
  grid[4][0] = randInt(11, 14);
  grid[5][0] = randInt(11, 14);
  grid[6][0] = randInt(11, 14);
  grid[7][0] = randInt(11, 14);
  grid[8][0] = randInt(11, 14);
  grid[9][0] = randInt(11, 14);
  grid[4][1] = randInt(11, 14);
  grid[9][1] = randInt(11, 14);
  grid[4][2] = randInt(11, 14);
  grid[6][2] = randInt(11, 14);
  grid[7][2] = randInt(11, 14);
  grid[9][2] = randInt(11, 14);
  grid[4][3] = randInt(11, 14);
  grid[7][3] = randInt(11, 14);
  grid[9][3] = randInt(11, 14);
  grid[4][4] = randInt(11, 14);
  grid[5][4] = randInt(11, 14);
  grid[6][4] = randInt(11, 14);
  grid[7][4] = randInt(11, 14);
  grid[9][4] = randInt(11, 14);
  grid[7][5] = randInt(11, 14);
  grid[9][5] = randInt(11, 14);
  grid[4][6] = randInt(11, 14);
  grid[5][6] = randInt(11, 14);
  grid[6][6] = randInt(11, 14);
  grid[7][6] = randInt(11, 14);
  grid[9][6] = randInt(11, 14);
  grid[4][7] = randInt(11, 14);
  grid[9][7] = randInt(11, 14);
  grid[4][8] = randInt(11, 14);
  grid[9][8] = randInt(11, 14);
  grid[4][9] = randInt(11, 14);
  grid[9][9] = randInt(11, 14);
  grid[4][10] = randInt(11, 14);
  grid[5][10] = randInt(11, 14);
  grid[6][10] = randInt(11, 14);
  grid[7][10] = randInt(11, 14);
  grid[9][10] = randInt(11, 14);
  grid[7][11] = randInt(11, 14);
  grid[9][11] = randInt(11, 14);
  grid[7][12] = randInt(11, 14);
  grid[9][12] = randInt(11, 14);
  grid[7][13] = randInt(11, 14);
  grid[9][13] = randInt(11, 14);
  grid[7][14] = randInt(11, 14);
  grid[9][14] = randInt(11, 14);
  grid[10][14] = randInt(11, 14);
  grid[11][14] = randInt(11, 14);
  grid[7][15] = randInt(11, 14);
  grid[11][15] = randInt(11, 14);
  grid[7][16] = randInt(11, 14);
  grid[11][16] = randInt(11, 14);
  grid[7][17] = randInt(11, 14);
  grid[11][17] = randInt(11, 14);
  grid[7][18] = randInt(11, 14);
  grid[11][18] = randInt(11, 14);
  grid[7][19] = randInt(11, 14);
  grid[8][19] = randInt(11, 14);
  grid[9][19] = randInt(11, 14);
  grid[10][19] = randInt(11, 14);
  grid[11][19] = randInt(11, 14);
  grid[9][17] = 15;
}

export function gameMap1() {
  grid[1][1] = randInt(11, 14);
  grid[1][2] = randInt(11, 14);
  grid[1][3] = randInt(11, 14);
  grid[1][4] = randInt(11, 14);
  grid[1][5] = randInt(11, 14);
  grid[1][6] = randInt(11, 14);
  grid[1][7] = randInt(11, 14);
  grid[1][8] = randInt(11, 14);
  grid[1][9] = randInt(11, 14);
  grid[1][11] = randInt(11, 14);
  grid[1][12] = randInt(11, 14);
  grid[1][13] = randInt(11, 14);
  grid[1][14] = randInt(11, 14);
  grid[1][15] = randInt(11, 14);
  grid[1][16] = randInt(11, 14);
  grid[1][17] = randInt(11, 14);
  grid[1][18] = randInt(11, 14);
  grid[2][1] = randInt(11, 14);
  grid[2][4] = randInt(11, 14);
  grid[2][8] = randInt(11, 14);
  grid[2][11] = randInt(11, 14);
  grid[2][14] = randInt(11, 14);
  grid[2][18] = randInt(11, 14);
  grid[3][1] = randInt(11, 14);
  grid[3][8] = randInt(11, 14);
  grid[3][11] = randInt(11, 14);
  grid[3][18] = randInt(11, 14);
  grid[4][1] = randInt(11, 14);
  grid[4][4] = randInt(11, 14);
  grid[4][11] = randInt(11, 14);
  grid[4][14] = randInt(11, 14);
  grid[4][18] = randInt(11, 14);
  grid[5][1] = randInt(11, 14);
  grid[5][4] = randInt(11, 14);
  grid[5][8] = randInt(11, 14);
  grid[5][11] = randInt(11, 14);
  grid[5][14] = randInt(11, 14);
  grid[5][18] = randInt(11, 14);
  grid[6][1] = randInt(11, 14);
  grid[6][2] = randInt(11, 14);
  grid[6][4] = randInt(11, 14);
  grid[6][5] = randInt(11, 14);
  grid[6][6] = randInt(11, 14);
  grid[6][7] = randInt(11, 14);
  grid[6][8] = randInt(11, 14);
  grid[6][9] = randInt(11, 14);
  grid[6][10] = randInt(11, 14);
  grid[6][11] = randInt(11, 14);
  grid[6][13] = randInt(11, 14);
  grid[6][14] = randInt(11, 14);
  grid[6][15] = randInt(11, 14);
  grid[6][17] = randInt(11, 14);
  grid[6][18] = randInt(11, 14);
  grid[7][1] = randInt(11, 14);
  grid[7][4] = randInt(11, 14);
  grid[7][8] = randInt(11, 14);
  grid[7][11] = randInt(11, 14);
  grid[7][14] = randInt(11, 14);
  grid[7][18] = randInt(11, 14);
  grid[8][1] = randInt(11, 14);
  grid[8][4] = randInt(11, 14);
  grid[8][14] = randInt(11, 14);
  grid[8][18] = randInt(11, 14);
  grid[9][1] = randInt(11, 14);
  grid[9][2] = randInt(11, 14);
  grid[9][4] = randInt(11, 14);
  grid[9][5] = randInt(11, 14);
  grid[9][7] = randInt(11, 14);
  grid[9][8] = randInt(11, 14);
  grid[9][9] = randInt(11, 14);
  grid[9][10] = randInt(11, 14);
  grid[9][11] = randInt(11, 14);
  grid[9][12] = randInt(11, 14);
  grid[9][13] = randInt(11, 14);
  grid[9][14] = randInt(11, 14);
  grid[9][15] = randInt(11, 14);
  grid[9][17] = randInt(11, 14);
  grid[9][18] = randInt(11, 14);
  grid[10][1] = randInt(11, 14);
  grid[10][4] = randInt(11, 14);
  grid[10][8] = randInt(11, 14);
  grid[10][11] = randInt(11, 14);
  grid[10][14] = randInt(11, 14);
  grid[10][18] = randInt(11, 14);
  grid[11][1] = randInt(11, 14);
  grid[11][4] = randInt(11, 14);
  grid[11][8] = randInt(11, 14);
  grid[11][14] = randInt(11, 14);
  grid[11][18] = randInt(11, 14);
  grid[12][1] = randInt(11, 14);
  grid[12][8] = randInt(11, 14);
  grid[12][11] = randInt(11, 14);
  grid[12][18] = randInt(11, 14);
  grid[13][1] = randInt(11, 14);
  grid[13][4] = randInt(11, 14);
  grid[13][8] = randInt(11, 14);
  grid[13][11] = randInt(11, 14);
  grid[13][14] = randInt(11, 14);
  grid[13][18] = randInt(11, 14);
  grid[14][1] = randInt(11, 14);
  grid[14][2] = randInt(11, 14);
  grid[14][3] = randInt(11, 14);
  grid[14][4] = randInt(11, 14);
  grid[14][5] = randInt(11, 14);
  grid[14][6] = randInt(11, 14);
  grid[14][7] = randInt(11, 14);
  grid[14][8] = randInt(11, 14);
  grid[14][10] = randInt(11, 14);
  grid[14][11] = randInt(11, 14);
  grid[14][12] = randInt(11, 14);
  grid[14][13] = randInt(11, 14);
  grid[14][14] = randInt(11, 14);
  grid[14][15] = randInt(11, 14);
  grid[14][16] = randInt(11, 14);
  grid[14][17] = randInt(11, 14);
  grid[14][18] = randInt(11, 14);
  grid[7][0] = 15;
  grid[7][9] = 16;
}

export function gameMap2() {
  grid[0][0] = 15;
  grid[0][5] = randInt(11, 14);
  grid[0][14] = randInt(11, 14);
  grid[1][1] = randInt(11, 14);
  grid[1][2] = randInt(11, 14);
  grid[1][4] = randInt(11, 14);
  grid[1][5] = randInt(11, 14);
  grid[1][6] = randInt(11, 14);
  grid[1][7] = randInt(11, 14);
  grid[1][8] = randInt(11, 14);
  grid[1][11] = randInt(11, 14);
  grid[1][12] = randInt(11, 14);
  grid[1][13] = randInt(11, 14);
  grid[1][14] = randInt(11, 14);
  grid[1][15] = randInt(11, 14);
  grid[1][16] = randInt(11, 14);
  grid[1][17] = randInt(11, 14);
  grid[1][18] = randInt(11, 14);
  grid[2][1] = randInt(11, 14);
  grid[2][5] = randInt(11, 14);
  grid[2][8] = randInt(11, 14);
  grid[2][11] = randInt(11, 14);
  grid[2][18] = randInt(11, 14);
  grid[3][1] = randInt(11, 14);
  grid[3][5] = randInt(11, 14);
  grid[3][8] = randInt(11, 14);
  grid[3][18] = randInt(11, 14);
  grid[4][1] = randInt(11, 14);
  grid[4][5] = randInt(11, 14);
  grid[4][8] = randInt(11, 14);
  grid[4][11] = randInt(11, 14);
  grid[4][12] = randInt(11, 14);
  grid[4][13] = randInt(11, 14);
  grid[4][14] = randInt(11, 14);
  grid[4][15] = randInt(11, 14);
  grid[4][17] = randInt(11, 14);
  grid[4][18] = randInt(11, 14);
  grid[5][1] = randInt(11, 14);
  grid[5][11] = randInt(11, 14);
  grid[5][14] = randInt(11, 14);
  grid[5][18] = randInt(11, 14);
  grid[6][1] = randInt(11, 14);
  grid[6][5] = randInt(11, 14);
  grid[6][8] = randInt(11, 14);
  grid[6][18] = randInt(11, 14);
  grid[7][1] = randInt(11, 14);
  grid[7][2] = randInt(11, 14);
  grid[7][3] = randInt(11, 14);
  grid[7][4] = randInt(11, 14);
  grid[7][5] = randInt(11, 14);
  grid[7][7] = randInt(11, 14);
  grid[7][8] = randInt(11, 14);
  grid[7][9] = randInt(11, 14);
  grid[7][10] = randInt(11, 14);
  grid[7][11] = randInt(11, 14);
  grid[7][12] = randInt(11, 14);
  grid[7][13] = randInt(11, 14);
  grid[7][14] = randInt(11, 14);
  grid[7][18] = randInt(11, 14);
  grid[8][8] = randInt(11, 14);
  grid[8][14] = randInt(11, 14);
  grid[8][18] = randInt(11, 14);
  grid[9][1] = randInt(11, 14);
  grid[9][2] = randInt(11, 14);
  grid[9][3] = randInt(11, 14);
  grid[9][5] = randInt(11, 14);
  grid[9][7] = randInt(11, 14);
  grid[9][8] = randInt(11, 14);
  grid[9][11] = randInt(11, 14);
  grid[9][12] = randInt(11, 14);
  grid[9][14] = randInt(11, 14);
  grid[9][15] = randInt(11, 14);
  grid[9][17] = randInt(11, 14);
  grid[9][18] = randInt(11, 14);
  grid[10][1] = randInt(11, 14);
  grid[10][5] = randInt(11, 14);
  grid[10][8] = randInt(11, 14);
  grid[10][11] = randInt(11, 14);
  grid[10][18] = randInt(11, 14);
  grid[11][0] = randInt(11, 14);
  grid[11][1] = randInt(11, 14);
  grid[11][5] = randInt(11, 14);
  grid[11][11] = randInt(11, 14);
  grid[11][18] = randInt(11, 14);
  grid[12][1] = randInt(11, 14);
  grid[12][5] = randInt(11, 14);
  grid[12][8] = randInt(11, 14);
  grid[12][11] = randInt(11, 14);
  grid[12][18] = randInt(11, 14);
  grid[13][1] = randInt(11, 14);
  grid[13][8] = randInt(11, 14);
  grid[13][11] = randInt(11, 14);
  grid[13][18] = randInt(11, 14);
  grid[14][1] = randInt(11, 14);
  grid[14][2] = randInt(11, 14);
  grid[14][4] = randInt(11, 14);
  grid[14][5] = randInt(11, 14);
  grid[14][6] = randInt(11, 14);
  grid[14][7] = randInt(11, 14);
  grid[14][8] = randInt(11, 14);
  grid[14][9] = randInt(11, 14);
  grid[14][10] = randInt(11, 14);
  grid[14][11] = randInt(11, 14);
  grid[14][12] = randInt(11, 14);
  grid[14][13] = randInt(11, 14);
  grid[14][14] = randInt(11, 14);
  grid[14][15] = randInt(11, 14);
  grid[14][16] = randInt(11, 14);
  grid[14][17] = randInt(11, 14);
  grid[14][18] = randInt(11, 14);
  grid[15][8] = randInt(11, 14);
}

export function gameMap3() {
  // b1 green
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) grid[i][j] = randInt(1, 5);
  }
  // b2 red
  for (let i = 0; i < 4; i++) {
    for (let j = 5; j < 9; j++) grid[i][j] = randInt(11, 15);
  }
  // b3 blue
  for (let i = 0; i < 4; i++) {
    for (let j = 10; j < 14; j++) grid[i][j] = randInt(6, 10);
  }
  // b4 red
  for (let i = 5; i < 10; i++) {
    for (let j = 0; j < 5; j++) grid[i][j] = randInt(11, 15);
  }
  // b5 green
  for (let i = 5; i <= 9; i++) {
    for (let j = 5; j <= 9; j++) grid[i][j] = randInt(1, 5);
  }
  // b6 red
  for (let i = 5; i < 10; i++) {
    for (let j = 10; j < 15; j++) grid[i][j] = randInt(11, 15);
  }
  // b7 green
  for (let i = 11; i < 16; i++) {
    for (let j = 0; j < 5; j++) grid[i][j] = randInt(1, 5);
  }
  // b8 blue
  for (let i = 11; i < 16; i++) {
    for (let j = 5; j < 10; j++) grid[i][j] = randInt(6, 10);
  }
  // b9 red
  for (let i = 11; i < 16; i++) {
    for (let j = 10; j < 15; j++) grid[i][j] = randInt(11, 15);
  }
  // b10 blue
  for (let i = 0; i < 16; i++) {
    for (let j = 15; j < 20; j++) grid[i][j] = randInt(6, 10);
  }

  for (let i = 0; i < randInt(0, 9); i++) {
    grid[randInt(0, 14)][randInt(0, 13)] = 21;
  }

  // v wall 1
  grid[0][4] = randInt(16, 19);
  for (let i = 2; i < 16; i++) grid[i][4] = randInt(16, 19);
  // v wall 2
  for (let i = 0; i < 12; i++) grid[i][9] = randInt(16, 19);
  for (let i = 13; i < 16; i++) grid[i][9] = randInt(16, 19);
  // v wall 3
  grid[0][14] = randInt(16, 19);
  for (let i = 2; i < 16; i++) grid[i][14] = randInt(16, 19);

  // h wall 1
  grid[4][0] = randInt(16, 19);
  for (let j = 2; j < 7; j++) grid[4][j] = randInt(16, 19);
  for (let j = 8; j < 11; j++) grid[4][j] = randInt(16, 19);
  for (let j = 12; j < 14; j++) grid[4][j] = randInt(16, 19);

  // h wall 2
  grid[10][0] = randInt(16, 19);
  for (let j = 2; j < 6; j++) grid[10][j] = randInt(16, 19);
  for (let j = 7; j < 12; j++) grid[10][j] = randInt(16, 19);
  grid[10][13] = randInt(16, 19);

  grid[15][0] = 20;
  grid[15][19] = 20;
}

// Quest 4 ("The Sunken Vault"): a 2x3 grid of rooms (left/mid/right columns,
// top/bottom rows) fully connected by one door per shared wall - 7 doors in
// total, giving the player a genuine choice of route from the entrance
// (top-left) to the dragon's lair (bottom-right). Uses the same tile palette
// as levels 0-2 (1-10 floor, 11-14 wall, 15 stairs).
export function gameMap4() {
  // Vertical wall between the left and mid columns, top row (gap for doorA).
  for (let row = 0; row <= 6; row++) {
    if (row !== 3) grid[row][6] = randInt(11, 14);
  }
  // Vertical wall between the mid and right columns, top row (gap for doorB).
  for (let row = 0; row <= 6; row++) {
    if (row !== 3) grid[row][13] = randInt(11, 14);
  }
  // Vertical wall between the left and mid columns, bottom row (gap for doorC).
  for (let row = 8; row <= 15; row++) {
    if (row !== 11) grid[row][6] = randInt(11, 14);
  }
  // Vertical wall between the mid and right columns, bottom row (gap for doorD).
  for (let row = 8; row <= 15; row++) {
    if (row !== 11) grid[row][13] = randInt(11, 14);
  }
  // Horizontal wall between top and bottom rows, left column (gap for doorE).
  for (let col = 0; col <= 5; col++) {
    if (col !== 2) grid[7][col] = randInt(11, 14);
  }
  // Horizontal wall between top and bottom rows, mid column (gap for doorF).
  for (let col = 7; col <= 12; col++) {
    if (col !== 9) grid[7][col] = randInt(11, 14);
  }
  // Horizontal wall between top and bottom rows, right column (gap for doorG).
  for (let col = 14; col <= 19; col++) {
    if (col !== 16) grid[7][col] = randInt(11, 14);
  }
  // Plug the two dead cells where a vertical and horizontal wall would
  // otherwise leave an unreachable gap at their intersection.
  grid[7][6] = randInt(11, 14);
  grid[7][13] = randInt(11, 14);

  grid[12][17] = 15; // stairwell, deep in the dragon's lair (bottom-right room)
}
