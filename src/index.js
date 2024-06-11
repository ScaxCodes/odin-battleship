import "./normalize.css";
import "./styles.css";

import { createShip, createBoard, createPlayer } from "./factories.js";
import {
  renderBoards,
  clearPlayerBoard,
  clearEnemyBoard,
  renderShips,
} from "./render.js";
import { loadEventListeners } from "./eventlisteners.js";

let player;
let enemy;
const shuffleButton = document.querySelector(".btn-randomize");
const startGameButton = document.querySelector(".btn-start");

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

function prepareGame() {
  player = createPlayer();
  enemy = createPlayer("computer");

  placeRandomShip(player, 2);
  placeRandomShip(player, 3);
  placeRandomShip(player, 4);
  placeRandomShip(player, 5);

  placeRandomShip(enemy, 2);
  placeRandomShip(enemy, 3);
  placeRandomShip(enemy, 4);
  placeRandomShip(enemy, 5);
}

prepareGame();

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

function loadShuffleButtonEventListener() {
  const shuffleButton = document.querySelector(".btn-randomize");
  shuffleButton.addEventListener("click", resetPlayerBoard);
}

loadShuffleButtonEventListener();
loadStartGameEventListener();

function startGame() {
  loadEventListeners(enemy, player);
  shuffleButton.classList.add("disabled");
  startGameButton.classList.add("disabled");
  shuffleButton.removeEventListener("click", resetPlayerBoard);
  startGameButton.removeEventListener("click", startGame);
  startGameButton.removeEventListener("click", resetGame);
  setTextInfoBox("Click on the fields of the right board to perform an attack");
}

function loadStartGameEventListener() {
  const startGameButton = document.querySelector(".btn-start");
  startGameButton.addEventListener("click", startGame);
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

function displayWinner(str) {
  const infoBox = document.querySelector(".infobox");
  infoBox.textContent = `${str} has won the game!`;
}

function prepareForGameReset() {
  startGameButton.classList.remove("disabled");
  startGameButton.textContent = "Restart Game!";
  startGameButton.addEventListener("click", resetGame);
}

function resetGame() {
  prepareGame();
  clearPlayerBoard();
  clearEnemyBoard();
  renderShips(player);
  setTextInfoBox("Please shuffle ship positions or start the game");
  startGameButton.textContent = "Start Game!";
  loadStartGameEventListener();
  shuffleButton.classList.remove("disabled");
  loadShuffleButtonEventListener();
}

function setTextInfoBox(str) {
  const infoBox = document.querySelector(".infobox");
  infoBox.textContent = str;
}
