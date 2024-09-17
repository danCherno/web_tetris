// array of zeros
var gameGrid = Array(22).fill(null).map(function () { return Array(10).fill('0'); });
var score = 0;
var curPiece;
// clear line function (row index) slice the row out and create a new row of zeros at the end
// gameGrid[5] = Array(10).fill('1'); //testing
var Block = /** @class */ (function () {
    function Block(color, posInPiece, isImportant) {
        // assignments
        this.color = color;
        this.isImportant = isImportant;
        this.id = "b" + posInPiece + "-" + crypto.randomUUID(); // example: "bC-36b8f84d-df4e-4d49-b662-bcde71a8764f"
        this.posInPiece = posInPiece;
        this.blockElement = document.createElement("div");
        this.position = [21, 4]; //center top of the game grid
        // block element setup
        this.blockElement.className = "block";
        this.blockElement.id = this.id;
        this.blockElement.style.backgroundColor = this.color;
        document.getElementById("gameLayout").appendChild(this.blockElement); // adding block to the game layout (fyi, ! is for ignoring null values)
    }
    // getters
    Block.prototype.getColor = function () {
        return this.color;
    };
    Block.prototype.getIsImportant = function () {
        return this.isImportant;
    };
    Block.prototype.getId = function () {
        return this.id;
    };
    Block.prototype.getBlockElement = function () {
        return this.blockElement;
    };
    Block.prototype.getPosition = function () {
        return this.position;
    };
    Block.prototype.getPositionInPiece = function () {
        return this.posInPiece;
    };
    // methods
    Block.prototype.down = function () {
        gameGrid[this.position[0]][this.position[1]] = "0";
        this.position[0]--;
        //todo: update for css grid
    };
    Block.prototype.right = function () {
        gameGrid[this.position[0]][this.position[1]] = "0";
        this.position[1]--;
        //todo: update for css grid
    };
    Block.prototype.left = function () {
        gameGrid[this.position[0]][this.position[1]] = "0";
        this.position[1]++;
        //todo: update for css grid
    };
    Block.prototype.isBlockUnder = function () {
        if (!this.isImportant)
            return false;
        if (0 == this.position[0])
            return true;
        if (gameGrid[this.position[0] - 1][this.position[1]] != "0")
            return true;
        return false;
    };
    Block.prototype.renderBlock = function () {
        gameGrid[this.position[0]][this.position[1]] = this.id;
        document.getElementById("gameLayout").innerHTML = renderGridToHTML(gameGrid);
    };
    return Block;
}());
var Piece = /** @class */ (function () {
    function Piece(type) {
        var _this = this;
        this.type = type;
        this.buildPiece();
        this.isMoving = true;
        this.eventNumber = setInterval(function () { return _this.dropPiece(); }, 1000);
    }
    Piece.prototype.buildPiece = function () {
        switch (this.type) {
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
    };
    Piece.prototype.dropPiece = function () {
        this.landPiece();
        if (!this.isMoving)
            return;
        this.blocks.forEach(function (block) { return block.down(); });
        this.blocks.forEach(function (block) { return block.renderBlock(); });
    };
    Piece.prototype.landPiece = function () {
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            if (block.isBlockUnder()) {
                this.isMoving = false;
                clearInterval(this.eventNumber);
                curPiece = generatePiece();
                return;
            }
        }
        ;
    };
    Piece.prototype.movePieceLeft = function () {
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            if (block.getPosition()[1] == 0)
                return;
        }
        this.blocks.forEach(function (block) { return block.right(); });
        this.blocks.forEach(function (block) { return block.renderBlock(); });
    };
    Piece.prototype.movePieceRight = function () {
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            if (block.getPosition()[1] == 9)
                return;
        }
        this.blocks.forEach(function (block) { return block.left(); });
        this.blocks.forEach(function (block) { return block.renderBlock(); });
    };
    return Piece;
}());
function clearLine(row) {
    gameGrid.splice(row, 1);
    gameGrid.push(Array(10).fill("1"));
    score++;
}
function renderGridToHTML(grid) {
    var html = "<table>";
    grid.forEach(function (row) {
        html += "<tr>";
        row.forEach(function (cell) {
            html += "<td>" + cell + "</td>";
        });
        html += "</tr>";
    });
    html += "</table>";
    return html;
}
function generatePiece() {
    var pieces = ["I", "Z", "S", "L", "J", "O", "T"];
    var randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return new Piece(randomPiece);
}
function main() {
    curPiece = generatePiece();
    // movement key listeners
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight")
            curPiece.movePieceRight();
        if (event.key === "ArrowLeft")
            curPiece.movePieceLeft();
        if (event.key === "ArrowDown")
            curPiece.dropPiece();
    });
}
main();
//document.getElementById("gameLayout")!.innerHTML = renderGridToHTML(gameGrid);
// clearLine(5); //testing
// render main
