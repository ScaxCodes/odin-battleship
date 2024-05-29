import "./normalize.css";
import "./styles.css";

function createShip(size) {
  return {
    length: size,
    hitsCounter: 0,
    sunken: false,
    hit: function () {
      this.hitsCounter++;
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
