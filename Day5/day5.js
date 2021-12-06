const fs = require('fs')

class Line { 
  // Each point is an array of 2 integers in x, y format. 
  constructor (point1, point2) {
    this.point1 = point1;
    this.point2 = point2; 
  }

  allPointsInLine () {
    const points = [];
    //horizontal Line,
    if (this.point1[0] == this.point2[0]) {
      let smaller = Math.min(this.point1[1], this.point2[1])
      let bigger = Math.max(this.point1[1], this.point2[1])

      for(let i = smaller; i <= bigger; i++) {
        points.push([this.point1[0], i])
      }
    }
    //vertical line
    else if (this.point1[1] == this.point2[1]){
      let smaller = Math.min(this.point1[0], this.point2[0])
      let bigger = Math.max(this.point1[0], this.point2[0])
      
      for(let i = smaller; i <= bigger; i++) {
        points.push([i, this.point1[1]])
      }
    } 
    // diagonals.
    else {
      let distance = Math.abs(this.point1[0] - this.point2[0]);
      let iterator = 0;
      let pointWithSmallerX = this.point1[0] < this.point2[0] ? this.point1 : this.point2 
      let otherPoint = this.point1[0] > this.point2[0] ? this.point1 : this.point2 
      while(iterator <= distance) {
        // diagonal up
        if(pointWithSmallerX[1] > otherPoint[1]) {
          points.push([pointWithSmallerX[0] + iterator, pointWithSmallerX[1] - iterator])

        } else {
          points.push([pointWithSmallerX[0] + iterator, pointWithSmallerX[1] + iterator])
        }
        iterator++;
      }
    }

    return points;
  }
}

const run = () => {
  fs.readFile('input.txt', 'utf8' , (_err, data) => {
    const lines = []
    const fileLines = data.split("\n");
    fileLines.forEach((fileLine) => {
      let coordinates = fileLine.split(' -> ')
      let point1 = coordinates[0].split(',').map((el) => parseInt(el))
      let point2 = coordinates[1].split(',').map((el) => parseInt(el))
      lines.push(new Line(point1, point2))
    })
    const pointsHit = {};

    lines.forEach((line) => {
      let allPoints = line.allPointsInLine();
      if (allPoints.length > 0) {
        allPoints.forEach((point) => {
          let pointString = point.join(',')
          if (pointsHit[pointString]) {
            pointsHit[pointString] = pointsHit[pointString] + 1;
          } else {
            pointsHit[pointString] = 1;
          }
        });
      }
    });

    let counter = 0;

    for (const point in pointsHit) {
      if(pointsHit[point] >= 2) {
        counter++;
      }
    }
    console.log(counter)


  });
};

run();