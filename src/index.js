import "./normalize.css";
import "./styles.css";

import { createShip, createBoard, createPlayer } from "./factories.js";
import { renderBoards, renderShips } from "./render.js";
import { loadEventListeners } from "./eventlisteners.js";

const player = createPlayer();
const enemy = createPlayer("computer");

// Populate each board with ships, adding custom positioning later
function populateBoardsWithShips() {
  player.ownBoard.placeShip([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
  ]);
  player.ownBoard.placeShip([
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ]);
  player.ownBoard.placeShip([
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2, y: 3 },
  ]);
  player.ownBoard.placeShip([
    { x: 3, y: 0 },
    { x: 3, y: 1 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
    { x: 3, y: 4 },
  ]);
  enemy.ownBoard.placeShip([
    { x: 6, y: 0 },
    { x: 6, y: 1 },
  ]);
  enemy.ownBoard.placeShip([
    { x: 7, y: 0 },
    { x: 7, y: 1 },
    { x: 7, y: 2 },
  ]);
  enemy.ownBoard.placeShip([
    { x: 8, y: 0 },
    { x: 8, y: 1 },
    { x: 8, y: 2 },
    { x: 8, y: 3 },
  ]);
  enemy.ownBoard.placeShip([
    { x: 9, y: 0 },
    { x: 9, y: 1 },
    { x: 9, y: 2 },
    { x: 9, y: 3 },
    { x: 9, y: 4 },
  ]);
}

populateBoardsWithShips();
renderBoards();

renderShips(player);

loadEventListeners(enemy, player);

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
