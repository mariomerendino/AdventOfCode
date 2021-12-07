const fs = require('fs');

const run = () => {
  fs.readFile('input.txt', 'utf8' , (_err, data) => {
    let lanternFish = data.split(',').map((el) => parseInt(el));
    let days = 0
    // Maps the count of fish to an array.
    // If a lanternFish has an internal timer of 0, it will be represented in the array as fishinArray[0] = 1
    let fishInArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    lanternFish.forEach((fish) => {
      fishInArray[fish] = fishInArray[fish] + 1;
    })

    let temporary = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    while (days != 256){
      let temp_at_zero = 0;

      for(let i = 0; i < 9; i++) {
        if (i == 0) {
          temp_at_zero = fishInArray[i];
          temporary[i] = fishInArray[1];
        } else {
          let addedValue = fishInArray[i+1] ? fishInArray[i+1] : 0
          temporary[i] = addedValue + temporary[i]
          if (i == 6 || i == 8) {
            temporary[i] = temporary[i] + temp_at_zero
          }
        }
      }

      fishInArray = temporary;
      temporary = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      days++;
    }
    let sum = 0
    // ugh. I have to learn reduce :(
    fishInArray.forEach((y) => {
      sum = sum + y;
    })
  });
};

run();
