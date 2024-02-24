let heading = document.getElementById("heading");
let restart = document.getElementById("restart");
let boxes = Array.from(document.getElementsByClassName("box"));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
const oTxt = "O";
const xTxt = "X";
let currentPlayer = xTxt;
let spaces = Array(9).fill(null);

const start = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    if (playerHasWon() !== false) {
      heading.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();
      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }
    currentPlayer = currentPlayer == xTxt ? oTxt : xTxt;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restart.addEventListener("click", restartGame);

function restartGame() {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  heading.innerHTML = "Tic Tac Toe";
  currentPlayer = xTxt;
}

start();
