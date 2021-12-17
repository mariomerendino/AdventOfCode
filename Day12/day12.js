const fs = require('fs');

const readInputFile = (test) => {
  let path = test ? 'testinput2.txt' : 'input.txt';
  let data = fs.readFileSync(path, 'utf8');
  return data.split('\n');
}

// the map should be in a format where the keys are points you can navigate from,
// the values are values you can navigate to. 
const buildMap = (lines) => {
  let map = {};
  for(let i = 0; i < lines.length; i++) {
    points = lines[i].split('-')
    if (!map[points[0]]) {
      map[points[0]] = []
    }
    if (!map[points[1]]) {
      map[points[1]] = []
    }
    
    if (points[1] != 'start'){
      map[points[0]].push(points[1]);
    }
    if (points[0] != 'start') {
      map[points[1]].push(points[0]);
    }
  }

  // Since you can not navigate anywhere from the end, remove the end key. 
  delete map['end'];

  return map;
}

const isLowerCase = (string) => {
  return string !== string.toUpperCase();
}

let validPaths = new Set();

const buildPathsPart1 = (map, currentPosition, currentPath) => {
  if (currentPosition == 'end') {
    validPaths.add(currentPath.toString() + ',end');
  } else {
    let validNextMoves = map[currentPosition]
    let currentPath2 = [...currentPath, currentPosition]

    for(let i = 0; i < validNextMoves.length; i++) {
      if (isLowerCase(validNextMoves[i]) && currentPath2.includes(validNextMoves[i])) {
      } else {
        buildPathsPart1(map, map[currentPosition][i], currentPath2)
      }
    }
  }
};

const getLowerCaseVals = (array) => {
  return array.filter((value) => isLowerCase(value))
}

const getCountOfMostDuplicatedLowerCaseLetterInArray = (array) => {
  const counts = {};
  array.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
  let highestCount = 0
  Object.keys(counts).forEach((count) => {
    if(counts[count] > highestCount) {
      highestCount = counts[count]
    }
  })
  return highestCount
}


const buildPathsPart2 = (map, currentPosition, currentPath, allowedNumOfSameLowerCase) => {
  if (currentPosition == 'end') {
    validPaths.add(currentPath.toString() + ',end');
  } else {
    let validNextMoves = map[currentPosition];
    if (getCountOfMostDuplicatedLowerCaseLetterInArray(getLowerCaseVals(currentPath)) >= 2) {
      allowedNumOfSameLowerCase = 1

    }
    for(let i = 0; i < validNextMoves.length; i++) {
      let currentPath2 = [...currentPath, validNextMoves[i]]
      if (isLowerCase(validNextMoves[i]) && currentPath2.filter((x) => x == validNextMoves[i]).length > allowedNumOfSameLowerCase) {

      }
      else {
        buildPathsPart2(map, validNextMoves[i], currentPath2, allowedNumOfSameLowerCase)
      }
    }
  }
};

const runPart1 = () => {
  let caveMap = buildMap(readInputFile(true));
  buildPathsPart1(caveMap, 'start', [])
  console.log(validPaths.size)

};

const runPart2 = () => {
  let caveMap = buildMap(readInputFile(false));
  buildPathsPart2(caveMap, 'start', ['start'], 2)
  console.log(validPaths.size)
};


runPart2();