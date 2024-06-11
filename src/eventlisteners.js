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
  // if (attackedShipFields.length === 1) {}
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
  console.log("Array:", smartAttackCoords);
  console.log("Filtered:", filteredSmartAttackCoords);

  function isValidAttackField(coord) {
    const { x, y } = coord;
    const fieldToCheck = document.querySelector(
      `[data-x="${x}"][data-y="${y}"]`
    );
    if (fieldToCheck.textContent === "" || fieldToCheck.textContent === "⛴️")
      return true;
    else return false;
  }

  // TODO NEXT: Infobox UX
  // Problem: Need to check if fields are available for attack (aka not clicked yet)
  // Problem 2: Handle case when there are more than 1 attackedShipFields
  //    Write a step by step guide in pseudo code how the AI should perform in this case
  // 1. Entscheide dich für eine Richtung
  //    2. Falls hit, gehe diese Richtung weiter bis kein hit
  //        3. Falls kein hit, gehe in die entgegengesetzte Richtung
  //    4. Falls kein hit, gehe in eine der anderen Richtungen

  // array mit den 4 richtungen, das resettet wird sobald ein schiff versenkt ist

  // fehleranfällig für direkt angrenzende schiffe, wie lösen?
  //    wenn richtungen leer, dann wieder auffällen mit allen richtungen. fixed?

  // hier abbrechen und als feature aufnehmen?

  const randomArrayIndex = Math.floor(
    Math.random() * filteredSmartAttackCoords.length
  );
  const field = playerFields.filter(
    (field) =>
      field.dataset.x == filteredSmartAttackCoords[randomArrayIndex].x &&
      field.dataset.y == filteredSmartAttackCoords[randomArrayIndex].y
  )[0];
  console.log(filteredSmartAttackCoords[randomArrayIndex], field);
  return [
    player.ownBoard.receiveAttack(filteredSmartAttackCoords[randomArrayIndex]),
    field,
  ];
}

function shipUnderAttack(player) {
  allFieldsOfPlayer = Array.from(
    document.querySelectorAll(".player .single-field")
  );
  return allFieldsOfPlayer.some((field) => field.textContent === "🔥");
}
