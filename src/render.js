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

function createSingleField(x, y) {
  const field = document.createElement("div");
  field.classList.add("single-field");
  field.dataset.x = x;
  field.dataset.y = y;
  return field;
}

export function renderShips(player) {
  let allFieldsOfPlayer;
  if (player.type === "real") {
    allFieldsOfPlayer = Array.from(
      document.querySelectorAll(".player .single-field")
    );
  } else {
    allFieldsOfPlayer = Array.from(
      document.querySelectorAll(".enemy .single-field")
    );
  }

  if (player.type === "real") {
    const flatPlayerBoard = player.ownBoard.grid.flat();
    allFieldsOfPlayer.forEach((field, i) => {
      if (flatPlayerBoard[i].sunken) field.textContent = "☠️";
      else if (typeof flatPlayerBoard[i] === "object") field.textContent = "⛴️";
    });
  } else {
    const flatEnemyBoard = player.ownBoard.grid.flat();
    allFieldsOfPlayer.forEach((field, i) => {
      if (flatEnemyBoard[i].sunken) field.textContent = "☠️";
    });
  }
}
