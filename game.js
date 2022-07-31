//score  //game end  // win possibilities
class Game {
  constructor() {
    this.board = document.querySelector(".board");
    this.addCellEvent("click", this.clickCell);
    this.addCellEvent("mouseover", this.hoverCellOn);
    this.addCellEvent("mouseout", this.hoverCelloff);
  }

  addCellEvent(event, callback) {
    this.board.addEventListener(event, function (e) {
      const cellEl = e.target.closest(".cell");
      if (!cellEl) return;
      callback(cellEl);
    });
  }

  clickCell(el) {
    el.style.background = "blue";
  }

  hoverCellOn(el) {
    el.style.background = "red";
  }

  hoverCelloff(el) {
    el.style.background = "";
  }
}

const game = new Game();

class Player {
  constructor(symbol) {
    this.symbol = symbol; // replace with image
    this.score = 0;
  }
}

// const playerOne = new Player("X");

// const playerTwo = new Player("O");
