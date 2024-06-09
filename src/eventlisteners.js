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
  const [result, field] = randomShotAI(player);
  renderAttackResult(result, field);
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

function targetShotAI(player) {}
