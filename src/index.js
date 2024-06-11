import "./normalize.css";
import "./styles.css";

import { createShip, createBoard, createPlayer } from "./factories.js";
import { renderBoards, clearPlayerBoard, renderShips } from "./render.js";
import { loadEventListeners } from "./eventlisteners.js";

const player = createPlayer();
const enemy = createPlayer("computer");

function placeRandomShip(player, shipLength) {
  const isHorizontal = Math.random() >= 0.5;
  const boardSize = player.ownBoard.grid.length;
  const maxPosition = boardSize - shipLength;
  let coordsArray = [];

  while (true) {
    coordsArray = [];

    if (isHorizontal) {
      const x = Math.floor(Math.random() * (maxPosition + 1));
      const y = Math.floor(Math.random() * boardSize);

      for (let offset = 0; offset < shipLength; offset++) {
        coordsArray.push({ x: x + offset, y });
      }
    } else {
      const y = Math.floor(Math.random() * (maxPosition + 1));
      const x = Math.floor(Math.random() * boardSize);

      for (let offset = 0; offset < shipLength; offset++) {
        coordsArray.push({ x, y: y + offset });
      }
    }

    const hasOverlap = coordsArray.some(
      (coord) => typeof player.ownBoard.grid[coord.y][coord.x] === "object"
    );

    if (!hasOverlap) {
      break;
    }
  }
  player.ownBoard.placeShip(coordsArray);
}

placeRandomShip(player, 2);
placeRandomShip(player, 3);
placeRandomShip(player, 4);
placeRandomShip(player, 5);

placeRandomShip(enemy, 2);
placeRandomShip(enemy, 3);
placeRandomShip(enemy, 4);
placeRandomShip(enemy, 5);

renderBoards();

renderShips(player);

setTextInfoBox("Please shuffle ship positions or start the game");

function resetPlayerBoard() {
  player.ownBoard.grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  placeRandomShip(player, 2);
  placeRandomShip(player, 3);
  placeRandomShip(player, 4);
  placeRandomShip(player, 5);

  clearPlayerBoard();
  renderShips(player);
}

const shuffleButton = document.querySelector(".btn-randomize");
shuffleButton.addEventListener("click", resetPlayerBoard);

function startGame() {
  loadEventListeners(enemy, player);
  shuffleButton.classList.add("disabled");
  startGameButton.classList.add("disabled");
  shuffleButton.removeEventListener("click", resetPlayerBoard);
  startGameButton.removeEventListener("click", startGame);
  setTextInfoBox("Click on the fields of the right board to perform an attack");
}

const startGameButton = document.querySelector(".btn-start");
startGameButton.addEventListener("click", startGame);

export function isGameOver() {
  if (enemy.ownBoard.allShipsSunken()) {
    displayWinner("Player");
    return true;
  } else if (player.ownBoard.allShipsSunken()) {
    displayWinner("Computer");
    return true;
  } else return false;
}

function displayWinner(str) {
  const infoBox = document.querySelector(".infobox");
  infoBox.textContent = `${str} has won the game!`;
}

function setTextInfoBox(str) {
  const infoBox = document.querySelector(".infobox");
  infoBox.textContent = str;
}
