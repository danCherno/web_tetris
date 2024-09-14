// array of zeros
const gameGrid: string[][] = Array.from({ length: 22 }, () => Array(10).fill('0'));
let score: number = 0;
// console.log(gameGrid); // testing
// clear line function (row index) slice the row out and create a new row of zeros at the end
// gameGrid[5] = Array(10).fill('1'); //testing

class Block
{
  // properties
  private color: string;  // color of the block
  private isImportant: boolean; // whether the block is checked for isBlockUnder
  private id: string; // unique id for the block (used a lot for grid)
  private blockElement: HTMLElement; // the block element in the DOM
  private posInPiece: string; // position of the block in the piece (A-D)
  private position: [number, number]; // position of the block in the game grid (x, y)

  constructor(color: string, posInPiece: string, isImportant: boolean) 
  {
    // assignments
    this.color = color;
    this.isImportant = isImportant;
    this.id = `b${posInPiece}-${crypto.randomUUID()}`; // example: "bC-36b8f84d-df4e-4d49-b662-bcde71a8764f"
    this.posInPiece = posInPiece;
    this.blockElement = document.createElement('div');
    this.position = [5, 22]; //center top of the game grid


    // block element setup
    this.blockElement.className = `block`;
    this.blockElement.id = this.id;
    this.blockElement.style.backgroundColor = this.color;
    document.getElementById('gameLayout')!.appendChild(this.blockElement); // adding block to the game layout (fyi, ! is for ignoring null values)
    
    // getters

    function getColor(): string
    {
      return this.color;
    }

    function getIsImportant(): boolean
    {
      return this.isImportant;
    }

    function getId(): string
    {
      return this.id;
    }

    function getBlockElement(): HTMLElement
    {
      return this.blockElement;
    }

    function getPosition(): [number, number]
    {
      return this.position;
    }

    function getPositionInPiece(): string
    {
      return this.posInPiece;
    }

    // methods

    function fall(): void
    {
      gameGrid[this.position[0]][this.position[1]] = '0';
      this.position[1]--;
      gameGrid[this.position[0]][this.position[1]] = this.id;

      //todo: update for css grid
    }

    function right(): void
    {
      gameGrid[this.position[0]][this.position[1]] = '0';
      this.position[0]--;
      gameGrid[this.position[0]][this.position[1]] = this.id;

      //todo: update for css grid
    }

    function left(): void
    {
      gameGrid[this.position[0]][this.position[1]] = '0';
      this.position[0]++;
      gameGrid[this.position[0]][this.position[1]] = this.id;

      //todo: update for css grid
    }

    function isBlockUnder(): boolean
    {
      if (!isImportant) return false;
      if (gameGrid[this.position[0] - 1][this.position[1]] !== '0') return true;
      return false;
    }
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





