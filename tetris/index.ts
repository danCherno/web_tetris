// array of zeros
const gameGrid: string[][] = Array(22).fill(null).map(() => Array(10).fill('0'));
let score: number = 0;
let curPiece: Piece;

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
    this.position = [21, 4]; //center top of the game grid

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
    this.position[0]--;
    //todo: update for css grid
  }

  right(): void {
    gameGrid[this.position[0]][this.position[1]] = "0";
    this.position[1]--;

    //todo: update for css grid
  }

  left(): void {
    gameGrid[this.position[0]][this.position[1]] = "0";
    this.position[1]++;

    //todo: update for css grid
  }

  isBlockUnder(): boolean {
    if (!this.isImportant) return false;
    if (0 == this.position[0]) return true;
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
  private eventNumber: number;

  constructor(type: string) 
  {
    this.type = type;
    this.buildPiece();
    this.isMoving = true;

    this.eventNumber = setInterval(() => this.dropPiece(), 1000);
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
          new Block("purple", "C", true),
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
          new Block("green", "A", false),
          new Block("green", "B", true),
          new Block("green", "C", true),
          new Block("green", "D", true),
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
          return;
        }
      };
  }
  movePieceLeft(): void 
  {
    for (let block of this.blocks)
    {
      if (block.getPosition()[1] == 0) return;
    }

    this.blocks.forEach((block) => block.right());
    this.blocks.forEach((block) => block.renderBlock());
  }

  movePieceRight(): void
  {
    for (let block of this.blocks)
    {
      if (block.getPosition()[1] == 9) return;
    }

    this.blocks.forEach((block) => block.left());
    this.blocks.forEach((block) => block.renderBlock());
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
    if (event.key === "ArrowRight") curPiece!.movePieceRight();
    if (event.key === "ArrowLeft") curPiece!.movePieceLeft();
    if (event.key === "ArrowDown") curPiece!.dropPiece();
  });
}
main();


//document.getElementById("gameLayout")!.innerHTML = renderGridToHTML(gameGrid);

// clearLine(5); //testing

// render main
