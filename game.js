//score  //game end  // win possibilities

const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Game {
  init() {
    this.allCellEl = document.querySelectorAll("[data-cell]");
    this.board = document.querySelector(".board");
    this.message = document.querySelector("#winningMessage");
    this.winMessage = document.querySelector("[data-winning-message-text]");
    this.restartButton = document.getElementById("restartButton");
    this.playerXScore = document.querySelector(".playerX");
    this.playerOScore = document.querySelector(".playerO");
    this.playerCur = document.querySelector(".playerCur");
    this.setupPlayers();

    // this key points towards the callback - used bind method to point this to correct function call
    this.addCellEvent("click", this.clickCell.bind(this));
    this.addCellEvent("mouseover", this.hoverCellOn.bind(this));
    this.addCellEvent("mouseout", this.hoverCelloff.bind(this));
    this.restartButton.addEventListener("click", this.resetGame.bind(this));
  }

  addCellEvent(event, callback) {
    // Event Delegation
    this.board.addEventListener(event, function (e) {
      // getting the targeted cell closest method
      const cellEl = e.target.closest(".cell");
      // gaurd closure
      if (!cellEl) return;
      callback(cellEl);
    });
  }

  clickCell(el) {
    if (this.hasBeenClicked(el)) return;
    el.classList.add(`${this.currentPlayer.symbol}`);
    if (this.isWin()) this.endGame();
    else if (this.isDraw()) this.endGame(true);
    else this.togglePlayer();
  }

  hoverCellOn(el) {
    if (this.hasBeenClicked(el)) return;
    el.classList.add(`${this.currentPlayer.symbol}-hover`);
  }

  hoverCelloff(el) {
    el.classList.remove(`${this.playerX.symbol}-hover`);
    el.classList.remove(`${this.playerO.symbol}-hover`);
  }

  setupPlayers() {
    this.playerX = this.playerX ?? new Player("X");
    this.playerO = this.playerO ?? new Player("O");
    this.currentPlayer = this.playerX;
    this.setScore();
  }

  // Toggle between players
  togglePlayer() {
    this.currentPlayer =
      this.currentPlayer === this.playerX ? this.playerO : this.playerX;
    this.setScore();
  }

  // checking if the cell has a X or O
  hasBeenClicked(el) {
    return (
      el.classList.contains(this.playerX.symbol) ||
      el.classList.contains(this.playerO.symbol)
    );
  }

  // Checking for winning combinations - First check: if any of the combo's return true = currentplayer win
  isWin() {
    return WINNING_COMBINATION.some((comb) =>
      comb.every((val) =>
        this.allCellEl[val].classList.contains(this.currentPlayer.symbol)
      )
    );
  }

  // Checking if all the positions is filled but no winning combination has triggered
  // true = Draw
  // spreading the nodelist as a new array because the every method is not a nodelist
  isDraw() {
    return [...this.allCellEl].every((val) => this.hasBeenClicked(val));
  }

  endGame(isDraw = false) {
    this.winMessage.innerHTML = isDraw
      ? "Draw"
      : `PLayer ${this.currentPlayer.symbol} WON!!`;
    this.message.classList.add("show");
    if (!isDraw) this.currentPlayer.score++;
  }

  resetGame() {
    this.winMessage.innerHTML = "";
    this.message.classList.remove("show");
    this.allCellEl.forEach((element) => {
      element.classList.remove(this.playerX.symbol);
      element.classList.remove(this.playerO.symbol);
      this.setScore();
    });
  }

  setScore() {
    this.playerXScore.innerHTML = `Player X : ${this.playerX.score}`;
    this.playerOScore.innerHTML = `${this.playerO.score} : Player O`;
    this.playerCur.innerHTML = `It's Player ${this.currentPlayer.symbol} turn`;
  }
}

class Player {
  constructor(symbol) {
    this.symbol = symbol;
    this.score = 0;
  }
}

const game = new Game();
game.init();
