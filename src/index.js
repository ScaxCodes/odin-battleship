import "./normalize.css";
import "./styles.css";

function createShip(size) {
  return {
    length: size,
    hitsCounter: 0,
    sunken: false,
    hit: function () {
      this.hitsCounter++;
      console.log("Hit added to ship...");
    },
    isSunk: function () {
      return this.length <= this.hitsCounter;
    },
  };
}
/*
Gameboards should have a receiveAttack function that takes a pair of coordinates,
determines whether or not the attack hit a ship and then sends the ‘hit’ function
to the correct ship, or records the coordinates of the missed shot.
*/
function createBoard() {
  return {
    grid: [
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
    ],
    placeShip: function (coordsArray) {
      const ship = createShip(coordsArray.length);
      coordsArray.forEach((coord) => {
        this.grid[coord.x][coord.y] = ship;
      });
      console.log("Ship placed...");
    },
    receiveAttack: function ({ x, y }) {
      const selectedField = this.grid[x][y];
      if (typeof selectedField === "object") {
        selectedField.hit();
        console.log("Hit!");
      } else {
        this.grid[x][y] = "X";
        console.log("Miss!");
      }
    },
  };
}

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

testReceiveAttack();
