const fs = require('fs');

let letterCounts = {};
let insertionMap = {};
let twoCharMap = {};

const uniqueArray = (array) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
  let uniq = array.filter(onlyUnique);
  return uniq;
}

const buildTestHashes = (string) => {
  let testTwoCharMap = {}
  let testLetterCounts = {}
  for(let i = 0; i < string.length -1; i++) {
    let str = string.charAt(i) + string.charAt(i + 1)

    if (testTwoCharMap[str]) {
      testTwoCharMap[str] = testTwoCharMap[str] + 1
    } else {
      testTwoCharMap[str] = 1;
    }

  }

  for(let i = 0; i < string.length; i++) { 
    if (testLetterCounts[string.charAt(i)]) {
      testLetterCounts[string.charAt(i)] = testLetterCounts[string.charAt(i)] + 1
    } else {
      testLetterCounts[string.charAt(i)] = 1;
    }
  }
  return [testTwoCharMap, testLetterCounts];

}

const readInputFile= (test) => {
  let path = test ? 'testinput.txt' : 'input.txt';
  let data = fs.readFileSync(path, 'utf8');
  let lines = data.split('\n');
  let insertionMapStarted = false;
  lines.forEach((line) => {
    if(insertionMapStarted) {
      [pattern, insertion] = line.split(' -> ')
      insertionMap[pattern] = insertion;
    }
    else {
      if (line.length == 0) { 
        insertionMapStarted = true;
      }
      for(let i = 0; i < line.length; i++) {
        // setup initial letter counts.
        if (letterCounts[line.charAt(i)]) {
          letterCounts[line.charAt(i)] = letterCounts[line.charAt(i)] + 1
        } else {
          letterCounts[line.charAt(i)] = 1
        }

        if(i <= line.length - 2) {
          let twoCharString = line.charAt(i) + line.charAt(i + 1)
          if(twoCharMap[twoCharString]) {
            twoCharMap[twoCharString] = twoCharMap[twoCharString] + 1;
          } else { 
            twoCharMap[twoCharString] = 1;
          }
        }
      }
    }
  })
}

// const runInsertions = (numberOfInsertions) => {
//   let currentIteration = 0; 
//   while (numberOfInsertions != currentIteration) {
//     let copiedTwoCharMap = Object.assign({}, twoCharMap);
//     let twoCharKeys = Object.keys(twoCharMap);
//     let newFirstKeys = [];
//     let newSecondKeys = [];
//     for(let i = 0; i < twoCharKeys.length; i++) {
//       let currentKey = twoCharKeys[i];
//       let currentInsertion = insertionMap[currentKey];
//       for(let j = 0; j < copiedTwoCharMap[currentKey]; j++) {
//         if (letterCounts[currentInsertion]) { 
//           letterCounts[currentInsertion] = letterCounts[currentInsertion] + 1
//         } else { 
//           letterCounts[currentInsertion] = 1
//         }

//         copiedTwoCharMap[currentKey] = copiedTwoCharMap[currentKey] - 1;
//       }

//       newFirstKeys.push(currentKey.charAt(0) + currentInsertion);
//       newSecondKeys.push(currentInsertion + currentKey.charAt(1));
//     }


//     newFirstKeys.forEach((newFirstKey) => {
//       if(copiedTwoCharMap[newFirstKey]) { 
//         copiedTwoCharMap[newFirstKey] = copiedTwoCharMap[newFirstKey] + 1
//       } else {
//         copiedTwoCharMap[newFirstKey] = 1;
//       }
//     });

//     newSecondKeys.forEach((newSecondKey) => {
//       if(copiedTwoCharMap[newSecondKey]) { 
//         copiedTwoCharMap[newSecondKey] = copiedTwoCharMap[newSecondKey] + 1
//       } else {
//         copiedTwoCharMap[newSecondKey] = 1;
//       }
//     });

//     twoCharMap = Object.assign({}, copiedTwoCharMap);
//     currentIteration++;
//   }
// }

const runInsertions2 = (numberOfInsertions) => {
  let currentIteration = 0; 
  while (numberOfInsertions != currentIteration) {
    let currentInsertionMap = {};
    let twoCharKeys = Object.keys(twoCharMap);
    twoCharKeys.forEach((twoCharKey) => {
      let insertedLetter = insertionMap[twoCharKey];
      let quantity = twoCharMap[twoCharKey]
      let newKey1 = twoCharKey.charAt(0) + insertedLetter
      let newKey2 = insertedLetter + twoCharKey.charAt(1)

      if(letterCounts[insertedLetter]){
        letterCounts[insertedLetter] = letterCounts[insertedLetter] + quantity;
      } else {
        letterCounts[insertedLetter] = quantity;
      }

      currentInsertionMap[newKey1] = currentInsertionMap[newKey1] ? currentInsertionMap[newKey1] + quantity : quantity
      currentInsertionMap[newKey2] = currentInsertionMap[newKey2] ? currentInsertionMap[newKey2] + quantity : quantity
    });

    twoCharMap = Object.assign(currentInsertionMap, {})


    currentIteration++;
  }
}

const runSolution = (numSteps) => {
  letterCounts = {};
  insertionMap = {};
  twoCharMap = {};

  readInputFile(false)

  runInsertions2(numSteps)


  console.log('------answer-------')
  const answer = Math.max(...Object.values(letterCounts)) - Math.min(...Object.values(letterCounts))
  console.log(answer)
}

runSolution(10);
runSolution(40); 

