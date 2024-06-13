const playerBoard = document.querySelector(".board.player");
const enemyBoard = document.querySelector(".board.enemy");

export function renderBoards() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      playerBoard.append(createSingleField(j, i));
      enemyBoard.append(createSingleField(j, i));
    }
  }
}

export function removeBoards() {
  playerBoard.innerHTML = "";
  enemyBoard.innerHTML = "";
}

export function clearPlayerBoard() {
  const allFieldsOfPlayer = Array.from(
    playerBoard.querySelectorAll(".single-field")
  );
  for (const field of allFieldsOfPlayer) {
    field.textContent = "";
  }
}

function createSingleField(x, y) {
  const field = document.createElement("div");
  field.classList.add("single-field");
  field.dataset.x = x;
  field.dataset.y = y;
  return field;
}

export function renderShipFields(player) {
  let allFieldsOfPlayer;
  if (player.type === "real") {
    allFieldsOfPlayer = Array.from(
      document.querySelectorAll(".player .single-field")
    );
  } else if (player.type === "computer") {
    allFieldsOfPlayer = Array.from(
      document.querySelectorAll(".enemy .single-field")
    );
  }

  if (player.type === "real") {
    const flatPlayerBoard = player.ownBoard.grid.flat();
    allFieldsOfPlayer.forEach((field, i) => {
      if (flatPlayerBoard[i].sunken) field.textContent = "☠️";
      else if (field.textContent === "🔥") return;
      else if (typeof flatPlayerBoard[i] === "object") field.textContent = "⛴️";
    });
  } else {
    const flatEnemyBoard = player.ownBoard.grid.flat();
    allFieldsOfPlayer.forEach((field, i) => {
      if (flatEnemyBoard[i].sunken) field.textContent = "☠️";
    });
  }
}

export function setTextInfoBox(str) {
  const infoBox = document.querySelector(".infobox");
  infoBox.textContent = str;
}

export function displayWinner(str) {
  const infoBox = document.querySelector(".infobox");
  infoBox.textContent = `${str} has won the game!`;
}
