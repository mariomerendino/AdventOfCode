const fs = require('fs');
const { performance } = require('perf_hooks');

let sums = []
let map = []
let potentialMinimum = undefined

const readInputFile= (test) => {
  let path = test ? 'testinput.txt' : 'input.txt';
  let data = fs.readFileSync(path, 'utf8');
  let lines = data.split('\n');

  lines.forEach((row, lineIndex) => {
    map.push([]);
    map[lineIndex] = row.split('').map((x) => parseInt(x));
  })
};

// this is brute force and slow as poop. Time to write a real algo :'(
const traverseMap = (currentPosition, sum ) => {
  const isMoveInvalid = currentPosition[0] > map.length - 1 || currentPosition[1] > map[0].length - 1
  const isInEndPosition = currentPosition[0] == map.length - 1 && currentPosition[1] == map[0].length - 1
  const stillValidPath = (potentialMinimum == undefined) || (potentialMinimum != undefined && sum < potentialMinimum)

  if(!isMoveInvalid && !isInEndPosition && stillValidPath) {
    let currentValue = map[currentPosition[0]][currentPosition[1]]
    traverseMap([currentPosition[0] + 1, currentPosition[1]], sum + currentValue)
    traverseMap([currentPosition[0], currentPosition[1] + 1], sum + currentValue)
  } else if (isInEndPosition) {
    if (potentialMinimum > sum || potentialMinimum == undefined) {
      potentialMinimum = sum;
    }
    if(!sums.includes(sum)){
      console.log(sum)
      sums.push(sum);
    }
  }
}

const runPart1 = () => {
  readInputFile(false);
  // too slow, lets try dijkstra
  traverseMap([0, 0], 0)
  console.log(Math.min(...sums))
  console.log(potentialMinimum)
}

runPart1();