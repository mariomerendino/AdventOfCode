const fs = require('fs');

const versionIntegers = [];

const HexConverterHash = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  'A': '1010',
  'B': '1011',
  'C': '1100',
  'D': '1101',
  'E': '1110',
  'F': '1111',
}

// Returns hex from 
const readInputFile = (test, testInputFileNum) => {
  let path = test ? `testinput${testInputFileNum}.txt` : 'input.txt';
  let data = fs.readFileSync(path, 'utf8');
  return data;
}

const convertBinaryToDecimal = (binaryStr) => {
  return (parseInt(binaryStr, 2));
};

const convertHexToBinary = (hexStr) => {
  let binaryStr = '';
  for(let i = 0; i < hexStr.length; i++){
    binaryStr = binaryStr + HexConverterHash[hexStr.charAt(i)];
  }
  return binaryStr;
};

const handelLiteralValue = (binaryString) => {
  let literalValue = ''
  let atTheEnd = false
  let currentIndex = 6;

  while(!atTheEnd) {
    const fiveBitSlice = binaryString.slice(currentIndex, currentIndex + 5);
    literalValue = literalValue + fiveBitSlice.slice(1, 5);
    currentIndex += 5
    if (fiveBitSlice.charAt(0) == '0') {
      atTheEnd = true;
    }
  }


  return currentIndex;
}

const interpretBinary = (binaryString) => {
  console.log(binaryString)
  let versionBits = binaryString.slice(0, 3)
  let versionInt = convertBinaryToDecimal(`0${versionBits}`)
  versionIntegers.push(versionInt)
  let typeBits = binaryString.slice(3, 6)

  if (convertBinaryToDecimal(`0${typeBits}`) == 4) {
    console.log('calculating literal');
    return handelLiteralValue(binaryString)
  } else {
    if(binaryString.charAt(6) == '1') {
      const numberOfSubPackets = convertBinaryToDecimal(binaryString.slice(7, 7 + 11));
      console.log('number of subpackets: ',numberOfSubPackets )
      let currentIndex = 18
      for(let i = 0; i < numberOfSubPackets; i++) {
       let tempBinaryString = binaryString.slice(currentIndex, binaryString.length -1);
       currentIndex = interpretBinary(tempBinaryString) + currentIndex;
      }
    }
    else {
      const totalLengthOfSubPackets = convertBinaryToDecimal(binaryString.slice(7, 7 + 15));
      console.log('length of subpackets: ',totalLengthOfSubPackets )
      let currentIndex = 22
      while(currentIndex - 22 < totalLengthOfSubPackets) {
        currentIndex = interpretBinary(binaryString.slice(currentIndex,  binaryString.length -1)) + currentIndex
      }
    }
  }
}

const runPart1 = () => {
  const hexValue = readInputFile(true, '5');
  const binaryValue = convertHexToBinary(hexValue);
  interpretBinary(binaryValue)

  console.log(versionIntegers.reduce((a, b) => (a + b), 0));

  
  debugger
}

runPart1();