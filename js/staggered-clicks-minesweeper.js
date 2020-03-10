// Small experiment I ran on a Minesweeper game
// https://ofcode.com.br/projects/minesweeper/

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function revealGame(cells) {
  for (const button of cells) {
    if (button.dataset.cell !== "M" && !button.classList.contains("opened")) {
      await timeout(50);
      button.click();
    }
  }
}

revealGame(document.querySelectorAll("button.cell:not(.board__new-game-button)"));
