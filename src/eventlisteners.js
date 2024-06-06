import { renderShips } from "./render";

export function loadEventListeners(enemy) {
  const fields = Array.from(document.querySelectorAll(".enemy .single-field"));
  for (const field of fields) {
    field.addEventListener(
      "click",
      () => {
        const { x, y } = field.dataset;
        const result = enemy.ownBoard.receiveAttack({ x, y });
        renderAttackResult(result, field);
        renderShips(enemy);
      },
      { once: true }
    );
  }
}

function renderAttackResult(result, field) {
  result === "hit" ? (field.textContent = "🔥") : (field.textContent = "🌊");
}
