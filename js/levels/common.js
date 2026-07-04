// Shared helpers for the per-level scripted-event modules.

// True once ANY of the named doors has been opened (removed from level.doors).
export function anyOpen(level, keys) {
  return keys.some((key) => !level.doors.includes(level.doorRefs[key]));
}

// True once ALL of the named doors have been opened.
export function allOpen(level, keys) {
  return keys.every((key) => !level.doors.includes(level.doorRefs[key]));
}

export function makeRoomFlags(count = 15) {
  const rooms = {};
  for (let i = 1; i <= count; i++) rooms[`room${i}closed`] = true;
  return rooms;
}

export function addDoor(level, key, door) {
  level.doorRefs[key] = door;
  level.doors.push(door);
}
