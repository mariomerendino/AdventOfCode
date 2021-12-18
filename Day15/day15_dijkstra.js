const fs = require('fs');

let nodeMap = []
class Node {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.distance = (x == 0 && y == 0) ? 0 : 1000000000000000;
    this.visited =  false;
    this.left = null;
    this.right = null;
    this.up = null;
    this.down = null;
  }
}

const readInputFile= (test) => {
  let path = test ? 'testinput.txt' : 'input.txt';
  let data = fs.readFileSync(path, 'utf8');
  let lines = data.split('\n');
  let map = [];

  lines.forEach((row, lineIndex) => {
    map.push([]);
    map[lineIndex] = row.split('').map((x) => parseInt(x));
  })
  
  map.forEach((row, rowIdx) => {
    nodeMap.push([])
    row.forEach((cell, cellIdx) => {
      nodeMap[rowIdx].push(new Node(rowIdx, cellIdx, cell))
    })
  })

  //link up the nodes
  nodeMap.forEach((nodeRow, y) => {
    nodeRow.forEach((node, x) => {
      if (x > 0){
        node.left = nodeMap[y][x - 1]
      };
      if (x < nodeMap[y].length - 1){
        node.right = nodeMap[y][x + 1]
      };
      if (y > 0) {
        node.up = nodeMap[y - 1][x]
      };
      if (y < nodeMap.length - 1) {
        node.down = nodeMap[y + 1][x]
      };
    })
  })
};

const readInputFilePart2 = (test) => {
  let path = test ? 'testinput.txt' : 'input.txt';
  let data = fs.readFileSync(path, 'utf8');
  let lines = data.split('\n');
  let map = [];

  lines.forEach((row, lineIndex) => {
    map.push([]);
    map[lineIndex] = row.split('').map((x) => parseInt(x));
  })

  // DO SOMETHING TO EXPAND THE MAP
  const initialSize = map.length;
  for (let y = 0; y < initialSize; y++) {
      const row1 = map[y];
      for (let rY = 0; rY < 5; rY++) {
          const y2 = (rY * initialSize) + y;
          const row2 = map[y2] || (map[y2] = []);
          for (let x = 0; x < initialSize; x++) {
              for (let rX = 0; rX < 5; rX++) {
                  // Skip 0,0 (don't project into the source)
                  if (rY === 0 && rX === 0) {
                      continue;
                  }
  
                  // Compute location to project to
                  const x2 = (rX * initialSize) + x;
  
                  // Compute the new risk value
                  const increase = rX + rY;
                  let newRisk = row1[x] + increase;
                  if (newRisk > 9) {
                      newRisk -= 9;
                  }
  
                  // Project the value
                  row2[x2] = newRisk;
              }
          }
      }
  }

  console.log(map)
  
  map.forEach((row, rowIdx) => {
    nodeMap.push([])
    row.forEach((cell, cellIdx) => {
      nodeMap[rowIdx].push(new Node(rowIdx, cellIdx, cell))
    })
  })

  //link up the nodes
  nodeMap.forEach((nodeRow, y) => {
    nodeRow.forEach((node, x) => {
      if (x > 0){
        node.left = nodeMap[y][x - 1]
      };
      if (x < nodeMap[y].length - 1){
        node.right = nodeMap[y][x + 1]
      };
      if (y > 0) {
        node.up = nodeMap[y - 1][x]
      };
      if (y < nodeMap.length - 1) {
        node.down = nodeMap[y + 1][x]
      };
    })
  })
};

const updateDistance = (fromNode, toNode) => {
  const newRisk = fromNode.distance + toNode.value;
  if (newRisk < toNode.distance) {
    toNode.distance = newRisk;
  }
}

const findNextElementWithSmallestPath = (nodeQueue) => {
  let next = null;
  for (const node of nodeQueue) {
      if (next === null || node.distance < next.distance) {
          next = node;
      }
  }
  return next;
}

const dijkstra = () => {
  const exit = nodeMap[nodeMap.length - 1][nodeMap.length -1];
  const nodeQueue = new Set();
  // start at the beginning of the nodeMap
  nodeQueue.add(nodeMap[0][0]);

  // Loop until we've tested everything
  while (nodeQueue.size > 0) {
    // Stop when the exit is visited
    if (exit.visited) {
      break;
    }

    const current = findNextElementWithSmallestPath(nodeQueue);
  
    // Update risks of all connections
    if (current.up && !current.up.visited) {
      updateDistance(current, current.up);
      nodeQueue.add(current.up);
    }
    if (current.down && !current.down.visited) {
      updateDistance(current, current.down);
      nodeQueue.add(current.down);
    }
    if (current.right && !current.right.visited) {
      updateDistance(current, current.right);
      nodeQueue.add(current.right);
    }
    if (current.left && !current.left.visited) {
      updateDistance(current, current.left);
      nodeQueue.add(current.left);
    }

    current.visited = true;
    nodeQueue.delete(current);
  }
}

const runPart1 = () => {
  readInputFile(true);
  dijkstra()
  const endNode = nodeMap[nodeMap.length - 1][nodeMap.length - 1];
  console.log(endNode.distance)
}

const runPart2 = () => {
  readInputFilePart2(false);
  dijkstra()
  const endNode = nodeMap[nodeMap.length - 1][nodeMap.length - 1];
  console.log(endNode.distance)
}

runPart1();