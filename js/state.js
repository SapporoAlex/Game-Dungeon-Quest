// Small shared mutable flags that several modules need to read without
// creating circular imports (mirrors the module-level globals the original
// Python script relied on, e.g. `level_3`).
export const gameState = {
  // True only while the 4th quest ("the Rampage") is active - it uses a
  // different tile palette/passability rule than quests 0-2.
  isRampageLevel: false,
};

export const LEVEL = {
  TUTORIAL: "level_0",
  QUEST_1: "level_1",
  QUEST_2: "level_2",
  RAMPAGE: "level_3",
  QUEST_4: "level_4",
};
