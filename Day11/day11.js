const fs = require('fs');
const day11 = () => {
  let flashCount = 0;

  function runPart1 () {
    fs.readFile('input.txt', 'utf8' , (_err, data) => {
      let octopusMap = data.split("\n").map((line) => line.split('').map((char) => parseInt(char)))
      let hasFlashedThisStep = new Set();
      let stepCount = 0;
      while(hasFlashedThisStep.size != octopusMap.length * octopusMap[0].length) {
        hasFlashedThisStep = new Set();
        for(let i = 0; i < octopusMap.length; i++) {
          for(let j=0; j < octopusMap[i].length; j++){
            if (octopusMap[i][j] == 9) {
              octopusFlash(i, j, octopusMap, hasFlashedThisStep, 0);
            }
            else if (hasFlashedThisStep.has([i,j].toString())) {
              octopusMap[i][j] = 0;
            }
            else {
              octopusMap[i][j]++;
            }

          }
        }
        stepCount++;
      }

      console.log(stepCount)
    });
  };

  function octopusFlash(i, j, map, hasFlashedThisStep) {
    const invalidPosition = i >= map.length || j >= map[0].length || i < 0 || j < 0;
    if (invalidPosition || hasFlashedThisStep.has([i,j].toString())) {
      return flashCount;
    }

    map[i][j]++; 
    if (map[i][j] > 9) {
      hasFlashedThisStep.add([i,j].toString());
      map[i][j] = 0;
      flashCount++;
      octopusFlash(i + 1, j + 1, map, hasFlashedThisStep)
      octopusFlash(i - 1, j - 1, map, hasFlashedThisStep)
      octopusFlash(i + 1, j - 1, map, hasFlashedThisStep)
      octopusFlash(i - 1, j + 1, map, hasFlashedThisStep)
      octopusFlash(i, j + 1, map, hasFlashedThisStep)
      octopusFlash(i + 1, j,map, hasFlashedThisStep)
      octopusFlash(i, j - 1, map, hasFlashedThisStep)
      octopusFlash(i - 1, j, map, hasFlashedThisStep)
    }
  }

  const printMap = (map) => {
    for(let i= 0; i < map.length; i ++){
      console.log(map[i].join(''))
    }
  }
  runPart1();
};

day11();