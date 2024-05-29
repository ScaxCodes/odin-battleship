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

const ship = createShip(3);
ship.hit();
console.log(ship);
ship.hit();
console.log(ship.isSunk());
ship.hit();
console.log(ship);
console.log(ship.isSunk());
