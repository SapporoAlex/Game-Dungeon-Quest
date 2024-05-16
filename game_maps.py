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


def game_map_0():
    grid[4][0] = rd.randint(11, 14)
    grid[5][0] = rd.randint(11, 14)
    grid[6][0] = rd.randint(11, 14)
    grid[7][0] = rd.randint(11, 14)
    grid[8][0] = rd.randint(11, 14)
    grid[9][0] = rd.randint(11, 14)
    grid[4][1] = rd.randint(11, 14)
    grid[9][1] = rd.randint(11, 14)
    grid[4][2] = rd.randint(11, 14)
    grid[6][2] = rd.randint(11, 14)
    grid[7][2] = rd.randint(11, 14)
    grid[9][2] = rd.randint(11, 14)
    grid[4][3] = rd.randint(11, 14)
    grid[7][3] = rd.randint(11, 14)
    grid[9][3] = rd.randint(11, 14)
    grid[4][4] = rd.randint(11, 14)
    grid[5][4] = rd.randint(11, 14)
    grid[6][4] = rd.randint(11, 14)
    grid[7][4] = rd.randint(11, 14)
    grid[9][4] = rd.randint(11, 14)
    grid[7][5] = rd.randint(11, 14)
    grid[9][5] = rd.randint(11, 14)
    grid[4][6] = rd.randint(11, 14)
    grid[5][6] = rd.randint(11, 14)
    grid[6][6] = rd.randint(11, 14)
    grid[7][6] = rd.randint(11, 14)
    grid[9][6] = rd.randint(11, 14)
    grid[4][7] = rd.randint(11, 14)
    grid[9][7] = rd.randint(11, 14)
    grid[4][8] = rd.randint(11, 14)
    grid[9][8] = rd.randint(11, 14)
    grid[4][9] = rd.randint(11, 14)
    grid[9][9] = rd.randint(11, 14)
    grid[4][10] = rd.randint(11, 14)
    grid[5][10] = rd.randint(11, 14)
    grid[6][10] = rd.randint(11, 14)
    grid[7][10] = rd.randint(11, 14)
    grid[9][10] = rd.randint(11, 14)
    grid[7][11] = rd.randint(11, 14)
    grid[9][11] = rd.randint(11, 14)
    grid[7][12] = rd.randint(11, 14)
    grid[9][12] = rd.randint(11, 14)
    grid[7][13] = rd.randint(11, 14)
    grid[9][13] = rd.randint(11, 14)
    grid[7][14] = rd.randint(11, 14)
    grid[9][14] = rd.randint(11, 14)
    grid[10][14] = rd.randint(11, 14)
    grid[11][14] = rd.randint(11, 14)
    grid[7][15] = rd.randint(11, 14)
    grid[11][15] = rd.randint(11, 14)
    grid[7][16] = rd.randint(11, 14)
    grid[11][16] = rd.randint(11, 14)
    grid[7][17] = rd.randint(11, 14)
    grid[11][17] = rd.randint(11, 14)
    grid[7][18] = rd.randint(11, 14)
    grid[11][18] = rd.randint(11, 14)
    grid[7][19] = rd.randint(11, 14)
    grid[8][19] = rd.randint(11, 14)
    grid[9][19] = rd.randint(11, 14)
    grid[10][19] = rd.randint(11, 14)
    grid[11][19] = rd.randint(11, 14)
    grid[9][17] = 15


def game_map_1():
    grid[1][1] = rd.randint(11, 14)
    grid[1][2] = rd.randint(11, 14)
    grid[1][3] = rd.randint(11, 14)
    grid[1][4] = rd.randint(11, 14)
    grid[1][5] = rd.randint(11, 14)
    grid[1][6] = rd.randint(11, 14)
    grid[1][7] = rd.randint(11, 14)
    grid[1][8] = rd.randint(11, 14)
    grid[1][9] = rd.randint(11, 14)
    grid[1][11] = rd.randint(11, 14)
    grid[1][12] = rd.randint(11, 14)
    grid[1][13] = rd.randint(11, 14)
    grid[1][14] = rd.randint(11, 14)
    grid[1][15] = rd.randint(11, 14)
    grid[1][16] = rd.randint(11, 14)
    grid[1][17] = rd.randint(11, 14)
    grid[1][18] = rd.randint(11, 14)
    grid[2][1] = rd.randint(11, 14)
    grid[2][4] = rd.randint(11, 14)
    grid[2][8] = rd.randint(11, 14)
    grid[2][11] = rd.randint(11, 14)
    grid[2][14] = rd.randint(11, 14)
    grid[2][18] = rd.randint(11, 14)
    grid[3][1] = rd.randint(11, 14)
    grid[3][8] = rd.randint(11, 14)
    grid[3][11] = rd.randint(11, 14)
    grid[3][18] = rd.randint(11, 14)
    grid[4][1] = rd.randint(11, 14)
    grid[4][4] = rd.randint(11, 14)
    grid[4][11] = rd.randint(11, 14)
    grid[4][14] = rd.randint(11, 14)
    grid[4][18] = rd.randint(11, 14)
    grid[5][1] = rd.randint(11, 14)
    grid[5][4] = rd.randint(11, 14)
    grid[5][8] = rd.randint(11, 14)
    grid[5][11] = rd.randint(11, 14)
    grid[5][14] = rd.randint(11, 14)
    grid[5][18] = rd.randint(11, 14)
    grid[6][1] = rd.randint(11, 14)
    grid[6][2] = rd.randint(11, 14)
    grid[6][4] = rd.randint(11, 14)
    grid[6][5] = rd.randint(11, 14)
    grid[6][6] = rd.randint(11, 14)
    grid[6][7] = rd.randint(11, 14)
    grid[6][8] = rd.randint(11, 14)
    grid[6][9] = rd.randint(11, 14)
    grid[6][10] = rd.randint(11, 14)
    grid[6][11] = rd.randint(11, 14)
    grid[6][13] = rd.randint(11, 14)
    grid[6][14] = rd.randint(11, 14)
    grid[6][15] = rd.randint(11, 14)
    grid[6][17] = rd.randint(11, 14)
    grid[6][18] = rd.randint(11, 14)
    grid[7][1] = rd.randint(11, 14)
    grid[7][4] = rd.randint(11, 14)
    grid[7][8] = rd.randint(11, 14)
    grid[7][11] = rd.randint(11, 14)
    grid[7][14] = rd.randint(11, 14)
    grid[7][18] = rd.randint(11, 14)
    grid[8][1] = rd.randint(11, 14)
    grid[8][4] = rd.randint(11, 14)
    grid[8][14] = rd.randint(11, 14)
    grid[8][18] = rd.randint(11, 14)
    grid[9][1] = rd.randint(11, 14)
    grid[9][2] = rd.randint(11, 14)
    grid[9][4] = rd.randint(11, 14)
    grid[9][5] = rd.randint(11, 14)
    grid[9][7] = rd.randint(11, 14)
    grid[9][8] = rd.randint(11, 14)
    grid[9][9] = rd.randint(11, 14)
    grid[9][10] = rd.randint(11, 14)
    grid[9][11] = rd.randint(11, 14)
    grid[9][12] = rd.randint(11, 14)
    grid[9][13] = rd.randint(11, 14)
    grid[9][14] = rd.randint(11, 14)
    grid[9][15] = rd.randint(11, 14)
    grid[9][17] = rd.randint(11, 14)
    grid[9][18] = rd.randint(11, 14)
    grid[10][1] = rd.randint(11, 14)
    grid[10][4] = rd.randint(11, 14)
    grid[10][8] = rd.randint(11, 14)
    grid[10][11] = rd.randint(11, 14)
    grid[10][14] = rd.randint(11, 14)
    grid[10][18] = rd.randint(11, 14)
    grid[11][1] = rd.randint(11, 14)
    grid[11][4] = rd.randint(11, 14)
    grid[11][8] = rd.randint(11, 14)
    grid[11][14] = rd.randint(11, 14)
    grid[11][18] = rd.randint(11, 14)
    grid[12][1] = rd.randint(11, 14)
    grid[12][8] = rd.randint(11, 14)
    grid[12][11] = rd.randint(11, 14)
    grid[12][18] = rd.randint(11, 14)
    grid[13][1] = rd.randint(11, 14)
    grid[13][4] = rd.randint(11, 14)
    grid[13][8] = rd.randint(11, 14)
    grid[13][11] = rd.randint(11, 14)
    grid[13][14] = rd.randint(11, 14)
    grid[13][18] = rd.randint(11, 14)
    grid[14][1] = rd.randint(11, 14)
    grid[14][2] = rd.randint(11, 14)
    grid[14][3] = rd.randint(11, 14)
    grid[14][4] = rd.randint(11, 14)
    grid[14][5] = rd.randint(11, 14)
    grid[14][6] = rd.randint(11, 14)
    grid[14][7] = rd.randint(11, 14)
    grid[14][8] = rd.randint(11, 14)
    grid[14][10] = rd.randint(11, 14)
    grid[14][11] = rd.randint(11, 14)
    grid[14][12] = rd.randint(11, 14)
    grid[14][13] = rd.randint(11, 14)
    grid[14][14] = rd.randint(11, 14)
    grid[14][15] = rd.randint(11, 14)
    grid[14][16] = rd.randint(11, 14)
    grid[14][17] = rd.randint(11, 14)
    grid[14][18] = rd.randint(11, 14)
    grid[7][0] = 15
    grid[7][9] = 16


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


def game_map_3():
    #b1 green
    grid[0][0] = rd.randint(1, 5)
    grid[0][1] = rd.randint(1, 5)
    grid[0][2] = rd.randint(1, 5)
    grid[0][3] = rd.randint(1, 5)
    grid[1][0] = rd.randint(1, 5)
    grid[1][1] = rd.randint(1, 5)
    grid[1][2] = rd.randint(1, 5)
    grid[1][3] = rd.randint(1, 5)
    grid[2][0] = rd.randint(1, 5)
    grid[2][1] = rd.randint(1, 5)
    grid[2][2] = rd.randint(1, 5)
    grid[2][3] = rd.randint(1, 5)
    grid[3][0] = rd.randint(1, 5)
    grid[3][1] = rd.randint(1, 5)
    grid[3][2] = rd.randint(1, 5)
    grid[3][3] = rd.randint(1, 5)

    # b2 red
    for i in range(4):
        for j in range(5, 9):
            grid[i][j] = rd.randint(11, 15)

    # b3 blue
    for i in range(4):
        for j in range(10, 14):
            grid[i][j] = rd.randint(6, 10)

    # b4 red
    for i in range(5, 10):
        for j in range(5):
            grid[i][j] = rd.randint(11, 15)

    # b5 green

    grid[5][5] = rd.randint(1, 5)
    grid[5][6] = rd.randint(1, 5)
    grid[5][7] = rd.randint(1, 5)
    grid[5][8] = rd.randint(1, 5)
    grid[5][9] = rd.randint(1, 5)
    grid[6][5] = rd.randint(1, 5)
    grid[6][6] = rd.randint(1, 5)
    grid[6][7] = rd.randint(1, 5)
    grid[6][8] = rd.randint(1, 5)
    grid[6][9] = rd.randint(1, 5)
    grid[7][5] = rd.randint(1, 5)
    grid[7][6] = rd.randint(1, 5)
    grid[7][7] = rd.randint(1, 5)
    grid[7][8] = rd.randint(1, 5)
    grid[7][9] = rd.randint(1, 5)
    grid[8][5] = rd.randint(1, 5)
    grid[8][6] = rd.randint(1, 5)
    grid[8][7] = rd.randint(1, 5)
    grid[8][8] = rd.randint(1, 5)
    grid[8][9] = rd.randint(1, 5)
    grid[9][5] = rd.randint(1, 5)
    grid[9][6] = rd.randint(1, 5)
    grid[9][7] = rd.randint(1, 5)
    grid[9][8] = rd.randint(1, 5)
    grid[9][9] = rd.randint(1, 5)

    # b6 red
    for i in range(5, 10):
        for j in range(10, 15):
            grid[i][j] = rd.randint(11, 15)

    # b7 green
    for i in range(11, 16):
        for j in range(5):
            grid[i][j] = rd.randint(1, 5)

    # b8 blue
    for i in range(11, 16):
        for j in range(5, 10):
            grid[i][j] = rd.randint(6, 10)

    #b9 red
    for i in range(11, 16):
        for j in range(10, 15):
            grid[i][j] = rd.randint(11, 15)

    #b10 blue
    for i in range(0, 16):
        for j in range(15, 20):
            grid[i][j] = rd.randint(6, 10)

    for i in range(rd.randrange(10)):
        grid[rd.randrange(0, 15)][rd.randrange(0, 14)] = 21

    #v wall 1
    for i in range(0, 1):
        grid[i][4] = rd.randint(16, 19)
    for i in range(2, 16):
        grid[i][4] = rd.randint(16, 19)

    #v wall 2
    for i in range(0, 12):
        grid[i][9] = rd.randint(16, 19)
    for i in range(13, 16):
        grid[i][9] = rd.randint(16, 19)

    # v wall 3
    for i in range(0, 1):
        grid[i][14] = rd.randint(16, 19)
    for i in range(2, 16):
        grid[i][14] = rd.randint(16, 19)

    #h wall 1
    for j in range(0, 1):
        grid[4][j] = rd.randint(16, 19)
    for j in range(2, 7):
        grid[4][j] = rd.randint(16, 19)
    for j in range(8, 11):
        grid[4][j] = rd.randint(16, 19)
    for j in range(12, 14):
        grid[4][j] = rd.randint(16, 19)

    #h wall 2
    for j in range(0, 1):
        grid[10][j] = rd.randint(16, 19)
    for j in range(2, 6):
        grid[10][j] = rd.randint(16, 19)
    for j in range(7, 12):
        grid[10][j] = rd.randint(16, 19)
    for j in range(13, 14):
        grid[10][j] = rd.randint(16, 19)

    grid[15][0] = 20
    grid[15][19] = 20
