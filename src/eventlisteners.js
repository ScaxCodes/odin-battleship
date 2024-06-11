import { renderShips } from "./render";
import { isGameOver } from "./index";
import {
  randomShotAI,
  targetShotAI,
  shipUnderAttack,
} from "./computerAttackLogic";

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
  if (!shipUnderAttack()) {
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
