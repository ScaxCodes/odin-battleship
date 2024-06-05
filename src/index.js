import "./normalize.css";
import "./styles.css";

import { createShip, createBoard, createPlayer } from "./factories.js";
import { renderBoards, renderShips } from "./render.js";

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
// renderShips(enemy);

// Eins nach dem anderen, kleine Schrite, erstmal alles klickbar lassen
// Step by step concept was hier passieren soll...
// Filter alle raus, die nicht klickbar sein sollen
// 1. feuer, X, missed shots
// Event: Wenn Treffer; 1. Feuer adden, 2. Hitfunktion, 3. Rendern
// eigene func dafür schreiben und als clalback dem eventlistener passen, sieht schlanker aus
// wo lasse ich die eventlisteners laden? immer wieder beim rendern macht keinen sinn? einmal bei start langt?

function AddClickListenersToEnemyFields() {
  const fields = Array.from(document.querySelectorAll(".enemy .single-field"));
  fields.forEach((field, i) => {
    field.addEventListener(
      "click",
      () => {
        const { x, y } = field.dataset;
        const result = enemy.ownBoard.receiveAttack({ x, y });
        result === "hit"
          ? (field.textContent = "🔥")
          : (field.textContent = "🌊");
        renderShips(enemy);
      },
      { once: true }
    );
  });
}

AddClickListenersToEnemyFields();

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
