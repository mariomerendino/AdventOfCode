const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const arrayOfInputs = data.split("\n")
  const lengthOfEachInput = arrayOfInputs[0].length;
  map = {}

  arrayOfInputs.forEach((input) => {
    for(let i = 0; i < lengthOfEachInput; i++) {
      currentValue = input.charAt(i);
      oppositeValue = currentValue == '0' ? '1' : '0'
      if (map[i] == undefined){
        map[i] = {};
        map[i][currentValue] = 1;
        map[i][oppositeValue] = 0;
      }
      else {
        map[i][currentValue] = map[i][currentValue] + 1;
      }
    }
  })
  console.log(map)

  const gamma = buildBinaray(map, lengthOfEachInput);
  console.log(gamma);
  const epsilon = invertBinary(gamma);
  console.log(epsilon);
  console.log(convertBinaryToDecimal(gamma) * convertBinaryToDecimal(epsilon));
})

const buildBinaray = (map, length) => {
  let string = ''
  for(let i = 0; i < length; i++) { 
    if (map[i][0] > map[i][1]) {
      string = string + '0' 
    }
    else {
      string = string + '1' 
    }
  }
  return string;
}

const invertBinary = (string) => {
  let newString = '';
  for(let i = 0; i < string.length; i++) {
    let oppositeValue = string.charAt(i) == '0' ? '1' : '0'
    newString = newString + oppositeValue;
  }
  return newString;
}

const convertBinaryToDecimal = (binary) => {
  return parseInt(binary, 2)
}