// array of zeros
const gameGrid: string[][] = Array.from({ length: 22 }, () => Array(10).fill('0'));
let score: number = 0;
// console.log(gameGrid); // testing
// clear line function (row index) slice the row out and create a new row of zeros at the end
// gameGrid[5] = Array(10).fill('1'); //testing
function clearLine(row: number): void {
  gameGrid.splice(row, 1);
  gameGrid.push(Array(10).fill('1'));
  score++;
}
console.log(gameGrid);
// clearLine(5); //testing

// render main







