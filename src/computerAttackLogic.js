export function randomShotAI(player) {
  const playerFields = Array.from(
    document.querySelectorAll(".player .single-field")
  );
  const availableFields = playerFields.filter(
    (field) => field.textContent === "" || field.textContent === "⛴️"
  );

  const randomArrayIndex = Math.floor(Math.random() * availableFields.length);
  const field = availableFields[randomArrayIndex];
  const { x, y } = field.dataset;

  return [player.ownBoard.receiveAttack({ x, y }), field];
}

export function targetShotAI(player) {
  const playerFields = Array.from(
    document.querySelectorAll(".player .single-field")
  );
  const attackedShipFields = playerFields.filter(
    (field) => field.textContent === "🔥"
  );
  const smartAttackCoords = [];
  for (const field of attackedShipFields) {
    let { x, y } = field.dataset;
    x = Number(x);
    y = Number(y);
    if (x > 0) smartAttackCoords.push({ x: x - 1, y });
    if (x < 9) smartAttackCoords.push({ x: x + 1, y });
    if (y > 0) smartAttackCoords.push({ x, y: y - 1 });
    if (y < 9) smartAttackCoords.push({ x, y: y + 1 });
  }

  const filteredSmartAttackCoords = smartAttackCoords.filter((coord) =>
    isValidAttackField(coord)
  );

  const randomArrayIndex = Math.floor(
    Math.random() * filteredSmartAttackCoords.length
  );
  const { x, y } = filteredSmartAttackCoords[randomArrayIndex];
  const field = playerFields.find(
    (field) => field.dataset.x == x && field.dataset.y == y
  );

  return [player.ownBoard.receiveAttack({ x, y }), field];
}

export function shipUnderAttack() {
  allFieldsOfPlayer = Array.from(
    document.querySelectorAll(".player .single-field")
  );
  return allFieldsOfPlayer.some((field) => field.textContent === "🔥");
}

function isValidAttackField({ x, y }) {
  const fieldToCheck = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
  return fieldToCheck.textContent === "" || fieldToCheck.textContent === "⛴️"
    ? true
    : false;
}

// Later-Feature: Improve AI

// 1. Decide on a Direction: The AI should choose a direction (up, down, left, right)
// and continue in that direction until it either misses or hits the edge of the board.

// 2. Switch Directions on Miss: If a hit is followed by a miss, switch to the opposite direction.

// 3. Multiple Directions Handling: Ensure that the AI considers all possible directions
// if initial attempts fail. This prevents the AI from getting stuck due to adjacent ships.
