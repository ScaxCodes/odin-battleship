import "./normalize.css";
import "./styles.css";

import { createPlayer } from "./factories.js";
import {
  renderBoards,
  removeBoards,
  clearPlayerBoard,
  renderShipFields,
  setTextInfoBox,
  displayWinner,
} from "./render.js";
import {
  loadShuffleButtonEventListener,
  loadStartGameEventListener,
  loadBoardEventListeners,
} from "./eventlisteners.js";

// TODO: simple responsive design

let player;
let enemy;

const shuffleButton = document.querySelector(".btn-randomize");
const startGameButton = document.querySelector(".btn-start");

prepareGame();

renderBoards();
renderShipFields(player);
setTextInfoBox("Please shuffle ship positions or start the game");

loadShuffleButtonEventListener();
loadStartGameEventListener();

function prepareGame() {
  player = createPlayer();
  enemy = createPlayer("computer");

  placeShipRandomPosition(player, 2);
  placeShipRandomPosition(player, 3);
  placeShipRandomPosition(player, 4);
  placeShipRandomPosition(player, 5);

  placeShipRandomPosition(enemy, 2);
  placeShipRandomPosition(enemy, 3);
  placeShipRandomPosition(enemy, 4);
  placeShipRandomPosition(enemy, 5);
}

function placeShipRandomPosition(player, shipLength) {
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

function prepareForGameReset() {
  startGameButton.classList.remove("disabled");
  startGameButton.textContent = "Restart Game!";
  startGameButton.addEventListener("click", resetGame);
}

function resetGame() {
  prepareGame();
  removeBoards();
  renderBoards();
  renderShipFields(player);
  setTextInfoBox("Please shuffle ship positions or start the game");
  startGameButton.textContent = "Start Game!";
  loadStartGameEventListener();
  shuffleButton.classList.remove("disabled");
  loadShuffleButtonEventListener();
  startGameButton.removeEventListener("click", resetGame);
}

export function resetPlayerBoard() {
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
  placeShipRandomPosition(player, 2);
  placeShipRandomPosition(player, 3);
  placeShipRandomPosition(player, 4);
  placeShipRandomPosition(player, 5);

  clearPlayerBoard();
  renderShipFields(player);
}

export function startGame() {
  loadBoardEventListeners(enemy, player);
  shuffleButton.classList.add("disabled");
  startGameButton.classList.add("disabled");
  shuffleButton.removeEventListener("click", resetPlayerBoard);
  startGameButton.removeEventListener("click", startGame);
  setTextInfoBox("Click on computers board to perform an attack");
}

export function isGameOver() {
  if (enemy.ownBoard.allShipsSunken()) {
    displayWinner("Player");
    prepareForGameReset();
    return true;
  } else if (player.ownBoard.allShipsSunken()) {
    displayWinner("Computer");
    prepareForGameReset();
    return true;
  } else return false;
}
