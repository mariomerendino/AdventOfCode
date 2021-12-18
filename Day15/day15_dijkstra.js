const fs = require('fs');

let nodeMap = []
class Node {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.pathRisk = (x == 0 && y == 0) ? 0 : Infinity;
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

const updatePathRisk = (fromNode, toNode) => {
  const newRisk = fromNode.pathRisk + toNode.value;
  if (newRisk < toNode.pathRisk) {
    toNode.pathRisk = newRisk;
  }
}

const pickNextFromQueue = (nodeQueue) => {
  let next = null;
  for (const node of nodeQueue) {
      if (next === null || node.pathRisk < next.pathRisk) {
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

    const current = pickNextFromQueue(nodeQueue);
  
    // Update risks of all connections
    if (current.up && !current.up.visited) {
      updatePathRisk(current, current.up);
      nodeQueue.add(current.up);
    }
    if (current.down && !current.down.visited) {
      updatePathRisk(current, current.down);
      nodeQueue.add(current.down);
    }
    if (current.right && !current.right.visited) {
      updatePathRisk(current, current.right);
      nodeQueue.add(current.right);
    }
    if (current.left && !current.left.visited) {
      updatePathRisk(current, current.left);
      nodeQueue.add(current.left);
    }

    current.visited = true;
    nodeQueue.delete(current);
  }
}

const runPart1 = () => {
  readInputFile(false);
  dijkstra()
  const endNode = nodeMap[nodeMap.length - 1][nodeMap.length - 1];
  console.log(endNode.pathRisk)
}

const runPart2 = () => {
  readInputFilePart2(true);
  dijkstra()
  const endNode = nodeMap[nodeMap.length - 1][nodeMap.length - 1];
  console.log(endNode.pathRisk)
}

runPart2();