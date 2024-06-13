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
        this.grid[coord.y][coord.x] = ship;
      });
      console.log("Ship placed...");
    },
    receiveAttack: function ({ x, y }) {
      const selectedField = this.grid[y][x];
      if (typeof selectedField === "object") {
        if (selectedField.sunken) return;
        selectedField.hit();
        console.log("Hit!");
        checkForSinking(selectedField);
        return "hit";
      } else if (selectedField !== "X") {
        this.grid[y][x] = "X";
        console.log("Miss!");
        return "miss";
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
  };
}

function checkForSinking(ship) {
  if (ship.isSunk()) {
    console.log("Ship was sunk...");
    ship.sunken = true;
  }
}
