import { preloadAll } from "./assets.js";
import { startGame } from "./game.js";

const overlay = document.getElementById("loading-overlay");
const barFill = document.getElementById("loading-bar-fill");
const label = document.getElementById("loading-label");
const startBtn = document.getElementById("sound-unlock-btn");

async function boot() {
  await preloadAll((fraction) => {
    barFill.style.width = `${Math.round(fraction * 100)}%`;
  });

  label.textContent = "Ready!";
  startBtn.hidden = false;
  startBtn.addEventListener(
    "click",
    () => {
      overlay.classList.add("hidden");
      startGame();
    },
    { once: true }
  );
}

boot();
