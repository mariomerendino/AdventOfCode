const fs = require('fs');

const openBrackets = [ '[', '(', '{', '<' ]
const validBrackets = {
  '[' : ']',
  '(' : ')',
  '<' : '>',
  '{' : '}',
  '}' : '{',
  ')' : '(',
  ']' : '[',
  '>' : '<',
}

const runPart1 = () => {
  const valueHash = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }
  
  fs.readFile('input.txt', 'utf8' , (_err, data) => {
    const charsByLine = data.split("\n").map((line) => line.split(''))
    let invalidChars = []
    for(let i = 0; i < charsByLine.length; i++) {
      let stack = []
      let chars = charsByLine[i];
      for(let j = 0; j < chars.length; j++){ 
        if (openBrackets.includes(chars[j])) {
          stack.push(chars[j])
        }
        else {
          let lastStackedChar = stack.pop();
          if ( validBrackets[lastStackedChar] == chars[j] ) {

          }
          else {
            invalidChars.push(chars[j])
            break;
          }
        }
      }
      stack = []
    }

    console.log(invalidChars)
    let total = 0;
    invalidChars.forEach((invalidChar) => {
      total = valueHash[invalidChar] + total
    })

    console.log(total);

    
  })
}

const runPart2 = () => {
  const valueHash = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }
  fs.readFile('input.txt', 'utf8' , (_err, data) => {
    const charsByLine = data.split("\n").map((line) => line.split(''))
    let corrupted = false
    let incompleteLines = []
    for(let i = 0; i < charsByLine.length; i++) {
      let stack = []
      let chars = charsByLine[i];
      for(let j = 0; j < chars.length; j++){ 
        if (openBrackets.includes(chars[j])) {
          stack.push(chars[j])
        }
        else {
          let lastStackedChar = stack.pop();
          if ( validBrackets[lastStackedChar] == chars[j] ) {

          }
          else {
            corrupted = true
            break;
          }
        }
      }
      if (corrupted) {
        corrupted = false
      } else {
        incompleteLines.push(charsByLine[i])
      }
      stack = []
    }

    let scores = []

    let stack2 =[]

    for(let i = 0; i < incompleteLines.length; i++) {
      let chars = incompleteLines[i];
      for(let j = 0; j < chars.length; j++){ 
        if (openBrackets.includes(chars[j])) {
          stack2.push(chars[j])
        }
        else {
          let lastStackedChar = stack2.pop();
          if ( validBrackets[lastStackedChar] == chars[j] ) {

          }
        }
      }
      let innerTotal = 0;

      while(stack2.length > 0) {
        innerTotal = innerTotal * 5
        let lastVal = stack2.pop()
        innerTotal = innerTotal + valueHash[validBrackets[lastVal]]
      }
      scores.push(innerTotal);
    }

    scores.sort((a,b) => a -b)

    console.log(scores[parseInt(scores.length/2)])

    
  })
}

runPart2();