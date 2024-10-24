// array of zeros
const gameGrid: string[][] = Array(22).fill(null).map(() => Array(10).fill('0'));
let score: number = 0;
let curPiece: Piece;
const colorLibrary = {} ;

// clear line function (row index) slice the row out and create a new row of zeros at the end
// gameGrid[5] = Array(10).fill('1'); //testing

class Block
{
  // properties
  private color: string; // color of the block
  private isImportant: boolean; // whether the block is checked for isBlockUnder
  private id: string; // unique id of the piece (used a lot for grid)
  private blockElement: HTMLElement; // the block element in the DOM
  private posInPiece: string; // position of the block in the piece (A-D)
  private position: [number, number]; // position of the block in the game grid (x, y)

  constructor(color: string, posInPiece: string, isImportant: boolean, id: string) {
    // assignments
    this.color = color;
    this.isImportant = isImportant;
    this.id = `b${posInPiece}-${id}`; // example: "bC-36b8f84d-df4e-4d49-b662-bcde71a8764f"
    this.posInPiece = posInPiece;
    this.blockElement = document.createElement("div");
    this.position = [21, 4]; //center top of the game grid

    // block element setup
    this.blockElement.className = `block`;
    this.blockElement.id = this.id;
    this.blockElement.style.backgroundColor = this.color;
    colorLibrary[this.id] = this.color
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
    this.position[0]--;
  }

  right(): void {
    gameGrid[this.position[0]][this.position[1]] = "0";
    this.position[1]--;
  }

  left(): void {
    gameGrid[this.position[0]][this.position[1]] = "0";
    this.position[1]++;

  }

  rotate(center: [number, number]): void 
{
    const offsetX = this.position[0] - center[0]; // X offset from center
    const offsetY = this.position[1] - center[1]; // Y offset from center

    gameGrid[this.position[0]][this.position[1]] = "0"; // Clear old position on the grid

    this.position[0] = center[0] + offsetY;
    this.position[1] = center[1] - offsetX;
  }


  isBlockUnder(): boolean {
    if (0 == this.position[0]) return true;
    if (this.id.slice(3) === gameGrid[this.position[0] - 1][this.position[1]].slice(3)) return false;
    if (gameGrid[this.position[0] - 1][this.position[1]] != "0") return true;
    return false;
  }

  renderBlock(): void 
  {
    gameGrid[this.position[0]][this.position[1]] = this.id;
    document.getElementById("gameLayout")!.innerHTML = renderGridToHTML(gameGrid);
  }
}

class Piece
{
  // properties
  type: string;
  blocks: Block[];
  isMoving: boolean;
  private id: string;
  private eventNumber: number;

  constructor(type: string) 
  {
    this.id = crypto.randomUUID();
    this.type = type;
    this.isMoving = true;
    this.buildPiece();
    this.eventNumber = setInterval(() => this.dropPiece(), 1000);
  }

  buildPiece(): void
  {
    switch (this.type)
    {
      /* XXXX */
      case "I":
        this.blocks = [
          new Block("blue", "A", false, this.id),
          new Block("blue", "B", false, this.id),
          new Block("blue", "C", false, this.id),
          new Block("blue", "D", true, this.id),
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
          new Block("purple", "A", true, this.id),
          new Block("purple", "B", false, this.id),
          new Block("purple", "C", true, this.id),
          new Block("purple", "D", true, this.id),
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
          new Block("green", "A", false, this.id),
          new Block("green", "B", true, this.id),
          new Block("green", "C", true, this.id),
          new Block("green", "D", true, this.id),
        ];

        this.blocks[1].right();

        this.blocks[2].down();
        this.blocks[2].left();

        this.blocks[3].down();

        break;

      /*    X
          XXX */
      case "L":
        this.blocks = [
          new Block("orange", "A", false, this.id),
          new Block("orange", "B", false, this.id),
          new Block("orange", "C", true, this.id),
          new Block("orange", "D", true, this.id),
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
          new Block("cyan", "A", false, this.id),
          new Block("cyan", "B", false, this.id),
          new Block("cyan", "C", true, this.id),
          new Block("cyan", "D", true, this.id),
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
          new Block("yellow", "A", false, this.id),
          new Block("yellow", "B", false, this.id),
          new Block("yellow", "C", true, this.id),
          new Block("yellow", "D", true, this.id),
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
          new Block("red", "A", true, this.id),
          new Block("red", "B", false, this.id),
          new Block("red", "C", true, this.id),
          new Block("red", "D", true, this.id),
        ];

        this.blocks[0].left();

        this.blocks[2].right();
        this.blocks[3].down();

        break;
    }
  }

  dropPiece(): void 
  {
    this.landPiece();
    if (!this.isMoving) return;

    this.blocks.forEach((block) => block.down());
    this.blocks.forEach((block) => block.renderBlock());
  }

  landPiece(): void 
  {
    for (let block of this.blocks)
    {
      if (block.isBlockUnder())
        {
          this.isMoving = false;
          clearInterval(this.eventNumber);
          curPiece = generatePiece();
          checkFullLine();
          return;
        }
      };
  }
  movePieceLeft(): void 
  {
    for (let block of this.blocks)
    {
      if (block.getPosition()[1] == 0) return;
      const nextBlockId = (gameGrid[block.getPosition()[0]][block.getPosition()[1] - 1]);
      if (nextBlockId !="0") if (nextBlockId.slice(3) != this.id) return;
    }

    this.blocks.forEach((block) => block.right());
    this.blocks.forEach((block) => block.renderBlock());
  }

  movePieceRight(): void
  {
    for (let block of this.blocks)
    {
      if (block.getPosition()[1] == 9) return;
      const nextBlockId = (gameGrid[block.getPosition()[0]][block.getPosition()[1] + 1]);
      if (nextBlockId !="0") if (nextBlockId.slice(3) != this.id) return;
    }

    this.blocks.forEach((block) => block.left());
    this.blocks.forEach((block) => block.renderBlock());
  }
  rotatePiece(): void
  {
    const centerBlock = this.blocks[1].getPosition();

    this.blocks.forEach((block) => {block.rotate(centerBlock); });

    this.blocks.forEach((block) => block.renderBlock());
  }
}

function clearLine(row: number): void {
  gameGrid.splice(row, 1); // remove the row
  gameGrid.push(Array(10).fill("0")); // add a new row at the bottom
  score++;
}

function checkFullLine(): void
{
  gameGrid.forEach((row, rowIndex) => 
  {
    if (row.every((cell) => cell != "0")) clearLine(rowIndex);
  });
}

function renderGridToHTML(grid: string[][]): string {
  let html = "<table>";
  grid.forEach((row) => {
    html += "<tr>";
    row.forEach((cell) => {
      html += `<td style="background-color:${colorLibrary[cell]};"></td>`;
    });
    html += "</tr>";
  });
  html += "</table>";
  return html;
}

function generatePiece(): Piece
{
  const pieces = ["I", "Z", "S", "L", "J", "O", "T"];
  const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
  return new Piece(randomPiece);
}


function main(): void
{
  curPiece = generatePiece();
  // movement key listeners
  document.addEventListener("keydown", (event) => {
    if (event.key === "d") curPiece!.movePieceRight();
    if (event.key === "a") curPiece!.movePieceLeft();
    if (event.key === "s") curPiece!.dropPiece();
    if (event.key === "e") curPiece!.rotatePiece();
  });
}
main();


//hi!