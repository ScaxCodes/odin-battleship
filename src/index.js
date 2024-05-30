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
    allShipsSunken: function () {
      const fieldsWithShips = this.grid
        .flat()
        .filter((field) => typeof field === "object");
      for (const fieldWithShip of fieldsWithShips) {
        if (fieldWithShip.length > fieldWithShip.hitsCounter) return false;
      }
      return true;
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
