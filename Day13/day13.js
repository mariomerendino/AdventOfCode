const fs = require('fs');
let map = [];
let foldingInstructions = [];

const readInputFileAndBuildMap = (test) => {
  let path = test ? 'testinput.txt' : 'input.txt';
  let data = fs.readFileSync(path, 'utf8');
  let lines = data.split('\n');
  let dots = lines.filter((line) => line.includes(',')).map((value) => value.split(',').map((val) => parseInt(val)));
  let largestX = 0;
  let largestY = 0;
  dots.forEach(element => {
    if (element[0] > largestX) {
      largestX = element[0];
    }
    if (element[1] > largestY) {
      largestY = element[1]
    }
  });

  for(let i = 0; i <= largestY; i++){
    map.push([])
    for(let j = 0; j <= largestX; j++) {
      map[i][j] = '.'
    }
  }


  dots.forEach(element => {
    map[element[1]][element[0]] = '#'
  })

  foldingInstructions = lines.filter((line) => line.includes('fold')).map((line) => line.split(' ')[2])
}


const horizontalFold = (foldIndex) => {
  let foldUp = false;

  if (foldIndex >= parseInt(map.length/2)) {
    foldUp = true
  }

  let numberOfIterations = 0;

  let startingHeight = foldUp ? foldIndex - 1 : 0
  let endingHeight = foldUp ? map.length : foldIndex
  for(let i = startingHeight; i < endingHeight; i++) {
    for(let j = 0; j < map[i].length; j++){
      if(map[i][j] == '#' && foldUp) {
        map[foldIndex - numberOfIterations + 1][j] = '#'
      } else if (map[i][j] == '#') {
        map[foldIndex + numberOfIterations + 1][j] = '#'
      }
    }
    numberOfIterations++;
  }

  map = map.filter((_x, index) => { 
    if (foldUp) {
      return index < foldIndex
    } else {
      return index > foldIndex
    }
  });
}

const verticalFold = (foldIndex) => {
  let foldRight = false;
  if (foldIndex <= parseInt(map[0].length/2)) {
    console.log('hey!')
    foldRight = true;
  }

  let startingWidth = foldRight ? 0 : foldIndex
  let endingWidth = foldRight ? foldIndex - 1: map[0].length

  for(let i = 0; i < map.length; i++) {
    let numberOfIterations = 0;
    for(let j = startingWidth; j < endingWidth; j++){
      if (map[i][j] == '#' && foldRight) {
        map[i][foldIndex + numberOfIterations] = '#'
      } else if(map[i][j] == '#') {
        map[i][foldIndex - numberOfIterations - 2] = '#'
      }
      numberOfIterations = numberOfIterations + 1;
    }
  }

  let newMap = []

  for(let i = 0; i < map.length; i++){
    newMap.push([]);
    if (foldRight) {
      for(let j = foldIndex; j < map[i].length; j++){
        newMap[i].push(map[i][j])
      }
    } else {
      for(let j = 0; j < foldIndex -1; j++){
        newMap[i].push(map[i][j])
      }
    }
  }

  map = newMap;
}

const runPart1 = () => {
  readInputFileAndBuildMap(true);
  foldingInstructions.forEach((instruction) => {
    let breakDown = instruction.split('')
    let axis = breakDown[0]
    let foldIndex = parseInt(breakDown[2]);
    printMap()
    console.log("Width ", map[0].length)
    console.log("Height ", map.length)
    console.log("about to fold ", instruction)
    console.log()
    console.log('*******')

    if (axis == 'y') {
      printHorizontalFold(foldIndex)
      horizontalFold(foldIndex)
    }
    if (axis == 'x') {
      printVerticalFold(foldIndex)
      verticalFold(foldIndex)
    }
    console.log()
    console.log()
  })

  printMap()

  let dotCount = 0;
  map.forEach((line) => {
    line.forEach((point) => {
      if (point == '#') {
        dotCount++;
      }
    })
  })

  console.log(dotCount)
};

const printMap = () => {
  for (let i = 0; i < map.length; i++) {
    console.log(map[i].join(""));
  }
}

const printHorizontalFold = (index) => {
  for (let i = 0; i < map.length; i++) {
    if (i == index) {
      console.log('-------------------------')
    } else {
      console.log(map[i].join(""));
    }
  }
}

const printVerticalFold = (index) => {
  for (let i = 0; i < map.length; i++) {
    let str = ''
    for(let j = 0; j < map[i].length; j++){
      if (j == index - 1) {
        str = str + '|'
      }
      else { 
        str = str + map[i][j]
      }
    }
    console.log(str);
  }
}

runPart1();