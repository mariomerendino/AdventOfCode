const fs = require('fs')

const boards = []
let numbersToBeCalled = []
const calledNumbers = new Set();

class Board {
  constructor(board) {
    const temp = [];
    for(let i = 0; i < board.length; i++) {
      temp.push(board[i].split(' ').filter(e => e != ''))

    }
    this.board = temp;
  }

  winningBoard () {
    let winningRow = false;
    // check rows
    for(let i = 0; i < this.board.length; i++) { 
      let row = this.board[i]
      for(let j = 0; j < row.length; j++) { 
        if(calledNumbers.has(row[j])) {
          winningRow = true;
        } else {
          winningRow = false;
          break;
        }
      }
      if (winningRow){
        return true;
      }
    }

    // check cols
    let winningColumn = false;
    for(let i = 0; i < this.board.length; i++) { 
      for(let j = 0; j < this.board.length; j++) {
        if(calledNumbers.has(this.board[j][i])) {
          winningColumn = true;
        } else {
          winningColumn = false;
          break;
        }
      }
      if (winningColumn){
        return true;
      }
    }
    // check diag -> left - right
    let winningDiags = false;
    for(let i = 0; i < this.board.length; i++) {
      if(calledNumbers.has(this.board[i][i])) {
        winningDiags = true;
      }
      else {
        winningDiags = false;
        break;
      }
    }
    let winningDiags2 = false;
    for(let i = 0; i < this.board.length; i++) {
      if(calledNumbers.has(this.board[i][this.board.length - i])) {
        winningDiags2 = true;
      }
      else {
        winningDiags = false;
        break;
      }
    }
    return winningDiags || winningDiags2;
  }

  missingNumbers () {
    const nums = []
    this.board.forEach((row) => {
      row.forEach((cell) => {
        if(!calledNumbers.has(cell)) {
          nums.push(parseInt(cell));
        }
      })
    })
    return nums;
  }
  
  printBoard () {
    console.log(this.board)
  }
}

const x = () => {
  fs.readFile('input.txt', 'utf8' , (_err, data) => {
    const arrayOfInputs = data.split("\n");
    numbersToBeCalled = arrayOfInputs[0].split(',');
    let tmp = []
    let iterator = 2;
    while(iterator != arrayOfInputs.length) {
      tmp = arrayOfInputs.slice(iterator, iterator + 5);
      iterator = iterator + 6;
      let board = new Board(tmp)
      boards.push(board)
    }
    
    let winningBoards = []
    let winningBoardSet = new Set();
    let winningNumber = 0;
    for(let i = 0; i < numbersToBeCalled.length; i++) {
      if (i > 4) {
        boards.forEach((board) => {
          if(board.winningBoard()) {
            if (winningBoardSet.has(board)) {

            } else {
              winningBoards.push(board)
              winningBoardSet.add(board)
            }
            winningNumber = parseInt(numbersToBeCalled[i-1])
          }
        })
        if(winningBoards.length == boards.length){
          break;
        }
      }

      calledNumbers.add(numbersToBeCalled[i]);
    }

    console.log(winningBoards.length);
    console.log(boards.length);

    let lastWinningboard = winningBoards[winningBoards.length - 1]
    let sumOfMissingNumbers = lastWinningboard.missingNumbers().reduce((a, b) => a + b, 0)

    console.log(sumOfMissingNumbers * winningNumber);
  })
}

x();