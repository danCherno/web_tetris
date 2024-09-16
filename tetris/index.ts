// array of zeros
const gameGrid: string[][] = Array.from({ length: 22 }, (_, rowIndex) =>
  Array.from({ length: 10 }, (_, colIndex) => `${rowIndex},${colIndex}`)
);
let score: number = 0;
// console.log(gameGrid); // testing
// clear line function (row index) slice the row out and create a new row of zeros at the end
// gameGrid[5] = Array(10).fill('1'); //testing

class Block
{
  // properties
  private color: string; // color of the block
  private isImportant: boolean; // whether the block is checked for isBlockUnder
  private id: string; // unique id for the block (used a lot for grid)
  private blockElement: HTMLElement; // the block element in the DOM
  private posInPiece: string; // position of the block in the piece (A-D)
  private position: [number, number]; // position of the block in the game grid (x, y)

  constructor(color: string, posInPiece: string, isImportant: boolean) {
    // assignments
    this.color = color;
    this.isImportant = isImportant;
    this.id = `b${posInPiece}-${crypto.randomUUID()}`; // example: "bC-36b8f84d-df4e-4d49-b662-bcde71a8764f"
    this.posInPiece = posInPiece;
    this.blockElement = document.createElement("div");
    this.position = [5, 22]; //center top of the game grid

    // block element setup
    this.blockElement.className = `block`;
    this.blockElement.id = this.id;
    this.blockElement.style.backgroundColor = this.color;
    document.getElementById("gameLayout")!.appendChild(this.blockElement); // adding block to the game layout (fyi, ! is for ignoring null values)
  }
  // getters

  getColor(): string {
    return this.color;
  }

  getIsImportant(): boolean {
    return this.isImportant;
  }

  getId(): string {
    return this.id;
  }

  getBlockElement(): HTMLElement {
    return this.blockElement;
  }

  getPosition(): [number, number] {
    return this.position;
  }

  getPositionInPiece(): string {
    return this.posInPiece;
  }

  // methods

  down(): void {
    gameGrid[this.position[0]][this.position[1]] = "0";
    this.position[1]--;
    gameGrid[this.position[0]][this.position[1]] = this.id;

    //todo: update for css grid
  }

  right(): void {
    gameGrid[this.position[0]][this.position[1]] = "0";
    this.position[0]--;
    gameGrid[this.position[0]][this.position[1]] = this.id;

    //todo: update for css grid
  }

  left(): void {
    gameGrid[this.position[0]][this.position[1]] = "0";
    this.position[0]++;
    gameGrid[this.position[0]][this.position[1]] = this.id;

    //todo: update for css grid
  }

  isBlockUnder(): boolean {
    if (!this.isImportant) return false;
    if (gameGrid[this.position[0] - 1][this.position[1]] !== "0") return true;
    return false;
  }
}

class Piece
{
  // properties
  type: string;
  blocks: Block[];
  isMoving: boolean;

  constructor(type: string) 
  {
    this.type = type;
    this.buildPiece();
    this.isMoving = true;
  }

  buildPiece(): void
  {
    switch (this.type)
    {
      /* XXXX */
      case "I":
        this.blocks = [
          new Block("blue", "A", false),
          new Block("blue", "B", false),
          new Block("blue", "C", false),
          new Block("blue", "D", true),
        ];

        this.blocks[1].down();

        this.blocks[2].down();
        this.blocks[2].down();

        this.blocks[3].down();
        this.blocks[3].down();
        this.blocks[3].down();

        break;

      /* XX
          XX */
      case "Z":
        this.blocks = [
          new Block("purple", "A", true),
          new Block("purple", "B", false),
          new Block("purple", "C", false),
          new Block("purple", "D", true),
        ];

        this.blocks[0].left();

        this.blocks[2].down();

        this.blocks[3].down();
        this.blocks[3].right();

        break;

      /* XX
        XX  */
      case "S":
        this.blocks = [
          new Block("green", "A", true),
          new Block("green", "B", false),
          new Block("green", "C", false),
          new Block("green", "D", true),
        ];

        this.blocks[1].right();

        this.blocks[2].down();

        this.blocks[3].down();
        this.blocks[3].left();

        break;

      /*    X
          XXX */
      case "L":
        this.blocks = [
          new Block("orange", "A", false),
          new Block("orange", "B", false),
          new Block("orange", "C", true),
          new Block("orange", "D", true),
        ];

        this.blocks[1].down();

        this.blocks[2].down();
        this.blocks[2].down();

        this.blocks[3].down();
        this.blocks[3].down();
        this.blocks[3].right();

        break;

        /* X
           XXX */
      case "J":
        this.blocks = [
          new Block("cyan", "A", false),
          new Block("cyan", "B", false),
          new Block("cyan", "C", true),
          new Block("cyan", "D", true),
        ];

        this.blocks[1].down();

        this.blocks[2].down();
        this.blocks[2].down();

        this.blocks[3].down();
        this.blocks[3].down();
        this.blocks[3].left();

        break;

        /*  XX
            XX */
      case "O":
        this.blocks = [
          new Block("yellow", "A", false),
          new Block("yellow", "B", false),
          new Block("yellow", "C", true),
          new Block("yellow", "D", true),
        ];

        this.blocks[1].right();

        this.blocks[2].down();

        this.blocks[3].down();
        this.blocks[3].right();

        break;
        /* XXX
            X */
case "T":
        this.blocks = [
          new Block("green", "A", true),
          new Block("green", "B", false),
          new Block("green", "C", true),
          new Block("green", "D", true),
        ];

        this.blocks[0].left();

        this.blocks[2].right();

        this.blocks[3].down();

        break;
    }
  }
}

function clearLine(row: number): void {
  gameGrid.splice(row, 1);
  gameGrid.push(Array(10).fill("1"));
  score++;
}
function renderGridToHTML(grid: string[][]): string {
  let html = "<table>";
  grid.forEach((row) => {
    html += "<tr>";
    row.forEach((cell) => {
      html += `<td>${cell}</td>`;
    });
    html += "</tr>";
  });
  html += "</table>";
  return html;
}
console.log(gameGrid);

document.getElementById("gameLayout")!.innerHTML = renderGridToHTML(gameGrid);

// clearLine(5); //testing

// render main
