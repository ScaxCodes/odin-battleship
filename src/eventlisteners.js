import { renderShips } from "./render";

export function loadEventListeners(enemy, player) {
  const fields = Array.from(document.querySelectorAll(".enemy .single-field"));
  for (const field of fields) {
    field.addEventListener(
      "click",
      () => {
        const { x, y } = field.dataset;
        const result = enemy.ownBoard.receiveAttack({ x, y });
        renderAttackResult(result, field);
        renderShips(enemy);
        performEnemyTurn(player);
        renderShips(player);
      },
      { once: true }
    );
  }
}

function renderAttackResult(result, field) {
  result === "hit" ? (field.textContent = "🔥") : (field.textContent = "🌊");
}

function performEnemyTurn(player) {
  const playerFields = Array.from(
    document.querySelectorAll(".player .single-field")
  );
  const availableFields = playerFields.filter(
    (field) => field.textContent === "" || field.textContent === "⛴️"
  );

  const randomArrayIndex = Math.floor(Math.random() * availableFields.length);
  const field = availableFields[randomArrayIndex];
  const { x, y } = field.dataset;

  const result = player.ownBoard.receiveAttack({ x, y });
  renderAttackResult(result, field);
}
