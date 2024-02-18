import random as rd
import pygame


pygame.init()
width, height = 1200, 800
grid_size = 50
grid_color = (155, 155, 155)
number_rows = height // grid_size
number_columns = (width - 200) // grid_size

# Create a 2D array to represent the grid
grid = [[0] * number_columns for _ in range(number_rows)]

# Gives every tile a default plain tile
for row in range(number_rows):
    for col in range(number_columns):
        grid[row][col] = rd.randint(1, 10)


def game_map_1():
    grid[3][4] = 11
    grid[3][5] = 11
    grid[3][6] = 11
    grid[3][7] = 11
    grid[3][9] = 11
    grid[3][10] = 11
    grid[5][4] = 11
    grid[5][5] = 11
    grid[5][6] = 11
    grid[5][7] = 11
    grid[5][9] = 11
    grid[5][10] = 11
    grid[4][4] = 11
    grid[6][4] = 11
    grid[7][4] = 11
    grid[8][4] = 11
    grid[8][5] = 15
    grid[9][4] = 11
    grid[9][5] = 11
    grid[9][6] = 11
    grid[9][7] = 11
    grid[9][8] = 11
    grid[9][9] = 11
    grid[9][10] = 11


def game_map_2():
    grid[0][0] = 15
    grid[0][5] = rd.randint(11, 14)
    grid[0][14] = rd.randint(11, 14)
    grid[1][1] = rd.randint(11, 14)
    grid[1][2] = rd.randint(11, 14)
    grid[1][4] = rd.randint(11, 14)
    grid[1][5] = rd.randint(11, 14)
    grid[1][6] = rd.randint(11, 14)
    grid[1][7] = rd.randint(11, 14)
    grid[1][8] = rd.randint(11, 14)
    grid[1][11] = rd.randint(11, 14)
    grid[1][12] = rd.randint(11, 14)
    grid[1][13] = rd.randint(11, 14)
    grid[1][14] = rd.randint(11, 14)
    grid[1][15] = rd.randint(11, 14)
    grid[1][16] = rd.randint(11, 14)
    grid[1][17] = rd.randint(11, 14)
    grid[1][18] = rd.randint(11, 14)
    grid[2][1] = rd.randint(11, 14)
    grid[2][5] = rd.randint(11, 14)
    grid[2][8] = rd.randint(11, 14)
    grid[2][11] = rd.randint(11, 14)
    grid[2][18] = rd.randint(11, 14)
    grid[3][1] = rd.randint(11, 14)
    grid[3][5] = rd.randint(11, 14)
    grid[3][8] = rd.randint(11, 14)
    grid[3][18] = rd.randint(11, 14)
    grid[4][1] = rd.randint(11, 14)
    grid[4][5] = rd.randint(11, 14)
    grid[4][8] = rd.randint(11, 14)
    grid[4][11] = rd.randint(11, 14)
    grid[4][12] = rd.randint(11, 14)
    grid[4][13] = rd.randint(11, 14)
    grid[4][14] = rd.randint(11, 14)
    grid[4][15] = rd.randint(11, 14)
    grid[4][17] = rd.randint(11, 14)
    grid[4][18] = rd.randint(11, 14)
    grid[5][1] = rd.randint(11, 14)
    grid[5][11] = rd.randint(11, 14)
    grid[5][14] = rd.randint(11, 14)
    grid[5][18] = rd.randint(11, 14)
    grid[6][1] = rd.randint(11, 14)
    grid[6][5] = rd.randint(11, 14)
    grid[6][8] = rd.randint(11, 14)
    grid[6][18] = rd.randint(11, 14)
    grid[7][1] = rd.randint(11, 14)
    grid[7][2] = rd.randint(11, 14)
    grid[7][3] = rd.randint(11, 14)
    grid[7][4] = rd.randint(11, 14)
    grid[7][5] = rd.randint(11, 14)
    grid[7][7] = rd.randint(11, 14)
    grid[7][8] = rd.randint(11, 14)
    grid[7][9] = rd.randint(11, 14)
    grid[7][10] = rd.randint(11, 14)
    grid[7][11] = rd.randint(11, 14)
    grid[7][12] = rd.randint(11, 14)
    grid[7][13] = rd.randint(11, 14)
    grid[7][14] = rd.randint(11, 14)
    grid[7][18] = rd.randint(11, 14)
    grid[8][8] = rd.randint(11, 14)
    grid[8][14] = rd.randint(11, 14)
    grid[8][18] = rd.randint(11, 14)
    grid[9][1] = rd.randint(11, 14)
    grid[9][2] = rd.randint(11, 14)
    grid[9][3] = rd.randint(11, 14)
    grid[9][5] = rd.randint(11, 14)
    grid[9][7] = rd.randint(11, 14)
    grid[9][8] = rd.randint(11, 14)
    grid[9][11] = rd.randint(11, 14)
    grid[9][12] = rd.randint(11, 14)
    grid[9][14] = rd.randint(11, 14)
    grid[9][15] = rd.randint(11, 14)
    grid[9][17] = rd.randint(11, 14)
    grid[9][18] = rd.randint(11, 14)
    grid[10][1] = rd.randint(11, 14)
    grid[10][5] = rd.randint(11, 14)
    grid[10][8] = rd.randint(11, 14)
    grid[10][11] = rd.randint(11, 14)
    grid[10][18] = rd.randint(11, 14)
    grid[11][0] = rd.randint(11, 14)
    grid[11][1] = rd.randint(11, 14)
    grid[11][5] = rd.randint(11, 14)
    grid[11][11] = rd.randint(11, 14)
    grid[11][18] = rd.randint(11, 14)
    grid[12][1] = rd.randint(11, 14)
    grid[12][5] = rd.randint(11, 14)
    grid[12][8] = rd.randint(11, 14)
    grid[12][11] = rd.randint(11, 14)
    grid[12][18] = rd.randint(11, 14)
    grid[13][1] = rd.randint(11, 14)
    grid[13][8] = rd.randint(11, 14)
    grid[13][11] = rd.randint(11, 14)
    grid[13][18] = rd.randint(11, 14)
    grid[14][1] = rd.randint(11, 14)
    grid[14][2] = rd.randint(11, 14)
    grid[14][4] = rd.randint(11, 14)
    grid[14][5] = rd.randint(11, 14)
    grid[14][6] = rd.randint(11, 14)
    grid[14][7] = rd.randint(11, 14)
    grid[14][8] = rd.randint(11, 14)
    grid[14][9] = rd.randint(11, 14)
    grid[14][10] = rd.randint(11, 14)
    grid[14][11] = rd.randint(11, 14)
    grid[14][12] = rd.randint(11, 14)
    grid[14][13] = rd.randint(11, 14)
    grid[14][14] = rd.randint(11, 14)
    grid[14][15] = rd.randint(11, 14)
    grid[14][16] = rd.randint(11, 14)
    grid[14][17] = rd.randint(11, 14)
    grid[14][18] = rd.randint(11, 14)
    grid[15][8] = rd.randint(11, 14)
