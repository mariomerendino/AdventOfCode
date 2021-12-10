const fs = require('fs');

const runPart1 = () => {
  const uniqueInputs = {
    2: '1',
    3: '7',
    4: '4',
    7: '8',
  }

  fs.readFile('input.txt', 'utf8' , (_err, data) => {
    const lines = data.split('\n')
    const outputArray = []
    lines.forEach((line) => {
      outputArray.push(line.split(' | ')[1]);
    })
    const eachOutputDigit = []
    outputArray.forEach((output) => {
      eachOutputDigit.push(...output.split(' '))
    });

    let sum = 0;
    eachOutputDigit.forEach((digit) => {
      if (uniqueInputs[digit.length]) {
        sum++;
      }
    })
    console.log(sum);
  });
};

const runPart2 = () => {
  // if an output only has 2 digits, it must be a 1. 
  const uniqueInputs = {
    2: '1',
    3: '7',
    4: '4',
    7: '8',
  }

  fs.readFile('input.txt', 'utf8' , (_err, data) => {
    const lines = data.split('\n');
    let input;
    let output;
    let inputDigitStrings;
    let totalSum = 0;

    lines.forEach((line) => {
      let conversionMap = {};
      let arrayOfArrays = []
      input = line.split(' | ')[0];
      output = line.split(' | ')[1];

      inputDigitStrings = input.split(' ')
      outputDigitStrings = output.split(' ')
      console.log(outputDigitStrings)

      inputDigitStrings.forEach((inputDigitString) => {
        if(uniqueInputs[inputDigitString.length]) {
          conversionMap[inputDigitString] = uniqueInputs[inputDigitString.length]
        }
      });

      let string1 = getKeyByValue(conversionMap, '1').split('');
      let string4 = getKeyByValue(conversionMap, '4').split('');

      inputDigitStrings.forEach((inputDigitString) => {
        if (inputDigitString.length == 6) { 
          let is9 = false
          let is0 = false;
          for(let i = 0; i < string4.length; i++) {
            if (inputDigitString.includes(string4[i])) {
              is9 = true
            } else { 
              is9 = false;
              break;
            }
          }
          if (is9) { 
            conversionMap[inputDigitString] = '9'
          } else {
            for(let i = 0; i < string1.length; i++) {
              if(inputDigitString.includes(string1[i])) {
                is0 = true;
              } else { 
                is0 = false;
                break;
              }
            }
            if (is0) { 
              conversionMap[inputDigitString] = '0'
            } else {
              conversionMap[inputDigitString] = '6'
            }
          }

        }
      });

      let string9 = getKeyByValue(conversionMap, '9').split('');
      inputDigitStrings.forEach((inputDigitString) => {
        if (inputDigitString.length == 5) {
          let is5 = false
          let is3 = false;
          for(let i = 0; i < string1.length; i++) {
            if(inputDigitString.includes(string1[i])) {
              is3 = true;
            } else { 
              is3 = false;
              break;
            }
          }

          if (is3) {
            conversionMap[inputDigitString] = '3'
          } else {
            let failCount = 0
            for(let i = 0; i < string9.length; i++) {
              if (inputDigitString.includes(string9[i])) {
                is5 = true
              }
              else {
                failCount++;
              }
              if (failCount > 1) {
                is5 = false;
                break;
              }
            }
            
            if (is5) {
              conversionMap[inputDigitString] = '5'
            } else {
              conversionMap[inputDigitString] = '2'
            }
          }
        }
      });

      for(let i =0; i < 10; i++) {
        arrayOfArrays.push(getKeyByValue(conversionMap, i.toString()).split(''))
      }

      let number = '';
      arrayOfArrays.forEach((array) => {
        console.log(array)
      })


      outputDigitStrings.forEach((outputDigitString) => {
        let numFound = false; 
        for(let i = 0; i < arrayOfArrays.length; i++) {
          for(let j = 0; j < arrayOfArrays[i].length; j++) {
            if(outputDigitString.length != arrayOfArrays[i].length) {
              break;
            }
            numFound = true
            if (!outputDigitString.includes(arrayOfArrays[i][j])) {
              numFound = false; 
              break;
            }
          }
          if (numFound) {
            console.log(i)
            number = number + i.toString(); 
            break;
          }
        }
      });
      totalSum = totalSum + parseInt(number);
    });

    console.log(totalSum)
  });
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

runPart2();