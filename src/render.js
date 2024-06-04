const playerBoard = document.querySelector(".board.player");
const enemyBoard = document.querySelector(".board.enemy");

export function renderBoards() {
  for (let i = 0; i < 100; i++) {
    const singleField = document.createElement("div");
    singleField.classList.add("single-field");
    const anotherSingleField = document.createElement("div");
    anotherSingleField.classList.add("single-field");
    playerBoard.append(singleField);
    enemyBoard.append(anotherSingleField);
  }
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
