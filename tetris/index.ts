// array of zeros
const gameGrid: string[][] = Array.from({ length: 22 }, () => Array(10).fill('0'));
let score: number = 0;
// console.log(gameGrid); // testing
// clear line function (row index) slice the row out and create a new row of zeros at the end
// gameGrid[5] = Array(10).fill('1'); //testing

class Block
{
  // properties
  color: string;  // color of the block
  isImportant: boolean; // whether the block is checked for isBlockUnder
  id: string; // unique id for the block (used a lot for grid)
  blockElement: HTMLElement; // the block element in the DOM
  posInPiece: string; // position of the block in the piece (A-D)

  constructor(color: string, posInPiece: string, isImportant: boolean) 
  {
    // assignments
    this.color = color;
    this.isImportant = isImportant;
    this.id = `b${posInPiece}-${crypto.randomUUID()}`; // example: "bC-36b8f84d-df4e-4d49-b662-bcde71a8764f"
    this.posInPiece = posInPiece;
    this.blockElement = document.createElement('div');


    // block element setup
    this.blockElement.className = `block`;
    this.blockElement.id = this.id;
    this.blockElement.style.backgroundColor = this.color;
    document.getElementById('gameLayout')!.appendChild(this.blockElement); // adding block to the game layout (fyi, ! is for ignoring null values)
    

  }
}

function clearLine(row: number): void {
  gameGrid.splice(row, 1);
  gameGrid.push(Array(10).fill('1'));
  score++;
}
console.log(gameGrid);
// clearLine(5); //testing
// render main





