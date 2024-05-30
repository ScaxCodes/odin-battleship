import "./normalize.css";
import "./styles.css";

import { createShip, createBoard, createPlayer } from "./factories.js";

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

function testPlayerCreation() {
  const axel = createPlayer();
  console.log(axel);
  const npc = createPlayer("computer");
  console.log(npc);
}
