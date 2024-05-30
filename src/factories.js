export function createShip(size) {
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

export function createBoard() {
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

export function createPlayer(type = "real") {
  return {
    type: type,
    ownBoard: createBoard(),
    enemyBoard: createBoard(),
  };
}
