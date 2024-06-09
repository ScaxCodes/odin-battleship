import "./normalize.css";
import "./styles.css";

import { createShip, createBoard, createPlayer } from "./factories.js";
import { renderBoards, renderShips } from "./render.js";
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

loadEventListeners(enemy, player);

// TODO
// Place ships of enemy into random positions
// Let player choose positions for their ships (shuffle random positions)

export function isGameOver() {
  if (enemy.ownBoard.allShipsSunken()) {
    displayWinner("Player");
    return true;
  } else if (player.ownBoard.allShipsSunken()) {
    displayWinner("Computer");
    return true;
  } else return false;
}

export function displayWinner(str) {
  const infoBox = document.querySelector(".infobox");
  infoBox.textContent = `${str} has won the game!`;
}

// Testing
function testShipCreation() {
  const ship = createShip(3);
  ship.hit();
  console.log(ship);
  ship.hit();
  console.log(ship.isSunk());
  ship.hit();
  console.log(ship);
  console.log(ship.isSunk());
}

function testBoardCreation() {
  const board = createBoard();
  console.log(board.grid);

  const board2 = createBoard();
  board2.placeShip([
    { x: 3, y: 5 },
    { x: 3, y: 6 },
    { x: 3, y: 7 },
  ]);
  console.log(board2.grid);
}

function testReceiveAttack() {
  const board = createBoard();
  board.placeShip([
    { x: 5, y: 6 },
    { x: 5, y: 7 },
  ]);
  console.log(board.grid[5][6]);
  board.receiveAttack({ x: 5, y: 6 });
  board.receiveAttack({ x: 5, y: 2 });
  console.log(board.grid);
}

function testAllShipsSunken() {
  const board = createBoard();
  board.placeShip([
    { x: 5, y: 6 },
    { x: 5, y: 7 },
  ]);
  board.receiveAttack({ x: 5, y: 6 });
  // board.receiveAttack({ x: 5, y: 7 });
  console.log(board.allShipsSunken());
}

function testEnemyCreation() {
  const axel = createPlayer();
  console.log(axel);
  const npc = createPlayer("computer");
  console.log(npc);
}
