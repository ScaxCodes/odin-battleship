import { renderShips } from "./render";
import { isGameOver } from "./index";

export function loadEventListeners(enemy, player) {
  const fields = Array.from(document.querySelectorAll(".enemy .single-field"));
  for (const field of fields) {
    field.addEventListener(
      "click",
      () => {
        if (isGameOver()) return;
        performPlayerTurn(enemy, field);
        renderShips(enemy);
        if (isGameOver()) return;
        performEnemyTurn(player);
        renderShips(player);
      },
      { once: true }
    );
  }
}

function performPlayerTurn(enemy, field) {
  const { x, y } = field.dataset;
  const result = enemy.ownBoard.receiveAttack({ x, y });
  renderAttackResult(result, field);
}

function performEnemyTurn(player) {
  if (!shipUnderAttack(player)) {
    const [result, field] = randomShotAI(player);
    renderAttackResult(result, field);
  } else {
    const [result, field] = targetShotAI(player);
    renderAttackResult(result, field);
  }
}

function renderAttackResult(result, field) {
  result === "hit" ? (field.textContent = "🔥") : (field.textContent = "🌊");
}

function randomShotAI(player) {
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

function targetShotAI(player) {
  const playerFields = Array.from(
    document.querySelectorAll(".player .single-field")
  );
  const attackedShipFields = playerFields.filter(
    (field) => field.textContent === "🔥"
  );
  const smartAttackCoords = [];
  if (attackedShipFields.length === 1) {
    let { x, y } = attackedShipFields[0].dataset;
    x = Number(x);
    y = Number(y);
    if (x > 0) smartAttackCoords.push({ x: x - 1, y });
    if (x < 9) smartAttackCoords.push({ x: x + 1, y });
    if (y > 0) smartAttackCoords.push({ x, y: y - 1 });
    if (y < 9) smartAttackCoords.push({ x, y: y + 1 });
  }
  // Problem: Need to check if fields are available for attack (aka not clicked yet)
  // Problem 2: Handle case when there are more than 1 attackedShipFields

  const randomArrayIndex = Math.floor(Math.random() * smartAttackCoords.length);
  const field = playerFields.filter(
    (field) =>
      field.dataset.x == smartAttackCoords[randomArrayIndex].x &&
      field.dataset.y == smartAttackCoords[randomArrayIndex].y
  );
  console.log(smartAttackCoords[randomArrayIndex], field);
  return [
    player.ownBoard.receiveAttack(smartAttackCoords[randomArrayIndex]),
    field[0],
  ];
}

function shipUnderAttack(player) {
  allFieldsOfPlayer = Array.from(
    document.querySelectorAll(".player .single-field")
  );
  return allFieldsOfPlayer.some((field) => field.textContent === "🔥");
}
