# Dungeon Quest
Welcome to the repository for Dungeon Quest, a grid-based dungeon crawler game created using Pygame in Python. In this game, you navigate through various levels of a dungeon, fighting off enemies, searching for loot, and trying to complete your quest.

<img src="assets/preview_img.jpg" width="800"><img src="assets/preview.gif" width="800">

## Table of Contents
- [Features](#features)
- [Controls](#controls)
- [How to play](#how-to-play)
- [Enemies](#enemies)
- [Combat](#combat)
- [Customization](#customization)
- [Installation](#installation)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [Author](#author)
- [Huge Thanks](#huge-thanks)
- [License](#license)

## Features
- A title screen with menus.
- Dynamic Gameplay: Move through the dungeon, engage in combat with enemies, and search for treasures.
- 3 Levels: The 3 levels include a brief totorial, a 2nd level where you must choose a path full of random enemies and arrow traps, and a 3rd level where you must hunt down and defeat the red dragon. The game is designed to allow for easy adaptation and expansion. New levels can be added to keep the game exciting.
- Various Characters: Start with a barbarian character, but the game is designed to allow adding new player characters, such as the rogue, with assets already included in the assets folder.
- Interactive UI: Utilize buttons like move, attack, search, and more to interact with the game world.

## Controls
The game is controlled using both the keyboard for movement and mouse clicks for interactions such as attacking, searching, and using items.

## How to Play
Use the arrow keys to move your character around the grid.

- Actions

<img src="assets/images/UI/move_button_img.jpg" width="50">  Move Button: Click to enter the movement phase, then use arrow keys.

<img src="assets/images/UI/attack_button_img.jpg" width="50">  Attack Button: Click to enter the attack phase, then click on an adjacent enemy to attack.

<img src="assets/images/UI/search_button_img.jpg" width="50">  Search Button: Click to search an adjacent crate, table, chest, or barrel. Inside you may find gold, a health potion or nothing.

<img src="assets/images/crate_img.png" width="50">    <img src="assets/images/table_ew.png" width="100">    <img src="assets/images/chest_img_down.png" width="50">    <img src="assets/images/barrel_img.png" width="50">

<img src="assets/images/UI/potion_img.jpg" width="50">  Potion Button: Click to use a potion to replenish your HP to the maximum HP (8).

<img src="assets/images/UI/pass_turn_img.jpg" width="200">  Pass Button: Click to end turn and commence enemy turn.

<img src="assets/images/door_ew.png" width="50">  Door: Click on doors when adjacent to open them, revealing the interior.

- Goal
Follow the level's on-screen instructions to complete the goal of the level.

## Enemies
Encounter various enemies like skeletons, goblins, chaos warriors, arrow traps and even a dragon. Each enemy type has its unique behavior and attack strategy. Beware though, the chaos warrior has 2 HP, and the dragon has 4 HP. Enemies will pursue you 1 tile per enemy movement phase.

<img src="assets/images/skeleton_img_down.png" width="50">    <img src="assets/images/goblin_img_down.png" width="50">    <img src="assets/images/chaos_warrior_down_img.png" width="50">    <img src="assets/images/dragon_down_img.png" width="100">

## Combat
You can attack enemies on adjacent squares by pressing the attack button, then selecting the enemy. Likewise, during the enemy's turn they will move toward you and if adjacent, will attack you. Your character the barbarian has 3 attack dice and 3 defence dice, and can attack twice per turn. Each attack die and defence die have a 50% chance of rolling a skull or shield respectively. The amount of attack and defence dice vary depending on the enemy. If the attacker rolls more skulls than the defender rolls shields, the opponent will take the net skulls as damage, reducing their HP to that amount. The skulls and shields rolled are displayed in the display panel during combat.

eg.

<img src="assets/images/UI/three_skull.jpg" width="100">
<img src="assets/images/UI/two_shield.jpg" width="100">

The attacker rolls 3 skulls, and the defender rolls 2 shields. The defender takes 1 damage.

## Customization
Feel free to adapt the game according to your preferences. You can add more levels and enemies, or introduce new player characters. The game's flexible design encourages creativity and expansion.

## Installation
To run Dungeon Quest, you'll need Python and Pygame installed on your system.

Clone the repository or download the source code.
Ensure you have Python installed. If not, download and install it from python.org.
Install Pygame by running pip install pygame in your terminal or command prompt.
Navigate to the game's directory and run 
```python Dungeon Quest.py```
to start the game.

## File Structure
The Dungeon Quest.py file runs the game. The game_maps.py has the tile map information used by the Dungeon Quest.py file to choose the correct tiles for the level. Please feel free to add more levels in this file. The assets folder contains the images and audio files in seperate folders.

## Contributing
Contributions to Dungeon Quest are welcome! Whether it's adding new features, creating new levels, or improving the code, feel free to fork the repository and submit a pull request.

## Author
Alex McKinley

## Huge Thanks
I must give a huge thanks to the hard workers who made the Hero Quest game and Space Crusade games on Amiga. Playing these games as a child brought me so much joy, fostered my imagination, and still inspire me to this day.

## License
Dungeon Quest is open-source and is available under the MIT License. Feel free to use, modify, and distribute the game as you see fit.

Enjoy exploring the dungeons and embarking on quests in Dungeon Quest!
