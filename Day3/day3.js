const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const arrayOfInputs = data.split("\n")
  //partOne(arrayOfInputs)
  partTwo(arrayOfInputs)
})

const partTwo = (arrayOfInputs) => {
  const lengthOfEachInput = arrayOfInputs[0].length;
  let possibleO2 = arrayOfInputs;
  let possibleCO2 = arrayOfInputs;

  let O2Binary = ''
  let CO2Binary = ''

  let bitCount = [0, 0]

  for(let i = 0; i < lengthOfEachInput; i++) {
    for(let j = 0; j < possibleO2.length; j++) {
      let bit = possibleO2[j].charAt(i)
      bitCount[parseInt(bit)] = bitCount[parseInt(bit)] + 1;
    }

    let morePopular = bitCount[1] >= bitCount[0]  ? '1' : '0'
    possibleO2 = possibleO2.filter((possible) => possible.charAt(i) == morePopular)
    if(possibleO2.length == 1) {
      O2Binary = possibleO2[0];
      break;
    }
    bitCount = [0, 0]

  }

  bitCount = [0, 0]

  for(let i = 0; i < lengthOfEachInput; i++) {
    for(let j = 0; j < possibleCO2.length; j++) {
      let bit = possibleCO2[j].charAt(i)
      bitCount[parseInt(bit)] = bitCount[parseInt(bit)] + 1;
    }

    let lessPopular = bitCount[1] < bitCount[0]  ? '1' : '0'
    possibleCO2 = possibleCO2.filter((possible) => possible.charAt(i) == lessPopular)
    if(possibleCO2.length == 1) {
      CO2Binary = possibleCO2[0];
      break;
    }
    bitCount = [0, 0]

  }

  console.log(convertBinaryToDecimal(O2Binary) * convertBinaryToDecimal(CO2Binary));
};

const partOne = (arrayOfInputs) => {
  const lengthOfEachInput = arrayOfInputs[0].length;
  let map = {}

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

  const gamma = buildBinaray(map, lengthOfEachInput);
  const epsilon = invertBinary(gamma);

  console.log(gamma);
  console.log(epsilon);

  console.log(convertBinaryToDecimal(gamma) * convertBinaryToDecimal(epsilon));
}

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