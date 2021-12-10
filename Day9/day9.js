const fs = require('fs');

const getBasinSize = (alreadyVisited, map, i, j) => {
  const invalidPosition = i >= map.length || j >= map[0].length || i < 0 || j < 0
  if(invalidPosition || alreadyVisited[i][j] || map[i][j] == 9) {
    return 0;
  }
  alreadyVisited[i][j] = true
  return (
    1 +
    getBasinSize(alreadyVisited, map, i + 1, j) +
    getBasinSize(alreadyVisited, map, i, j + 1) +
    getBasinSize(alreadyVisited, map, i, j - 1) + 
    getBasinSize(alreadyVisited, map, i - 1, j)
  );

}

const runPart2 = () => {
  fs.readFile('input.txt', 'utf8' , (_err, data) => {
    const map = data.split("\n").map((line) => line.split('').map((int) => parseInt(int)))
    // let alreadyVisited = new Set();
    let alreadyVisited = [];
    for(let i = 0; i < map.length; i++) { 
      alreadyVisited.push([])
      for(let j = 0; j < map[i].length; j++){
        alreadyVisited[i][j] = false;
      }
    }
  
    let sizeOfBasins = [];

    for(let i = 0; i < map.length; i++) { 
      let row = map[i];
      for(let j = 0; j < row.length; j++){
        currentValue = map[i][j];
        if (currentValue != 9 && !alreadyVisited[i][j] == true) {
          sizeOfBasins.push(getBasinSize(alreadyVisited, map, i, j));
        }
      }
    }
    sizeOfBasins.sort((a, b) => a - b)

    console.log(
      sizeOfBasins[sizeOfBasins.length -1] * 
      sizeOfBasins[sizeOfBasins.length -2] * 
      sizeOfBasins[sizeOfBasins.length -3] 

    );
  });
};


const runPart1 = () => {
  fs.readFile('input.txt', 'utf8' , (_err, data) => {
    const map = data.split("\n").map((line) => line.split('').map((int) => parseInt(int)))
    let total = 0;

    for(let i = 0; i < map.length; i++) { 
      let row = map[i];
      for(let j = 0; j < row.length; j++){
        let upValue, downValue, leftValue, rightValue, currentValue;
        currentValue = map[i][j];
        if (i == 0) {
          upValue = 10;
        } else {
          upValue = map[i - 1][j]
        } 

        if (i == map.length -1 ) {
          downValue = 10;
        } else {
          downValue = map[i + 1][j]
        } 

        if (j == 0) { 
          leftValue = 10;
        } else {
          leftValue = map[i][j - 1]
        }

        if (j == row.length -1) {
          rightValue = 10;
        } else {
          rightValue = map[i][j + 1]
        }
        if (currentValue < upValue && currentValue < downValue && currentValue < leftValue && currentValue < rightValue) {
          total = total + 1 + currentValue
        }
      }
    }
    console.log(total);
  })
};

runPart2();