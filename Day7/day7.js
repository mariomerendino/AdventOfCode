const fs = require('fs');
const { parse } = require('path/posix');

const run = () => {
  fs.readFile('input.txt', 'utf8' , (_err, data) => {
    let horizontalPositions = data.split(',').map((el) => parseInt(el));
    let totalMovesPerPosition = {};

    let smallestPos = Math.min(...horizontalPositions);
    let largestPos = Math.max(...horizontalPositions);

    for(let i = smallestPos; i <= largestPos; i++) {
      totalMovesPerPosition[i] = 0;
    }

    console.log(totalMovesPerPosition)

    let amountOfMoves;
    let amountOfFuel;
    let moves;

    horizontalPositions.forEach((pos) => {
      Object.keys(totalMovesPerPosition).forEach((key) => {
        amountOfMoves = Math.abs(pos - parseInt(key))

        moves = 0;
        amountOfFuel = 0;
        if (amountOfMoves == 0) {
          amountOfFuel = 0;
        } else {
          while(moves <= amountOfMoves) { 
            amountOfFuel = amountOfFuel + moves;
            moves++
          }
        }

        totalMovesPerPosition[key] = amountOfFuel + totalMovesPerPosition[key]

      });
    });

    console.log(totalMovesPerPosition)

    let minimumMoves;

    for( const [key, value] of Object.entries(totalMovesPerPosition)) {
      if(minimumMoves) {
        if (minimumMoves > value) {
          minimumMoves = value
        }
      } else {
        minimumMoves = value
      }
    }

    console.log(minimumMoves)
  });
};

run();