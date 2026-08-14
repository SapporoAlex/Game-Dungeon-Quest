// Central asset manifest + preloader. Mirrors the pygame.image.load / Sound calls
// from the original Dungeon Quest.py so every sprite keeps the same name.

export const IMAGE_MANIFEST = {
  // Main menu
  main_bg: "assets/images/Main_bg.jpg",
  store_1_bg: "assets/images/store_bg_1.jpg",
  store_2_bg: "assets/images/store_bg_2.jpg",
  store_3_bg: "assets/images/store_bg_3.jpg",
  store_4_bg: "assets/images/store_bg_4.jpg",
  title_img: "assets/images/title_img.png",
  main_menu_bg: "assets/images/Title_meny_box_bg.png",
  select_mission_button: "assets/images/select_quest_button.png",
  store_button: "assets/images/store_button.png",
  exit_game_button: "assets/images/exit_game_button.png",
  icon: "assets/images/icon.jpg",

  // In-game UI
  panel_img: "assets/images/UI/panel.jpg",
  move_button_img: "assets/images/UI/move_button_img.jpg",
  move_button_pressed_img: "assets/images/UI/move_button_pressed_img.jpg",
  attack_button_img: "assets/images/UI/attack_button_img.jpg",
  attack_button_pressed_img: "assets/images/UI/attack_button_pressed_img.jpg",
  search_button_img: "assets/images/UI/search_button_img.jpg",
  search_button_pressed_img: "assets/images/UI/search_button_pressed_img.jpg",
  pass_button_img: "assets/images/UI/pass_turn_img.jpg",
  life_img: "assets/images/UI/life_img.jpg",
  potion_img: "assets/images/UI/potion_img.jpg",
  loot_img: "assets/images/UI/loot_img.jpg",
  minus_one_img: "assets/images/UI/minus_1.png",
  minus_two_img: "assets/images/UI/minus_2.png",
  minus_three_img: "assets/images/UI/minus_3.png",
  minus_four_img: "assets/images/UI/minus_4.png",
  minus_five_img: "assets/images/UI/minus_5.png",
  zero_img: "assets/images/UI/0.png",
  one_img: "assets/images/UI/1.png",
  two_img: "assets/images/UI/2.png",
  three_img: "assets/images/UI/3.png",
  four_img: "assets/images/UI/4.png",
  five_img: "assets/images/UI/5.png",
  six_img: "assets/images/UI/6.png",
  seven_img: "assets/images/UI/7.png",
  eight_img: "assets/images/UI/8.png",
  nine_img: "assets/images/UI/9.png",
  ten_img: "assets/images/UI/10.png",
  eleven_img: "assets/images/UI/11.png",
  twelve_img: "assets/images/UI/12.png",
  thirteen_img: "assets/images/UI/13.png",
  fourteen_img: "assets/images/UI/14.png",
  fifteen_img: "assets/images/UI/15.png",
  sixteen_img: "assets/images/UI/16.png",
  seventeen_img: "assets/images/UI/17.png",
  eighteen_img: "assets/images/UI/18.png",
  nineteen_img: "assets/images/UI/19.png",
  twenty_img: "assets/images/UI/20.png",
  panel_status_base_img: "assets/images/UI/panel_base.png",
  player_movement_phase_img: "assets/images/UI/panel_base_movement_phase.png",
  player_attack_phase_img: "assets/images/UI/panel_base_attack_phase.png",
  player_idle_phase_img: "assets/images/UI/panel_base_idle_phase.png",
  enemy_movement_phase_img: "assets/images/UI/panel_base_e_movement_phase.png",
  enemy_attack_phase_img: "assets/images/UI/panel_base_e_attack_phase.png",
  enemy_idle_phase_img: "assets/images/UI/panel_base_e_idle_phase.png",
  one_skull_img: "assets/images/UI/one_skull.jpg",
  two_skull_img: "assets/images/UI/two_skull.jpg",
  three_skull_img: "assets/images/UI/three_skull.jpg",
  four_skull_img: "assets/images/UI/four_skull.jpg",
  five_skull_img: "assets/images/UI/five_skull.jpg",
  six_skull_img: "assets/images/UI/six_skull.jpg",
  one_shield_img: "assets/images/UI/one_shield.jpg",
  two_shield_img: "assets/images/UI/two_shield.jpg",
  three_shield_img: "assets/images/UI/three_shield.jpg",
  fire_img: "assets/images/fire.png",

  // Shop
  buy_potion_img: "assets/images/UI/buy_potion_img.jpg",
  buy_speed_potion_img: "assets/images/UI/buy_speed_potion_img.jpg",
  buy_search_potion_img: "assets/images/UI/buy_search_potion_img.jpg",
  buy_maxhealth_potion_img: "assets/images/UI/buy_maxhealth_potion_img.jpg",
  buy_attack_potion_img: "assets/images/UI/buy_attack_potion_img.jpg",
  exit_store_img: "assets/images/UI/exit_store_img.jpg",

  // Messages
  defeat_the_red_dragon_msg: "assets/images/msgs/defeat_the_red_dragon_msg.png",
  died_msg: "assets/images/msgs/died_msg.png",
  quest_complete: "assets/images/msgs/quest_complete_msg.png",
  red_dragon_defeated_msg: "assets/images/msgs/red_dragon_defeated_msg.png",
  nothing_found_msg: "assets/images/msgs/nothing_found_msg.png",
  gold_found_msg: "assets/images/msgs/find gold.png",
  potion_found_msg: "assets/images/msgs/find health potion.png",
  use_arrow_keys_msg: "assets/images/msgs/usethearrowkeysmsg.png",
  arrow_trap_msg: "assets/images/msgs/youactivateanarrowtrapmsg.png",
  doors_msg: "assets/images/msgs/clickondoorstoopenmsg.png",
  click_on_potion_msg: "assets/images/msgs/clickonpotionmsg.png",
  attack_msg: "assets/images/msgs/clickonattackphasemsg.png",
  search_msg: "assets/images/msgs/clickonsearchmsg.png",
  step_on_stairwell_msg: "assets/images/msgs/stepontothestairwellmsg.png",
  escape_msg: "assets/images/msgs/escape_msg.png",

  // Furniture
  barrel_img: "assets/images/barrel_img.png",
  crate_img: "assets/images/crate_img.png",
  chest_img_down: "assets/images/chest_img_down.png",
  chest_img_left: "assets/images/chest_img_left.png",
  chest_img_right: "assets/images/chest_img_right.png",
  chest_img_up: "assets/images/chest_img_up.png",
  door_ns: "assets/images/door_ns.png",
  door_ew: "assets/images/door_ew.png",
  table_ns: "assets/images/table_ns.png",
  table_ew: "assets/images/table_ew.png",

  // Characters
  barbarian_img_down: "assets/images/barbarian_down_img.png",
  barbarian_img_up: "assets/images/barbarian_up_img.png",
  barbarian_img_left: "assets/images/barbarian_left_img.png",
  barbarian_img_right: "assets/images/barbarian_right_img.png",
  elf_img_down: "assets/images/elf_down_img.png",
  elf_img_up: "assets/images/elf_up_img.png",
  elf_img_left: "assets/images/elf_left_img.png",
  elf_img_right: "assets/images/elf_right_img.png",
  skeleton_down_img: "assets/images/skeleton_img_down.png",
  skeleton_left_img: "assets/images/skeleton_img_left.png",
  skeleton_right_img: "assets/images/skeleton_img_right.png",
  skeleton_up_img: "assets/images/skeleton_img_up.png",
  goblin_down_img: "assets/images/goblin_img_down.png",
  goblin_left_img: "assets/images/goblin_img_left.png",
  goblin_right_img: "assets/images/goblin_img_right.png",
  goblin_up_img: "assets/images/goblin_img_up.png",
  chaos_warrior_down_img: "assets/images/chaos_warrior_down_img.png",
  chaos_warrior_left_img: "assets/images/chaos_warrior_left_img.png",
  chaos_warrior_right_img: "assets/images/chaos_warrior_right_img.png",
  chaos_warrior_up_img: "assets/images/chaos_warrior_up_img.png",
  dragon_down_img: "assets/images/dragon_down_img.png",
  dragon_left_img: "assets/images/dragon_left_img.png",
  dragon_right_img: "assets/images/dragon_right_img.png",
  dragon_up_img: "assets/images/dragon_up_img.png",

  // Tiles
  floor_tile_img_1: "assets/images/floor_tile_img_1.png",
  floor_tile_img_2: "assets/images/floor_tile_img_2.png",
  floor_tile_img_3: "assets/images/floor_tile_img_3.png",
  floor_tile_img_4: "assets/images/floor_tile_img_4.png",
  floor_tile_img_5: "assets/images/floor_tile_img_5.png",
  floor_tile_img_6: "assets/images/floor_tile_img_6.png",
  floor_tile_img_7: "assets/images/floor_tile_img_7.png",
  floor_tile_img_8: "assets/images/floor_tile_img_8.png",
  floor_tile_img_9: "assets/images/floor_tile_img_9.png",
  floor_tile_img_10: "assets/images/floor_tile_img_10.png",
  floor_tile_g_img_1: "assets/images/floor_tile_g_img_1.png",
  floor_tile_g_img_2: "assets/images/floor_tile_g_img_2.png",
  floor_tile_g_img_3: "assets/images/floor_tile_g_img_3.png",
  floor_tile_g_img_4: "assets/images/floor_tile_g_img_4.png",
  floor_tile_g_img_5: "assets/images/floor_tile_g_img_5.png",
  floor_tile_b_img_1: "assets/images/floor_tile_b_img_1.png",
  floor_tile_b_img_2: "assets/images/floor_tile_b_img_2.png",
  floor_tile_b_img_3: "assets/images/floor_tile_b_img_3.png",
  floor_tile_b_img_4: "assets/images/floor_tile_b_img_4.png",
  floor_tile_b_img_5: "assets/images/floor_tile_b_img_5.png",
  wall_img_1: "assets/images/wall_img_1.png",
  wall_img_2: "assets/images/wall_img_2.png",
  wall_img_3: "assets/images/wall_img_3.png",
  wall_img_4: "assets/images/wall_img_4.png",
  stairs_img: "assets/images/stairs_img.png",
  chain_img: "assets/images/chain_tile_img.png",
};

export const ATTACK_SOUND_KEYS = ["attack", "attack2", "attack3", "attack4", "attack5"];
export const DEATH_SOUND_KEYS = ["death", "death2"];
export const ENEMY_DEATH_SOUND_KEYS = ["enemy_death2", "enemy_death"];
export const MUSIC_KEYS = [
  "Frightmare - Jimena Contreras",
  "Atlantis Rage - Jimena Contreras",
  "Cinematic Symphony of Steel - Jimena Contreras",
  "Apocalyptic Echoes - Jimena Contreras",
  "Cosmic Nightmares - Jimena Contreras",
];

export const AUDIO_MANIFEST = {
  shield: "assets/audio/shield.mp3",
  chest: "assets/audio/chest.mp3",
  click: "assets/audio/click.mp3",
  attack: "assets/audio/attack.mp3",
  attack2: "assets/audio/attack2.mp3",
  attack3: "assets/audio/attack3.mp3",
  attack4: "assets/audio/attack4.mp3",
  attack5: "assets/audio/attack5.mp3",
  death: "assets/audio/death.mp3",
  death2: "assets/audio/death2.mp3",
  enemy_death: "assets/audio/enemy death.mp3",
  enemy_death2: "assets/audio/enemy_death2.mp3",
  menu_theme: "assets/audio/Devil's Organ - Jimena Contreras.mp3",
  "Frightmare - Jimena Contreras": "assets/audio/music/Frightmare - Jimena Contreras.mp3",
  "Atlantis Rage - Jimena Contreras": "assets/audio/music/Atlantis Rage - Jimena Contreras.mp3",
  "Cinematic Symphony of Steel - Jimena Contreras": "assets/audio/music/Cinematic Symphony of Steel - Jimena Contreras.mp3",
  "Apocalyptic Echoes - Jimena Contreras": "assets/audio/music/Apocalyptic Echoes - Jimena Contreras.mp3",
  "Cosmic Nightmares - Jimena Contreras": "assets/audio/music/Cosmic Nightmares - Jimena Contreras.mp3",
};

export const images = {};
export const audioBuffers = {};

function loadImage(key, src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      images[key] = img;
      resolve();
    };
    img.onerror = () => {
      console.warn("Failed to load image", src);
      images[key] = img;
      resolve();
    };
    img.src = src;
  });
}

function loadAudio(key, src) {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.oncanplaythrough = () => {
      audioBuffers[key] = audio;
      resolve();
    };
    audio.onerror = () => {
      console.warn("Failed to load audio", src);
      audioBuffers[key] = audio;
      resolve();
    };
    audio.src = src;
    // Some browsers never fire canplaythrough for background-loaded audio; give it a nudge.
    audio.load();
  });
}

export async function preloadAll(onProgress) {
  const imageEntries = Object.entries(IMAGE_MANIFEST);
  const audioEntries = Object.entries(AUDIO_MANIFEST);
  const total = imageEntries.length + audioEntries.length;
  let done = 0;

  const bump = () => {
    done += 1;
    if (onProgress) onProgress(done / total);
  };

  const tasks = [];
  for (const [key, src] of imageEntries) {
    tasks.push(loadImage(key, src).then(bump));
  }
  for (const [key, src] of audioEntries) {
    tasks.push(loadAudio(key, src).then(bump));
  }
  await Promise.all(tasks);
}

// Plays a fresh clone of a sound effect so overlapping calls don't cut each other off.
export function playSfx(key, volume = 1) {
  const base = audioBuffers[key];
  if (!base) return;
  const node = base.cloneNode();
  node.volume = volume;
  node.play().catch(() => {});
}

export function playRandomSfx(keys, volume = 1) {
  const key = keys[Math.floor(Math.random() * keys.length)];
  playSfx(key, volume);
}

let currentMusic = null;

export function playRandomMusic() {
  const key = MUSIC_KEYS[Math.floor(Math.random() * MUSIC_KEYS.length)];
  playMusic(key);
}

export function playMusic(key, loop = false) {
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }
  const base = audioBuffers[key];
  if (!base) return null;
  currentMusic = base.cloneNode();
  currentMusic.loop = loop;
  currentMusic.volume = 0.55;
  currentMusic.play().catch(() => {});
  return currentMusic;
}

export function isMusicPlaying() {
  return !!currentMusic && !currentMusic.paused && !currentMusic.ended;
}

export function stopMusic() {
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }
}
