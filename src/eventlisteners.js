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
  // Select random field that does not have been attacked
  const playerFields = Array.from(
    document.querySelectorAll(".player .single-field")
  );
  const availableFields = playerFields.filter(
    (field) => field.textContent === "" || field.textContent === "⛴️"
  );

  const randomArrayIndex = Math.floor(Math.random() * availableFields.length);
  const field = availableFields[randomArrayIndex];
  console.log(field);
  const { x, y } = field.dataset;

  // const x = Math.floor(Math.random() * 10);
  // const y = Math.floor(Math.random() * 10);
  // Select DOM element with coords from random field above
  // const field = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);

  const result = player.ownBoard.receiveAttack({ x, y });
  console.log(result);
  renderAttackResult(result, field);
}
