import pygame
import sys
import random as rd
import game_maps

# Hello brave adventurer!
# To add a new level,
# add a new wall grid to the game_maps.py module, values between 11 and 14 are walls, 15 is the stairwell, 16 the chains
# please add a new button for it on the menu (205),
# add the button logic to the mission select menu (796),
# add the level select logic to (829),
# within the main loop (832), add the 'if chosen_level == level_3...' constants including doors.
# follow the example of the pre-existing levels (875),
# add logic to the level within the 'if player turn', using if statements such as:
# "if (door8 not in doors or door11 not in doors) and room1closed and chosen_map == level_3:"
# Basically events trigger when a door is opened or the player is at a specified x y
# Good luck!

# Initiate Pygame and music
pygame.init()
pygame.mixer.init()

# Constants
width, height = 1200, 800
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Dungeon Delver")
grid_size = 50
grid_color = (155, 155, 155)
number_rows = height // grid_size
number_columns = (width - 200) // grid_size
run = True

# Initial setup
main_menu_screen = True
main_menu_view = True
mission_select_screen_view = False
mission_selected = False
chosen_map = 0

# Main menu images
main_bg = pygame.image.load("assets/images/Main_bg.jpg")
title_img = pygame.image.load("assets/images/title_img.png")
main_menu_bg = pygame.image.load("assets/images/Title_meny_box_bg.png")
select_mission_button = pygame.image.load("assets/images/select_quest_button.png")
mission_0_button = pygame.image.load("assets/images/Tutorial.png")
mission_1_button = pygame.image.load("assets/images/Quest 1.png")
mission_2_button = pygame.image.load("assets/images/Quest 2.png")
icon = pygame.image.load('assets/icon.jpg')
pygame.display.set_icon(icon)

# In-game UI images
panel_img = pygame.image.load("assets/images/UI/panel.jpg")
move_button_img = pygame.image.load("assets/images/UI/move_button_img.jpg")
move_button_pressed_img = pygame.image.load("assets/images/UI/move_button_pressed_img.jpg")
attack_button_img = pygame.image.load("assets/images/UI/attack_button_img.jpg")
attack_button_pressed_img = pygame.image.load("assets/images/UI/attack_button_pressed_img.jpg")
search_button_img = pygame.image.load("assets/images/UI/search_button_img.jpg")
search_button_pressed_img = pygame.image.load("assets/images/UI/search_button_pressed_img.jpg")
pass_button_img = pygame.image.load("assets/images/UI/pass_turn_img.jpg")
life_img = pygame.image.load("assets/images/UI/life_img.jpg")
potion_img = pygame.image.load("assets/images/UI/potion_img.jpg")
loot_img = pygame.image.load("assets/images/UI/loot_img.jpg")
minus_one_img = pygame.image.load("assets/images/UI/minus_1.png")
minus_two_img = pygame.image.load("assets/images/UI/minus_2.png")
minus_three_img = pygame.image.load("assets/images/UI/minus_3.png")
minus_four_img = pygame.image.load("assets/images/UI/minus_4.png")
minus_five_img = pygame.image.load("assets/images/UI/minus_5.png")
zero_img = pygame.image.load("assets/images/UI/0.png")
one_img = pygame.image.load("assets/images/UI/1.png")
two_img = pygame.image.load("assets/images/UI/2.png")
three_img = pygame.image.load("assets/images/UI/3.png")
four_img = pygame.image.load("assets/images/UI/4.png")
five_img = pygame.image.load("assets/images/UI/5.png")
six_img = pygame.image.load("assets/images/UI/6.png")
seven_img = pygame.image.load("assets/images/UI/7.png")
eight_img = pygame.image.load("assets/images/UI/8.png")
nine_img = pygame.image.load("assets/images/UI/9.png")
panel_status_base_img = pygame.image.load("assets/images/UI/panel_base.png")
player_movement_phase_img = pygame.image.load("assets/images/UI/panel_base_movement_phase.png")
player_attack_phase_img = pygame.image.load("assets/images/UI/panel_base_attack_phase.png")
player_idle_phase_img = pygame.image.load("assets/images/UI/panel_base_idle_phase.png")
enemy_movement_phase_img = pygame.image.load("assets/images/UI/panel_base_e_movement_phase.png")
enemy_attack_phase_img = pygame.image.load("assets/images/UI/panel_base_e_attack_phase.png")
enemy_idle_phase_img = pygame.image.load("assets/images/UI/panel_base_e_idle_phase.png")
one_skull_img = pygame.image.load("assets/images/UI/one_skull.jpg")
two_skull_img = pygame.image.load("assets/images/UI/two_skull.jpg")
three_skull_img = pygame.image.load("assets/images/UI/three_skull.jpg")
four_skull_img = pygame.image.load("assets/images/UI/four_skull.jpg")
five_skull_img = pygame.image.load("assets/images/UI/five_skull.jpg")
six_skull_img = pygame.image.load("assets/images/UI/six_skull.jpg")
one_shield_img = pygame.image.load("assets/images/UI/one_shield.jpg")
two_shield_img = pygame.image.load("assets/images/UI/two_shield.jpg")
three_shield_img = pygame.image.load("assets/images/UI/three_shield.jpg")
attack_field_blank = pygame.image.load("assets/images/UI/attack field blank.jpg")

# Messages
defeat_the_red_dragon_msg = pygame.image.load("assets/images/msgs/defeat_the_red_dragon_msg.png")
died_msg = pygame.image.load("assets/images/msgs/died_msg.png")
quest_complete = pygame.image.load("assets/images/msgs/quest_complete_msg.png")
red_dragon_defeated_msg = pygame.image.load("assets/images/msgs/red_dragon_defeated_msg.png")
nothing_found_msg = pygame.image.load("assets/images/msgs/nothing_found_msg.png")
gold_found_msg = pygame.image.load("assets/images/msgs/find gold.png")
potion_found_msg = pygame.image.load("assets/images/msgs/find health potion.png")
use_arrow_keys_msg = pygame.image.load("assets/images/msgs/usethearrowkeysmsg.png")
arrow_trap_msg = pygame.image.load("assets/images/msgs/youactivateanarrowtrapmsg.png")
doors_msg = pygame.image.load("assets/images/msgs/clickondoorstoopenmsg.png")
click_on_potion_msg = pygame.image.load("assets/images/msgs/clickonpotionmsg.png")
attack_msg = pygame.image.load("assets/images/msgs/clickonattackphasemsg.png")
search_msg = pygame.image.load("assets/images/msgs/clickonsearchmsg.png")
step_on_stairwell_msg = pygame.image.load("assets/images/msgs/stepontothestairwellmsg.png")
escape_msg = pygame.image.load("assets/images/msgs/escape_msg.png")

# Furniture images
barrel_img = pygame.image.load("assets/images/barrel_img.png")
crate_img = pygame.image.load("assets/images/crate_img.png")
chest_img_down = pygame.image.load("assets/images/chest_img_down.png")
chest_img_left = pygame.image.load("assets/images/chest_img_left.png")
chest_img_right = pygame.image.load("assets/images/chest_img_right.png")
chest_img_up = pygame.image.load("assets/images/chest_img_up.png")
door_ns = pygame.image.load("assets/images/door_ns.png")
door_ew = pygame.image.load("assets/images/door_ew.png")
table_ns = pygame.image.load("assets/images/table_ns.png")
table_ew = pygame.image.load("assets/images/table_ew.png")

# Character images
barbarian_img_down = pygame.image.load("assets/images/barbarian_down_img.png")
barbarian_img_up = pygame.image.load("assets/images/barbarian_up_img.png")
barbarian_img_left = pygame.image.load("assets/images/barbarian_left_img.png")
barbarian_img_right = pygame.image.load("assets/images/barbarian_right_img.png")
skeleton_down_img = pygame.image.load("assets/images/skeleton_img_down.png")
skeleton_left_img = pygame.image.load("assets/images/skeleton_img_left.png")
skeleton_right_img = pygame.image.load("assets/images/skeleton_img_right.png")
skeleton_up_img = pygame.image.load("assets/images/skeleton_img_up.png")
goblin_down_img = pygame.image.load("assets/images/goblin_img_down.png")
goblin_left_img = pygame.image.load("assets/images/goblin_img_left.png")
goblin_right_img = pygame.image.load("assets/images/goblin_img_right.png")
goblin_up_img = pygame.image.load("assets/images/goblin_img_up.png")
rogue_img_down = pygame.image.load("assets/images/elf_down_img.png")
rogue_img_up = pygame.image.load("assets/images/elf_up_img.png")
rogue_img_left = pygame.image.load("assets/images/elf_left_img.png")
rogue_img_right = pygame.image.load("assets/images/elf_right_img.png")
chaos_warrior_down_img = pygame.image.load("assets/images/chaos_warrior_down_img.png")
chaos_warrior_left_img = pygame.image.load("assets/images/chaos_warrior_left_img.png")
chaos_warrior_right_img = pygame.image.load("assets/images/chaos_warrior_right_img.png")
chaos_warrior_up_img = pygame.image.load("assets/images/chaos_warrior_up_img.png")
dragon_down_img = pygame.image.load("assets/images/dragon_down_img.png")
dragon_left_img = pygame.image.load("assets/images/dragon_left_img.png")
dragon_right_img = pygame.image.load("assets/images/dragon_right_img.png")
dragon_up_img = pygame.image.load("assets/images/dragon_up_img.png")

FLOOR_TILE_PATHS = ["assets/images/floor_tile_img_1.png", "assets/images/floor_tile_img_2.png",
                    "assets/images/floor_tile_img_3.png", "assets/images/floor_tile_img_4.png",
                    "assets/images/floor_tile_img_5.png", "assets/images/floor_tile_img_6.png",
                    "assets/images/floor_tile_img_7.png", "assets/images/floor_tile_img_8.png",
                    "assets/images/floor_tile_img_9.png", "assets/images/floor_tile_img_10.png"]
WALL_TILE_PATHS = ["assets/images/wall_img_1.png", "assets/images/wall_img_2.png",
                   "assets/images/wall_img_3.png", "assets/images/wall_img_4.png", ]
stairs_img = pygame.image.load("assets/images/stairs_img.png")
chain_img = pygame.image.load("assets/images/chain_tile_img.png")

# Sounds
ATTACK_SOUNDS = ["assets/audio/attack.mp3", "assets/audio/attack2.mp3",
                 "assets/audio/attack3.mp3", "assets/audio/attack4.mp3",
                 "assets/audio/attack5.mp3"]
shield_sound = pygame.mixer.Sound("assets/audio/shield.mp3")
chest_sound = pygame.mixer.Sound("assets/audio/chest.mp3")
click_sound = pygame.mixer.Sound("assets/audio/click.mp3")
DEATH_SOUNDS = ["assets/audio/death.mp3", "assets/audio/death2.mp3"]
ENEMY_DEATH_SOUNDS = ["assets/audio/enemy_death2.mp3", "assets/audio/enemy death.mp3"]

# For the UI. It goes to -5 just to stop the game crashing on a negative HP or attack.
# They aren't usually visible in-game
number_to_images_dict = {
    -5: minus_five_img,
    -4: minus_four_img,
    -3: minus_three_img,
    -2: minus_two_img,
    -1: minus_one_img,
    1: one_img,
    2: two_img,
    3: three_img,
    4: four_img,
    5: five_img,
    6: six_img,
    7: seven_img,
    8: eight_img,
    9: nine_img,
    0: zero_img
}

floor_tile_images = [pygame.image.load(path).convert_alpha() for path in FLOOR_TILE_PATHS]
wall_tile_images = [pygame.image.load(path).convert_alpha() for path in WALL_TILE_PATHS]

# Floor tiles for areas the characters can move,
# wall tiles that block movement,
# the stairwell tile used for the exit
# and the chain decoration tile for level 1 start pos.
tile_dict = {
    1: floor_tile_images[0],
    2: floor_tile_images[1],
    3: floor_tile_images[2],
    4: floor_tile_images[3],
    5: floor_tile_images[4],
    6: floor_tile_images[5],
    7: floor_tile_images[6],
    8: floor_tile_images[7],
    9: floor_tile_images[8],
    10: floor_tile_images[9],
    11: wall_tile_images[0],
    12: wall_tile_images[1],
    13: wall_tile_images[2],
    14: wall_tile_images[3],
    15: stairs_img,
    16: chain_img
}

# Buttons
move_button_placeholder = move_button_img
attack_button_placeholder = attack_button_img
search_button_placeholder = search_button_img
potion_button_placeholder = potion_img
select_mission_button_placeholder = select_mission_button
mission_0_button_placeholder = mission_0_button
mission_1_button_placeholder = mission_1_button
mission_2_button_placeholder = mission_2_button

move_button_rect = pygame.Rect(width - 170, 200, move_button_placeholder.get_width(),
                               move_button_placeholder.get_height())
attack_button_rect = pygame.Rect(width - 170, 270, attack_button_placeholder.get_width(),
                                 attack_button_placeholder.get_height())
search_button_rect = pygame.Rect(width - 170, 340, search_button_placeholder.get_width(),
                                 search_button_placeholder.get_height())
potion_button_rect = pygame.Rect(width - 170, 410, potion_button_placeholder.get_width(),
                                 potion_button_placeholder.get_height())
pass_button_rect = pygame.Rect(width - 170, 725, pass_button_img.get_width(), pass_button_img.get_height())

select_mission_button_rect = pygame.Rect(width / 2 - 122, 400, select_mission_button_placeholder.get_width(),
                                         select_mission_button_placeholder.get_height())
mission_0_button_rect = pygame.Rect(width / 2 - 122, 400, mission_0_button_placeholder.get_width(),
                                    mission_0_button_placeholder.get_height())
mission_1_button_rect = pygame.Rect(width / 2 - 122, 460, mission_1_button_placeholder.get_width(),
                                    mission_1_button_placeholder.get_height())
mission_2_button_rect = pygame.Rect(width / 2 - 122, 520, mission_2_button_placeholder.get_width(),
                                    mission_2_button_placeholder.get_height())


class Furniture:
    def __init__(self, x, y, image):
        self.x = x
        self.y = y
        self.image = image

    def draw(self, window):
        window.blit(self.image, (self.x, self.y))


class Door(Furniture):
    def __init__(self, x, y, image):
        super().__init__(x, y, image)
        self.door_img = door_ns


class Crate(Furniture):
    def __init__(self, x, y, image, searched):
        super().__init__(x, y, image)
        self.crate_img = crate_img
        self.searched = 0


class Barrel(Furniture):
    def __init__(self, x, y, image, searched):
        super().__init__(x, y, image)
        self.barrel_img = barrel_img
        self.searched = 0


class Table(Furniture):
    def __init__(self, x, y, image, searched):
        super().__init__(x, y, image)
        self.table_img = table_ns
        self.searched = 0


class Chest(Furniture):
    def __init__(self, x, y, image, searched):
        super().__init__(x, y, image)
        self.chest_img = chest_img_left
        self.searched = 0


def calculate_distance(x1, y1, x2, y2):
    return ((x2 - x1)**2 + (y2 - y1)**2)**0.5


class Enemy:
    def __init__(self, x, y, health=2):
        self.attacks = 1
        self.x = x
        self.y = y
        self.health = health
        self.enemy_img = goblin_down_img # Example image

    def draw(self, window):
        window.blit(self.enemy_img, (self.x, self.y))

    def move_towards_player(self, player_x, player_y):
        distance = calculate_distance(self.x, self.y, player_x, player_y)
        if distance <= 400:  # If within 400 pixels
            dx, dy = 0, 0
            # Determine direction to move
            if player_x > self.x:
                dx = grid_size
            elif player_x < self.x:
                dx = -grid_size
            if player_y > self.y:
                dy = grid_size
            elif player_y < self.y:
                dy = -grid_size

            # Move up to 6 tiles towards the player
            for _ in range(6):
                # Check if next move would bring the enemy closer
                if calculate_distance(self.x + dx, self.y + dy, player_x, player_y) < distance:
                    self.x += dx + 50
                    self.y += dy
                    distance = calculate_distance(self.x, self.y, player_x, player_y)
                else:
                    break

    def attack_player(self, player):
        distance = calculate_distance(self.x, self.y, player.x, player.y)
        if distance <= 50:  # Enemy is adjacent to the player
            # Roll dice for the enemy attack
            attack_rolls = roll_dice(3)
            skulls = count_skulls(attack_rolls)
            # Roll dice for the player defense
            defense_rolls = roll_dice(3)  # Assuming player always rolls 2 dice for defense
            shields = count_shields(defense_rolls)
            display_dice_rolls(attack_rolls, defense_rolls)
            pygame.display.flip()
            # Calculate damage
            damage = max(0, skulls - shields)  # Ensure damage is not negative
            # Apply damage to player
            player.health -= damage
            for i in range(damage):
                death_sound = rd.choice(DEATH_SOUNDS)
                pygame.mixer.Sound(death_sound).play()
                pygame.time.wait(200)

            # You might want to add some logic to handle the player's health reaching 0 or below


class Skeleton(Enemy):
    def __init__(self, x, y, health=1):
        super().__init__(x, y, health)
        self.enemy_img = skeleton_down_img  # Default image

    def move_towards_player(self, player_x, player_y):
        distance = calculate_distance(self.x, self.y, player_x, player_y)
        if 500 >= distance >= 100:  # Check if within 500 pixels but not too close
            dx, dy = 0, 0
            if player_x > self.x:
                dx = grid_size
                self.enemy_img = skeleton_right_img
            elif player_x < self.x:
                dx = -grid_size
                self.enemy_img = skeleton_left_img
            if player_y > self.y:
                dy = grid_size
                self.enemy_img = skeleton_down_img
            elif player_y < self.y:
                dy = -grid_size
                self.enemy_img = skeleton_up_img

            # Calculate the new position and grid indices
            new_x = self.x + dx
            new_y = self.y + dy
            grid_x = new_x // grid_size
            grid_y = new_y // grid_size

            for _ in range(6):
                # Check if the new position is within bounds and not a wall
                if 0 <= grid_x < number_columns and 0 <= grid_y < number_rows:
                    if game_maps.grid[grid_y][grid_x] <= 10:  # Assuming numbers <= 10 are not walls
                        # Update the enemy's position if it's not a wall
                        self.x = new_x
                        self.y = new_y


class Goblin(Enemy):
    def __init__(self, x, y, health=1):
        super().__init__(x, y, health)
        self.enemy_img = goblin_down_img  # Default image

    def move_towards_player(self, player_x, player_y):
        distance = calculate_distance(self.x, self.y, player_x, player_y)
        if 500 >= distance >= 100:  # Check if within 400 pixels but not too close
            dx, dy = 0, 0
            if player_x > self.x:
                dx = grid_size
                self.enemy_img = goblin_right_img
            elif player_x < self.x:
                dx = -grid_size
                self.enemy_img = goblin_left_img
            if player_y > self.y:
                dy = grid_size
                self.enemy_img = goblin_down_img
            elif player_y < self.y:
                dy = -grid_size
                self.enemy_img = goblin_up_img

            # Calculate the new position and grid indices
            new_x = self.x + dx
            new_y = self.y + dy
            grid_x = new_x // grid_size
            grid_y = new_y // grid_size

            # Check if the new position is within bounds and not a wall
            for _ in range(6):
                if 0 <= grid_x < number_columns and 0 <= grid_y < number_rows:
                    if game_maps.grid[grid_y][grid_x] <= 10:  # numbers <= 10 are not walls
                        # Update the enemy's position if it's not a wall
                        self.x = new_x
                        self.y = new_y

    def attack_player(self, player):
        distance = calculate_distance(self.x, self.y, player.x, player.y)
        if distance <= 50:  # Enemy is adjacent to the player
            # Roll dice for the enemy attack
            attack_rolls = roll_dice(1)
            skulls = count_skulls(attack_rolls)
            # Roll dice for the player defense
            defense_rolls = roll_dice(3)  # Assuming player always rolls 2 dice for defense
            shields = count_shields(defense_rolls)
            display_dice_rolls(attack_rolls, defense_rolls)
            pygame.display.flip()
            # Calculate damage
            damage = max(0, skulls - shields)  # Ensure damage is not negative
            # Apply damage to player
            player.health -= damage
            for i in range(damage):
                death_sound = rd.choice(DEATH_SOUNDS)
                pygame.mixer.Sound(death_sound).play()
                pygame.time.wait(200)


class ChaosWarrior(Enemy):
    def __init__(self, x, y, health=2):
        super().__init__(x, y, health)
        self.enemy_img = chaos_warrior_down_img  # Default image

    def move_towards_player(self, player_x, player_y):
        distance = calculate_distance(self.x, self.y, player_x, player_y)
        if 500 >= distance >= 100:  # Check if within 400 pixels but not too close
            dx, dy = 0, 0
            if player_x > self.x:
                dx = grid_size
                self.enemy_img = chaos_warrior_right_img
            elif player_x < self.x:
                dx = -grid_size
                self.enemy_img = chaos_warrior_left_img
            if player_y > self.y:
                dy = grid_size
                self.enemy_img = chaos_warrior_down_img
            elif player_y < self.y:
                dy = -grid_size
                self.enemy_img = chaos_warrior_up_img

            # Calculate the new position and grid indices
            new_x = self.x + dx
            new_y = self.y + dy
            grid_x = new_x // grid_size
            grid_y = new_y // grid_size

            # Check if the new position is within bounds and not a wall
            for _ in range(6):
                if 0 <= grid_x < number_columns and 0 <= grid_y < number_rows:
                    if game_maps.grid[grid_y][grid_x] <= 10:  # numbers <= 10 are not walls
                        # Update the enemy's position if it's not a wall
                        self.x = new_x
                        self.y = new_y

    def attack_player(self, player):
        distance = calculate_distance(self.x, self.y, player.x, player.y)
        if distance <= 50:  # Enemy is adjacent to the player
            # Roll dice for the enemy attack
            attack_rolls = roll_dice(3)
            skulls = count_skulls(attack_rolls)
            # Roll dice for the player defense
            defense_rolls = roll_dice(3)  # Assuming player always rolls 2 dice for defense
            shields = count_shields(defense_rolls)
            display_dice_rolls(attack_rolls, defense_rolls)
            pygame.display.flip()
            # Calculate damage
            damage = max(0, skulls - shields)  # Ensure damage is not negative
            # Apply damage to player
            player.health -= damage
            for i in range(damage):
                death_sound = rd.choice(DEATH_SOUNDS)
                pygame.mixer.Sound(death_sound).play()
                pygame.time.wait(200)


class Dragon(Enemy):
    def __init__(self, x, y, health=4):
        super().__init__(x, y, health)
        self.enemy_img = dragon_down_img  # Default image

    def move_towards_player(self, player_x, player_y):
        distance = calculate_distance(self.x, self.y, player_x, player_y)
        if 500 >= distance >= 100:  # Check if within 400 pixels but not too close
            dx, dy = 0, 0
            if player_x > self.x:
                dx = grid_size
                self.enemy_img = dragon_right_img
            elif player_x < self.x:
                dx = -grid_size
                self.enemy_img = dragon_left_img
            if player_y > self.y:
                dy = grid_size
                self.enemy_img = dragon_down_img
            elif player_y < self.y:
                dy = -grid_size
                self.enemy_img = dragon_up_img

            # Calculate the new position and grid indices
            new_x = self.x + dx
            new_y = self.y + dy
            grid_x = new_x // grid_size
            grid_y = new_y // grid_size

            # Check if the new position is within bounds and not a wall
            for _ in range(6):
                if 0 <= grid_x < number_columns and 0 <= grid_y < number_rows:
                    if game_maps.grid[grid_y][grid_x] <= 10:  # numbers <= 10 are not walls
                        # Update the enemy's position if it's not a wall
                        self.x = new_x
                        self.y = new_y

    def attack_player(self, player):
        distance = calculate_distance(self.x, self.y, player.x, player.y)
        if distance <= 50:  # Enemy is adjacent to the player
            # Roll dice for the enemy attack
            attack_rolls = roll_dice(5)
            skulls = count_skulls(attack_rolls)
            # Roll dice for the player defense
            defense_rolls = roll_dice(3)  # Assuming player always rolls 2 dice for defense
            shields = count_shields(defense_rolls)
            display_dice_rolls(attack_rolls, defense_rolls)
            pygame.display.flip()
            # Calculate damage
            damage = max(0, skulls - shields)  # Ensure damage is not negative
            # Apply damage to player
            player.health -= damage
            for i in range(damage):
                death_sound = rd.choice(DEATH_SOUNDS)
                pygame.mixer.Sound(death_sound).play()
                pygame.time.wait(200)


class Player:
    def __init__(self, x, y, size):
        self.player_img = barbarian_img_down
        self.mask = pygame.mask.from_surface(self.player_img)
        self.x = x
        self.y = y
        self.size = size
        self.maximum_movement = 6
        self.movement = 6
        self.attack = 2
        self.search = 1
        self.maximum_health = 8
        self.health = 8
        self.potion = 1
        self.loot = 0

    def move(self, dx, dy, enemies):
        new_x = self.x + dx
        new_y = self.y + dy
        for enemy in enemies:
            if new_x == enemy.x and new_y == enemy.y:
                return False
        for door in doors:
            if new_x == door.x and new_y == door.y:
                return False
        grid_x = new_x // grid_size
        grid_y = new_y // grid_size

        if 0 <= grid_x < number_columns and 0 <= grid_y < number_rows:
            if game_maps.grid[grid_y][grid_x] <= 10 or game_maps.grid[grid_y][grid_x] == 15:
                self.x = new_x
                self.y = new_y
                player.movement -= 1
                return True
        return False


def draw_floor_tiles():
    for row in range(number_rows):
        for col in range(number_columns):
            if game_maps.grid[row][col] <= 10:
                random_floor_tile = tile_dict[game_maps.grid[row][col]]
                screen.blit(random_floor_tile, (col * grid_size, row * grid_size))
            elif 11 <= game_maps.grid[row][col] <= 14:
                random_wall_tile = tile_dict[game_maps.grid[row][col]]
                screen.blit(random_wall_tile, (col * grid_size, row * grid_size))
            elif game_maps.grid[row][col] == 15:
                screen.blit(stairs_img, (col * grid_size, row * grid_size))
            elif game_maps.grid[row][col] == 16:
                screen.blit(chain_img, (col * grid_size, row * grid_size))


def clear_floor_tiles():
    for row in range(number_rows):
        for col in range(number_columns):
            if game_maps.grid[row][col] <= 10:
                random_floor_tile = tile_dict[game_maps.grid[row][col]]
                screen.blit(random_floor_tile, (col * grid_size, row * grid_size))
            elif 11 <= game_maps.grid[row][col] <= 14:
                game_maps.grid[row][col] = rd.randint(1, 10)
                random_floor_tile = tile_dict[game_maps.grid[row][col]]
                screen.blit(random_floor_tile, (col * grid_size, row * grid_size))
            elif game_maps.grid[row][col] == 15:
                game_maps.grid[row][col] = rd.randint(1, 10)
                random_floor_tile = tile_dict[game_maps.grid[row][col]]
                screen.blit(random_floor_tile, (col * grid_size, row * grid_size))


def display_abilities(movement, attack, search, health, potion, loot):
    screen.blit(move_button_placeholder, (width - 170, 200))
    screen.blit(attack_button_placeholder, (width - 170, 270))
    screen.blit(search_button_placeholder, (width - 170, 340))
    screen.blit(potion_img, (width - 170, 410))
    screen.blit(life_img, (width - 170, 480))
    screen.blit(loot_img, (width - 170, 550))
    screen.blit(number_to_images_dict[movement], (width - 80, 200))
    screen.blit(number_to_images_dict[attack], (width - 80, 270))
    screen.blit(number_to_images_dict[search], (width - 80, 340))
    screen.blit(number_to_images_dict[potion], (width - 80, 410))
    screen.blit(number_to_images_dict[health], (width - 80, 480))
    screen.blit(number_to_images_dict[loot], (width - 80, 550))


def display_message(msg):
    screen.blit(msg, (300, 250))
    pygame.display.flip()
    pygame.time.wait(2000)


def is_click_on_enemy(click_pos, enemy):
    enemy_rect = pygame.Rect(enemy.x, enemy.y, enemy.enemy_img.get_width(), enemy.enemy_img.get_height())
    return (enemy_rect.collidepoint(click_pos) and
            calculate_distance(player.x, player.y, enemy.x, enemy.y) <= (100 if isinstance(enemy, Dragon) else 50))


def is_click_on_door(click_pos, door):
    door_rect = pygame.Rect(door.x, door.y, door.door_img.get_width(), door.door_img.get_height())
    return door_rect.collidepoint(click_pos) and calculate_distance(player.x, player.y, door.x, door.y) <= 50


def is_click_on_barrel(click_pos, barrel):
    barrel_rect = pygame.Rect(barrel.x, barrel.y, barrel.barrel_img.get_width(), barrel.barrel_img.get_height())
    return barrel_rect.collidepoint(click_pos) and calculate_distance(player.x, player.y, barrel.x, barrel.y) <= 50


def is_click_on_crate(click_pos, crate):
    crate_rect = pygame.Rect(crate.x, crate.y, crate.crate_img.get_width(), crate.crate_img.get_height())
    return crate_rect.collidepoint(click_pos) and calculate_distance(player.x, player.y, crate.x, crate.y) <= 50


def is_click_on_table(click_pos, table):
    table_rect = pygame.Rect(table.x, table.y, table.table_img.get_width(), table.table_img.get_height())
    return table_rect.collidepoint(click_pos) and calculate_distance(player.x, player.y, table.x, table.y) <= 100


def is_click_on_chest(click_pos, chest):
    chest_rect = pygame.Rect(chest.x, chest.y, chest.chest_img.get_width(), chest.chest_img.get_height())
    return chest_rect.collidepoint(click_pos) and calculate_distance(player.x, player.y, chest.x, chest.y) <= 50


def activate_arrow_trap():
    arrow_trap_damage = rd.randint(0, 2)
    if arrow_trap_damage >= 1:
        for i in range(arrow_trap_damage):
            death_sound = rd.choice(DEATH_SOUNDS)
            pygame.mixer.Sound(death_sound).play()
    player.health -= arrow_trap_damage
    display_message(arrow_trap_msg)


def roll_dice(num_dice, sides=2):
    return [rd.randint(1, sides) for _ in range(num_dice)]


def count_skulls(dice_rolls):
    return dice_rolls.count(2)  # Assuming 2 represents a skull


def count_shields(dice_rolls):
    return dice_rolls.count(2)  # Assuming 2 represents a shield


def display_dice_rolls(attack_rolls, defense_rolls):
    skull_images = {1: one_skull_img, 2: two_skull_img, 3: three_skull_img, 4: four_skull_img, 5: five_skull_img,
                    6: six_skull_img}
    shield_images = {1: one_shield_img, 2: two_shield_img, 3: three_shield_img}
    skulls = count_skulls(attack_rolls)
    shields = count_shields(defense_rolls)
    if skulls > 0:
        screen.blit(skull_images[skulls], (width - 170, height - 180))
    if shields > 0:
        screen.blit(shield_images[shields], (width - 170, height - 130))
    for s in range(skulls):
        attack_sound = rd.choice(ATTACK_SOUNDS)
        pygame.mixer.Sound(attack_sound).play()
        pygame.time.wait(200)


def display_panel():
    screen.blit(panel_img, (width - 200, 0))


def display_phase():
    screen.blit(current_phase_img, (width - 175, 25))


def draw_grid():
    # Draw grid lines
    for x in range(0, width - 200, grid_size):
        pygame.draw.line(screen, grid_color, (x, 0), (x, height))
    for y in range(0, height, grid_size):
        pygame.draw.line(screen, grid_color, (0, y), (width - 200, y))


def search():
    player.search -= 1
    luck = rd.randint(1, 4)
    if luck <= 2:
        display_message(nothing_found_msg)
    if luck == 3:
        display_message(potion_found_msg)
        player.potion += 1
    if luck == 4:
        display_message(gold_found_msg)
        player.loot += 1


# menu_music = pygame.mixer.Sound("assets/audio/Hero Quest Amiga Theme.mp3")
def display_everything():
    screen.fill((0, 0, 0))
    display_panel()
    display_phase()
    screen.blit(move_button_img, move_button_rect.topleft)
    screen.blit(attack_button_img, attack_button_rect.topleft)
    screen.blit(search_button_img, search_button_rect.topleft)
    screen.blit(pass_button_img, pass_button_rect.topleft)
    draw_floor_tiles()
    draw_grid()
    display_abilities(player.movement, player.attack, player.search, player.health, player.potion, player.loot)
    screen.blit(player.player_img, (player.x, player.y))
    for enemy in enemies:
        enemy.draw(screen)
    for door in doors:
        door.draw(screen)
    for crate in crates:
        crate.draw(screen)
    for barrel in barrels:
        barrel.draw(screen)
    for table in tables:
        table.draw(screen)
    for chest in chests:
        chest.draw(screen)
    pygame.display.flip()


def reset_player():
    player.health = player.maximum_health
    player.movement = player.maximum_movement
    player.potion = 1


def main_menu():
    at_main_menu = True
    while at_main_menu:
        pygame.mixer.music.load("assets/audio/Atlantis Rage - Jimena Contreras.mp3")
        pygame.mixer.music.play(loops=-1)
        screen.blit(main_bg, (0, 0))
        screen.blit(title_img, (0, 0))
        screen.blit(main_menu_bg, (100, 0))
        screen.blit(select_mission_button, (width / 2 - 122, 400))
        pygame.display.flip()
        while at_main_menu:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    run = False
                    pygame.quit()
                    sys.exit()
                if event.type == pygame.MOUSEBUTTONDOWN:
                    if select_mission_button_rect.collidepoint(event.pos):
                        click_sound.play()
                        at_main_menu = False
                        mission_select_screen()


def mission_select_screen():
    mission_select_screen_view = True
    screen.blit(main_bg, (0, 0))
    screen.blit(title_img, (0, 0))
    screen.blit(main_menu_bg, (100, 0))
    screen.blit(mission_0_button, (width / 2 - 122, 400))
    screen.blit(mission_1_button, (width / 2 - 122, 460))
    screen.blit(mission_2_button, (width / 2 - 122, 520))
    pygame.display.flip()
    while mission_select_screen_view:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
                pygame.quit()
                sys.exit()
            if event.type == pygame.MOUSEBUTTONDOWN:
                if mission_0_button_rect.collidepoint(event.pos):
                    click_sound.play()
                    clear_floor_tiles()
                    return level_0
            if event.type == pygame.MOUSEBUTTONDOWN:
                if mission_1_button_rect.collidepoint(event.pos):
                    click_sound.play()
                    clear_floor_tiles()
                    return level_1
            if event.type == pygame.MOUSEBUTTONDOWN:
                if mission_2_button_rect.collidepoint(event.pos):
                    click_sound.play()
                    clear_floor_tiles()
                    return level_2


while run:
    level_0 = 1
    level_1 = 2
    level_2 = 3

    if main_menu_view:
        main_menu()
    chosen_map = mission_select_screen()
    if chosen_map == 1:
        mission_selected = True
    if chosen_map == 2:
        mission_selected = True
    if chosen_map == 3:
        mission_selected = True

    # Setting default values for new game
    movement_phase = True
    attack_phase = False
    idle_phase = False
    enemy_movement_phase = False
    enemy_attack_phase = False
    enemy_idle_phase = False
    searching = False
    current_phase_img = panel_status_base_img
    enemy_turn = False
    player_turn = True
    doors = []
    room1closed = True
    room2closed = True
    room3closed = True
    room4closed = True
    room5closed = True
    room6closed = True
    room7closed = True
    room8closed = True
    room9closed = True
    room10closed = True
    room11closed = True
    room12closed = True
    room13closed = True
    room14closed = True
    room15closed = True

    if chosen_map == level_0:
        pygame.mixer.music.load("assets/audio/Devil's Organ - Jimena Contreras.mp3")
        game_maps.game_map_0()
        player_pos = [150, 300]
        player = Player(150, 300, 50)
        player.potion -= 1
        enemies = []
        doors = []
        tables = []
        chests = []
        barrels = []
        crates = []

        door1 = Door(100, 400, door_ns)
        doors.append(door1)
        door2 = Door(300, 400, door_ns)
        doors.append(door2)
        door3 = Door(500, 400, door_ns)
        doors.append(door3)
        door4 = Door(700, 400, door_ns)
        doors.append(door4)
        door5 = 0
        door6 = 0
        door7 = 0
        door8 = 0
        door9 = 0
        door10 = 0
        door11 = 0
        door12 = 0
        door13 = 0
        door14 = 0
        door15 = 0
        door16 = 0
        door17 = 0

        dragon_exists = False
        dragon = 'is coming'
        dragon_dead = 0
        start_message = 0
        door_message = 0
        arrow_message = 0
        search_message = 0
        potion_message = 0
        attack_message = 0
        exit_message = 0
        pygame.mixer.music.play(loops=-1)

    if chosen_map == level_1:
        pygame.mixer.music.load("assets/audio/Devil's Organ - Jimena Contreras.mp3")
        game_maps.game_map_1()
        player_pos = [450, 350]
        player = Player(450, 350, 50)
        player.potion -= 1
        player.health -= 2
        enemies = []
        doors = []
        tables = []
        chests = []
        barrels = []
        crates = []
        arrow1 = 0
        arrow2 = 0
        arrow3 = 0
        arrow4 = 0
        arrow5 = 0
        arrow6 = 0
        arrow7 = 0
        arrow8 = 0
        arrow9 = 0

        door1 = Door(500, 50, door_ew)
        doors.append(door1)
        door2 = Door(200, 150, door_ns)
        doors.append(door2)
        door3 = Door(700, 150, door_ns)
        doors.append(door3)
        door4 = Door(400, 200, door_ns)
        doors.append(door4)
        door5 = Door(150, 300, door_ew)
        doors.append(door5)
        door6 = Door(600, 300, door_ew)
        doors.append(door6)
        door7 = Door(800, 300, door_ew)
        doors.append(door7)
        door8 = Door(400, 400, door_ns)
        doors.append(door8)
        door9 = Door(550, 400, door_ns)
        doors.append(door9)
        door10 = Door(150, 450, door_ew)
        doors.append(door10)
        door11 = Door(300, 450, door_ew)
        doors.append(door11)
        door12 = Door(800, 450, door_ew)
        doors.append(door12)
        door13 = Door(550, 550, door_ns)
        doors.append(door13)
        door14 = Door(200, 600, door_ns)
        doors.append(door14)
        door15 = Door(700, 600, door_ns)
        doors.append(door15)
        door16 = Door(450, 700, door_ew)
        doors.append(door16)
        door17 = 0

        dragon_exists = False
        dragon = 'is coming'
        dragon_dead = 0
        start_message = 0
        pygame.mixer.music.play(loops=-1)

    if chosen_map == level_2:
        pygame.mixer.music.load("assets/audio/Devil's Organ - Jimena Contreras.mp3")
        game_maps.game_map_2()
        player_pos = [0, 0]
        player = Player(0, 0, 50)
        enemies = []
        doors = []
        tables = []
        chests = []
        barrels = []
        crates = []

        door1 = Door(150, 50, door_ew)
        doors.append(door1)
        door2 = Door(800, 200, door_ew)
        doors.append(door2)
        door3 = Door(300, 350, door_ew)
        doors.append(door3)
        door5 = Door(200, 450, door_ew)
        doors.append(door5)
        door6 = Door(300, 450, door_ew)
        doors.append(door6)
        door7 = Door(650, 450, door_ew)
        doors.append(door7)
        door8 = Door(800, 450, door_ew)
        doors.append(door8)
        door9 = Door(150, 700, door_ew)
        doors.append(door9)
        door10 = Door(550, 150, door_ns)
        doors.append(door10)
        door11 = Door(250, 250, door_ns)
        doors.append(door11)
        door12 = Door(400, 250, door_ns)
        doors.append(door12)
        door13 = Door(50, 400, door_ns)
        doors.append(door13)
        door14 = Door(400, 550, door_ns)
        doors.append(door14)
        door15 = Door(250, 650, door_ns)
        doors.append(door15)
        door16 = Door(550, 300, door_ns)
        doors.append(door16)
        door17 = Door(700, 300, door_ns)
        doors.append(door17)

        dragon_exists = False
        dragon = 'is coming'
        dragon_dead = 0
        start_message = 0
        pygame.mixer.music.play(loops=-1)

        def level_2_win_condition():
            if dragon not in enemies and player.x == 0 and player.y == 0:
                return 1
            else:
                return 0

    # Main game loop
    while mission_selected:
        if player.health <= 0:
            display_message(died_msg)
            reset_player()
            main_menu()
            mission_selected = False
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
                pygame.quit()
                sys.exit()
            if player_turn:
                # Level 0 (tutorial) logic
                if chosen_map == level_0 and player.x == 150 and player.y == 300 and start_message == 0:
                    start_message += 1
                    display_message(use_arrow_keys_msg)
                if chosen_map == level_0 and player.x == 50 and player.y == 400 and door_message == 0:
                    door_message += 1
                    display_message(doors_msg)
                if chosen_map == level_0 and player.x == 200 and player.y == 400 and arrow_message == 0:
                    arrow_message += 1
                    activate_arrow_trap()
                if chosen_map == level_0 and door2 not in doors and search_message == 0:
                    search_message += 1
                    table1 = Table(400, 250, table_ew, 0)
                    tables.append(table1)
                    barrel1 = Barrel(350, 250, barrel_img, 0)
                    barrels.append(barrel1)
                    display_message(search_msg)
                if chosen_map == level_0 and player.potion == 1 and potion_message == 0:
                    potion_message += 1
                    display_message(click_on_potion_msg)
                if chosen_map == level_0 and door3 not in doors and attack_message == 0:
                    attack_message += 1
                    goblin = Goblin(650, 400)
                    enemies.append(goblin)
                    display_message(attack_msg)
                if chosen_map == level_0 and door4 not in doors and exit_message == 0:
                    exit_message += 1
                    display_message(step_on_stairwell_msg)
                if chosen_map == level_0 and player.x == 850 and player.y == 450:
                    display_message(quest_complete)
                    reset_player()
                    main_menu()
                    enemies = []
                    doors = []
                    tables = []
                    chests = []
                    barrels = []
                    crates = []
                    mission_selected = False
                # level 1 logic
                if chosen_map == level_1 and player.x == 450 and player.y == 350 and start_message == 0:
                    start_message += 1
                    display_message(escape_msg)
                if chosen_map == level_1 and player.x == 0 and player.y == 350:
                    display_message(quest_complete)
                    reset_player()
                    main_menu()
                    enemies = []
                    doors = []
                    tables = []
                    chests = []
                    barrels = []
                    crates = []
                    mission_selected = False
                # level 2 logic
                if chosen_map == level_2 and player.x == 0 and player.y == 0 and start_message == 0:
                    start_message += 1
                    display_message(defeat_the_red_dragon_msg)
                if dragon in enemies:
                    dragon_exists = True
                if dragon_exists:
                    if chosen_map == level_2 and dragon not in enemies and dragon_dead == 0:
                        dragon_dead += 1
                        display_message(red_dragon_defeated_msg)
                    level_2_win_condition()
                    if level_2_win_condition() == 1:
                        display_message(quest_complete)
                        reset_player()
                        main_menu()
                        mission_selected = False
                        enemies = []
                        doors = []
                        tables = []
                        chests = []
                        barrels = []
                        crates = []
                        dragon_dead -= 1
                if event.type == pygame.MOUSEBUTTONDOWN:
                    if move_button_rect.collidepoint(event.pos):
                        movement_phase = True
                        click_sound.play()
                        attack_phase = idle_phase = enemy_movement_phase = enemy_attack_phase = enemy_idle_phase = False
                        current_phase_img = player_movement_phase_img
                        attack_button_placeholder = attack_button_img
                        move_button_placeholder = move_button_pressed_img
                        search_button_placeholder = search_button_img
                    elif attack_button_rect.collidepoint(event.pos):
                        click_sound.play()
                        attack_button_placeholder = attack_button_pressed_img
                        move_button_placeholder = move_button_img
                        search_button_placeholder = search_button_img
                        attack_phase = True
                        movement_phase = idle_phase = enemy_movement_phase = enemy_attack_phase = \
                            enemy_idle_phase = False
                        current_phase_img = player_attack_phase_img
                    elif search_button_rect.collidepoint(event.pos):
                        if player.search > 0:
                            click_sound.play()
                            attack_button_placeholder = attack_button_img
                            move_button_placeholder = move_button_img
                            search_button_placeholder = search_button_pressed_img
                            searching = True
                        pass
                    elif potion_button_rect.collidepoint(event.pos):
                        click_sound.play()
                        if player.potion > 0 or player.health != player.maximum_health:
                            player.health = player.maximum_health
                            player.potion -= 1
                        attack_button_placeholder = attack_button_img
                        move_button_placeholder = move_button_img
                        search_button_placeholder = search_button_img
                        pass
                    elif pass_button_rect.collidepoint(event.pos):
                        click_sound.play()
                        player_turn = False
                        enemy_turn = True
                        enemy_movement_phase = True
                    elif event.type == pygame.MOUSEBUTTONDOWN:
                        for door in doors:
                            if is_click_on_door(event.pos, door):
                                doors.remove(door)

                if movement_phase:
                    if (door8 not in doors or door11 not in doors) and room1closed and chosen_map == level_1:
                        room1closed = False
                        goblin = Goblin(350, 350)
                        enemies.append(goblin)
                        barrel1 = Barrel(250, 350, barrel_img, 0)
                        barrels.append(barrel1)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if (door11 not in doors or door14 not in doors) and room2closed and chosen_map == level_1:
                        room2closed = False
                        crate1 = Crate(350, 650, crate_img, 0)
                        crates.append(crate1)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if chosen_map == level_1 and player.x == 250 and player.y == 500 and arrow1 == 0:
                        arrow1 = 1
                        activate_arrow_trap()
                    if chosen_map == level_1 and player.x == 300 and player.y == 550 and arrow2 == 0:
                        arrow2 = 1
                        activate_arrow_trap()
                    if chosen_map == level_1 and player.x == 350 and player.y == 600 and arrow3 == 0:
                        arrow3 = 1
                        activate_arrow_trap()

                    if (door10 not in doors or door14 not in doors) and room3closed and chosen_map == level_1:
                        room3closed = False
                        barrel2 = Barrel(100, 650, barrel_img, 0)
                        barrels.append(barrel2)
                    if chosen_map == level_1 and player.x == 150 and player.y == 550 and arrow4 == 0:
                        arrow4 = 1
                        activate_arrow_trap()
                    if chosen_map == level_1 and player.x == 100 and player.y == 600 and arrow5 == 0:
                        arrow5 = 1
                        activate_arrow_trap()

                    if (door10 not in doors or door5 not in doors) and room4closed and chosen_map == level_1:
                        room4closed = False
                        goblin = Goblin(150, 350)
                        enemies.append(goblin)
                        table1 = Table(100, 350, table_ns, 0)
                        tables.append(table1)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if (door5 not in doors or door2 not in doors) and room5closed and chosen_map == level_1:
                        room5closed = False
                        goblin = Goblin(100, 150)
                        enemies.append(goblin)
                        goblin = Goblin(150, 100)
                        enemies.append(goblin)
                        chest1 = Chest(100, 100, chest_img_down, 0)
                        chests.append(chest1)
                        for enemy in enemies:
                            enemy.draw(screen)
                    if chosen_map == level_1 and player.x == 450 and player.y == 150 and arrow7 == 0:
                        arrow7 = 1
                        activate_arrow_trap()
                    if chosen_map == level_1 and player.x == 500 and player.y == 150 and arrow8 == 0:
                        arrow8 = 1
                        activate_arrow_trap()
                    if (door2 not in doors or door4 not in doors) and room6closed and chosen_map == level_1:
                        room6closed = False
                        skeleton = Skeleton(350, 150)
                        enemies.append(skeleton)
                        chaos_warrior = ChaosWarrior(300, 100)
                        enemies.append(chaos_warrior)
                        chaos_warrior = ChaosWarrior(300, 200)
                        enemies.append(chaos_warrior)
                        table2 = Table(300, 250, table_ew, 0)
                        tables.append(table2)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if (door4 not in doors or door1 not in doors) and room7closed and chosen_map == level_1:
                        room7closed = False
                        barrel3 = Barrel(500, 250, barrel_img, 0)
                        barrels.append(barrel3)

                    if (door9 not in doors or door6 not in doors) and room8closed and chosen_map == level_1:
                        room8closed = False
                        goblin = Goblin(650, 350)
                        enemies.append(goblin)
                        crate2 = Crate(650, 400, crate_img, 0)
                        crates.append(crate2)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if (door6 not in doors or door3 not in doors) and room9closed and chosen_map == level_1:
                        room9closed = False
                        chest2 = Chest(600, 150, chest_img_right, 0)
                        chests.append(chest2)
                        spawn_value = rd.randint(1, 3)
                        if spawn_value == 1:
                            goblin = Goblin(650, 100)
                            enemies.append(goblin)
                        if spawn_value == 2:
                            skeleton = Skeleton(650, 100)
                            enemies.append(skeleton)
                        if spawn_value == 3:
                            chaos_warrior = ChaosWarrior(650, 100)
                            enemies.append(chaos_warrior)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if (door3 not in doors or door7 not in doors) and room10closed and chosen_map == level_1:
                        room10closed = False
                        table3 = Table(750, 100, table_ew, 0)
                        tables.append(table3)
                        crate3 = Crate(850, 250, crate_img, 0)
                        crates.append(crate3)
                        spawn_value_2 = rd.randint(1, 3)
                        if spawn_value_2 == 1:
                            goblin = Goblin(800, 150)
                            enemies.append(goblin)
                        if spawn_value_2 == 2:
                            skeleton = Skeleton(800, 150)
                            enemies.append(skeleton)
                        if spawn_value_2 == 3:
                            chaos_warrior = ChaosWarrior(800, 150)
                            enemies.append(chaos_warrior)
                        spawn_value_3 = rd.randint(1, 3)
                        if spawn_value_3 == 1:
                            goblin = Goblin(800, 200)
                            enemies.append(goblin)
                        if spawn_value_3 == 2:
                            skeleton = Skeleton(800, 200)
                            enemies.append(skeleton)
                        if spawn_value_3 == 3:
                            chaos_warrior = ChaosWarrior(800, 200)
                            enemies.append(chaos_warrior)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if (door7 not in doors or door12 not in doors) and room11closed and chosen_map == level_1:
                        room11closed = False
                        spawn_value_4 = rd.randint(1, 3)
                        if spawn_value_4 == 1:
                            goblin = Goblin(850, 350)
                            enemies.append(goblin)
                        if spawn_value_4 == 2:
                            skeleton = Skeleton(850, 350)
                            enemies.append(skeleton)
                        if spawn_value_4 == 3:
                            chaos_warrior = ChaosWarrior(800, 400)
                            enemies.append(chaos_warrior)
                            skeleton = Skeleton(850, 400)
                            enemies.append(skeleton)
                            table4 = Table(750, 350, table_ns, 0)
                            tables.append(table4)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if (door12 not in doors or door15 not in doors) and room12closed and chosen_map == level_1:
                        room12closed = False
                        spawn_value_5 = rd.randint(1, 3)
                        if spawn_value_5 <= 2:
                            skeleton = Skeleton(800, 550)
                            enemies.append(skeleton)
                        if spawn_value_5 == 3:
                            chaos_warrior = ChaosWarrior(800, 550)
                            enemies.append(chaos_warrior)
                        spawn_value_6 = rd.randint(1, 3)
                        if spawn_value_6 == 1:
                            goblin = Goblin(750, 600)
                            enemies.append(goblin)
                            goblin = Goblin(800, 600)
                            enemies.append(goblin)
                            goblin = Goblin(850, 600)
                            enemies.append(goblin)
                            goblin = Goblin(750, 650)
                            enemies.append(goblin)
                            goblin = Goblin(800, 650)
                            enemies.append(goblin)
                            goblin = Goblin(850, 650)
                            enemies.append(goblin)
                        if spawn_value_6 == 2:
                            skeleton = Skeleton(750, 600)
                            enemies.append(skeleton)
                            skeleton = Skeleton(800, 600)
                            enemies.append(skeleton)
                            skeleton = Skeleton(850, 600)
                            enemies.append(skeleton)
                        if spawn_value_6 == 3:
                            chaos_warrior = ChaosWarrior(750, 600)
                            enemies.append(chaos_warrior)
                            chaos_warrior = ChaosWarrior(850, 600)
                            enemies.append(chaos_warrior)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if (door15 not in doors or door13 not in doors) and room13closed and chosen_map == level_1:
                        room13closed = False
                        chest3 = Chest(600, 600, chest_img_right, 0)
                        chests.append(chest3)
                        chest4 = Chest(600, 500, chest_img_down, 0)
                        chests.append(chest4)
                        chest5 = Chest(650, 500, chest_img_down, 0)
                        chests.append(chest5)

                    if (door13 not in doors or door16 not in doors) and room14closed and chosen_map == level_1:
                        room14closed = False
                        spawn_value_7 = rd.randint(1, 5)
                        if spawn_value_7 <= 4:
                            skeleton = Skeleton(450, 600)
                            enemies.append(skeleton)
                            skeleton = Skeleton(500, 600)
                            enemies.append(skeleton)
                            skeleton = Skeleton(500, 500)
                            enemies.append(skeleton)
                        if spawn_value_7 == 5:
                            dragon1 = Dragon(450, 600)
                            enemies.append(dragon1)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if ((door1 not in doors or door16 not in doors) and room15closed and player.x == 0 and
                            chosen_map == level_1):
                        room15closed = False
                        spawn_value_3 = rd.randint(1, 3)
                        if spawn_value_3 == 1:
                            goblin = Goblin(0, 300)
                            enemies.append(goblin)
                            goblin = Goblin(0, 400)
                            enemies.append(goblin)
                            goblin = Goblin(0, 700)
                            enemies.append(goblin)
                            goblin = Goblin(0, 50)
                            enemies.append(goblin)
                        if spawn_value_3 == 2:
                            skeleton = Skeleton(0, 300)
                            enemies.append(skeleton)
                            skeleton = Skeleton(0, 400)
                            enemies.append(skeleton)
                            skeleton = Skeleton(0, 200)
                            enemies.append(skeleton)
                        if spawn_value_3 == 3:
                            chaos_warrior = ChaosWarrior(0, 300)
                            enemies.append(chaos_warrior)
                            chaos_warrior = ChaosWarrior(0, 400)
                            enemies.append(chaos_warrior)
                        for enemy in enemies:
                            enemy.draw(screen)
                    if chosen_map == level_1 and player.x == 250 and player.y == 0 and arrow9 == 0:
                        arrow9 = 1
                        activate_arrow_trap()

                    if (door1 not in doors or door11 not in doors) and room1closed and chosen_map == level_2:
                        room1closed = False
                        goblin = Goblin(150, 250)
                        enemies.append(goblin)
                        table1 = Table(100, 300, table_ew, 0)
                        tables.append(table1)
                        for enemy in enemies:
                            enemy.draw(screen)

                    if ((door11 not in doors or door12 not in doors or door3 not in doors) and room2closed and
                            chosen_map == level_2):
                        room2closed = False
                        skeleton = Skeleton(350, 150)
                        enemies.append(skeleton)

                    if (door10 not in doors or door2 not in doors) and room3closed and chosen_map == level_2:
                        room3closed = False
                        goblin = Goblin(650, 150)
                        enemies.append(goblin)
                        goblin = Goblin(750, 100)
                        enemies.append(goblin)
                        barrel1 = Barrel(850, 100, barrel_img, 0)
                        barrels.append(barrel1)

                    if (door16 not in doors or door17 not in doors) and room4closed and chosen_map == level_2:
                        room4closed = False
                        chaos_warrior = ChaosWarrior(600, 250)
                        enemies.append(chaos_warrior)
                        crate1 = Crate(650, 250, crate_img, 0)
                        crates.append(crate1)

                    if ((door2 not in doors or door17 not in doors or door8 not in doors) and room5closed and
                            chosen_map == level_2):
                        room5closed = False
                        skeleton = Skeleton(850, 300)
                        enemies.append(skeleton)
                        goblin = Goblin(750, 350)
                        enemies.append(goblin)
                        table1 = Table(850, 350, table_ns, 0)
                        tables.append(table1)

                    if ((door3 not in doors or door13 not in doors or door5 not in doors or door6 not in doors) and
                            room6closed and chosen_map == level_2):
                        room6closed = False
                        skeleton = Skeleton(250, 400)
                        enemies.append(skeleton)
                        crate2 = Crate(350, 400, crate_img, 0)
                        crates.append(crate2)

                    if (door14 not in doors or door7 not in doors) and room7closed and chosen_map == level_2:
                        room7closed = False
                        goblin = Goblin(450, 500)
                        enemies.append(goblin)
                        goblin = Goblin(500, 600)
                        enemies.append(goblin)
                        barrel2 = Barrel(450, 400, barrel_img, 0)
                        barrels.append(barrel2)

                    if ((door5 not in doors or door9 not in doors or door15 not in doors) and room8closed and
                            chosen_map == level_2):
                        room8closed = False
                        goblin = Goblin(150, 550)
                        enemies.append(goblin)
                        crate3 = Crate(100, 500, crate_img, 0)
                        crates.append(crate3)
                        table2 = Table(100, 550, table_ns, 0)
                        tables.append(table2)

                    if ((door6 not in doors or door14 not in doors or door15 not in doors) and room9closed and
                            chosen_map == level_2):
                        room9closed = False
                        barrel3 = Barrel(350, 650, barrel_img, 0)
                        barrels.append(barrel3)

                    if (door7 not in doors or door8 not in doors) and room10closed and chosen_map == level_2:
                        room10closed = False
                        chaos_warrior = ChaosWarrior(800, 550)
                        enemies.append(chaos_warrior)
                        chaos_warrior = ChaosWarrior(650, 550)
                        enemies.append(chaos_warrior)
                        dragon = Dragon(700, 600)
                        enemies.append(dragon)
                        chest1 = Chest(850, 600, chest_img_left, 0)
                        chests.append(chest1)
                        table3 = Table(600, 550, table_ns, 0)
                        tables.append(table3)

                    if door9 not in doors and room11closed and chosen_map == level_2:
                        room11closed = False
                        barrel4 = Barrel(350, 750, barrel_img, 0)
                        barrels.append(barrel4)

                    if ((door10 not in doors or door12 not in doors or door16 not in doors) and room12closed and
                            chosen_map == level_2):
                        room12closed = False
                        skeleton = Skeleton(500, 0)
                        enemies.append(skeleton)
                        goblin = Goblin(500, 250)
                        enemies.append(goblin)
                        barrel5 = Barrel(650, 0, barrel_img, 0)
                        barrels.append(barrel5)

                    if player.movement == 0:
                        movement_phase = False
                    if event.type == pygame.KEYDOWN and player.movement > 0:
                        dx, dy = 0, 0
                        if event.key == pygame.K_LEFT:
                            dx = -grid_size
                            player.player_img = barbarian_img_left
                        elif event.key == pygame.K_RIGHT:
                            dx = grid_size
                            player.player_img = barbarian_img_right
                        elif event.key == pygame.K_UP:
                            dy = -grid_size
                            player.player_img = barbarian_img_up
                        elif event.key == pygame.K_DOWN:
                            dy = grid_size
                            player.player_img = barbarian_img_down
                        player.move(dx, dy, enemies)

                if attack_phase:
                    if player.attack == 0:
                        attack_phase = False
                    if event.type == pygame.MOUSEBUTTONDOWN:
                        for enemy in enemies:
                            if is_click_on_enemy(event.pos, enemy):
                                combat = True
                                while combat:
                                    attack_rolls = roll_dice(3)
                                    skulls = count_skulls(attack_rolls)
                                    if isinstance(enemy, Goblin):
                                        defense_rolls = roll_dice(1)
                                    elif isinstance(enemy, Skeleton):
                                        defense_rolls = roll_dice(2)
                                    else:
                                        defense_rolls = roll_dice(3)
                                    shields = count_shields(defense_rolls)
                                    display_dice_rolls(attack_rolls, defense_rolls)
                                    pygame.display.flip()
                                    pygame.time.wait(1000)
                                    player.attack -= 1
                                    if skulls > shields:
                                        enemy.health -= 1
                                        if enemy.health == 0:
                                            enemies.remove(enemy)
                                            enemy_death_sound = rd.choice(ENEMY_DEATH_SOUNDS)
                                            pygame.mixer.Sound(enemy_death_sound).play()
                                            pygame.time.wait(200)
                                    combat = False
                if searching:
                    if player.search == 0:
                        searching = False
                    if event.type == pygame.MOUSEBUTTONDOWN:
                        for table in tables:
                            if is_click_on_table(event.pos, table) and table.searched == 0 and player.search >= 1:
                                table.searched += 1
                                search()
                            elif is_click_on_table(event.pos, table) and table.searched >= 1 and player.search >= 1:
                                display_message(nothing_found_msg)
                        for barrel in barrels:
                            if is_click_on_barrel(event.pos, barrel) and barrel.searched == 0 and player.search >= 1:
                                barrel.searched += 1
                                search()
                            elif is_click_on_barrel(event.pos, barrel) and barrel.searched >= 1 and player.search >= 1:
                                display_message(nothing_found_msg)
                        for crate in crates:
                            if is_click_on_crate(event.pos, crate) and crate.searched == 0 and player.search >= 1:
                                crate.searched += 1
                                search()
                            elif is_click_on_crate(event.pos, crate) and crate.searched >= 1 and player.search >= 1:
                                display_message(nothing_found_msg)
                        for chest in chests:
                            if is_click_on_chest(event.pos, chest) and chest.searched == 0 and player.search >= 1:
                                chest.searched += 1
                                search()
                            elif is_click_on_chest(event.pos, chest) and chest.searched >= 1 and player.search >= 1:
                                display_message(nothing_found_msg)

            if enemy_turn and enemy_movement_phase:
                attack_button_placeholder = attack_button_img
                move_button_placeholder = move_button_img
                search_button_placeholder = search_button_img
                current_phase_img = enemy_movement_phase_img
                for enemy in enemies:
                    enemy.move_towards_player(player.x, player.y)
                    enemy.draw(screen)
                    display_everything()
                    pygame.time.wait(200)
                current_phase_img = enemy_attack_phase_img
                enemy_movement_phase = False
                enemy_attack_phase = True
            if enemy_turn and enemy_attack_phase:
                for enemy in enemies:
                    if player.x > 50:
                        enemy.attack_player(player)
                        pygame.display.flip()
                        pygame.time.wait(100)

                enemy_attack_phase = False
                player.movement = 6
                player.attack = 2
                player.search = 1
                player_turn = True
                current_phase_img = player_movement_phase_img

        display_everything()
