// array of zeros
var gameGrid = Array(22).fill(null).map(function () { return Array(10).fill('0'); });
var score = 0;
var curPiece;
var colorLibrary = {};
// clear line function (row index) slice the row out and create a new row of zeros at the end
// gameGrid[5] = Array(10).fill('1'); //testing
var Block = /** @class */ (function () {
    function Block(color, posInPiece, isImportant, id) {
        // assignments
        this.color = color;
        this.isImportant = isImportant;
        this.id = "b" + posInPiece + "-" + id; // example: "bC-36b8f84d-df4e-4d49-b662-bcde71a8764f"
        this.posInPiece = posInPiece;
        this.blockElement = document.createElement("div");
        this.position = [21, 4]; //center top of the game grid
        // block element setup
        this.blockElement.className = "block";
        this.blockElement.id = this.id;
        this.blockElement.style.backgroundColor = this.color;
        colorLibrary[this.id] = this.color;
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
    };
    Block.prototype.right = function () {
        gameGrid[this.position[0]][this.position[1]] = "0";
        this.position[1]--;
    };
    Block.prototype.left = function () {
        gameGrid[this.position[0]][this.position[1]] = "0";
        this.position[1]++;
    };
    Block.prototype.rotate = function (center) {
        var offsetX = this.position[0] - center[0]; // X offset from center
        var offsetY = this.position[1] - center[1]; // Y offset from center
        gameGrid[this.position[0]][this.position[1]] = "0"; // Clear old position on the grid
        this.position[0] = center[0] + offsetY;
        this.position[1] = center[1] - offsetX;
    };
    Block.prototype.isBlockUnder = function () {
        if (0 == this.position[0])
            return true;
        if (this.id.slice(3) === gameGrid[this.position[0] - 1][this.position[1]].slice(3))
            return false;
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
        this.id = crypto.randomUUID();
        this.type = type;
        this.isMoving = true;
        this.buildPiece();
        this.eventNumber = setInterval(function () { return _this.dropPiece(); }, 1000);
    }
    Piece.prototype.buildPiece = function () {
        switch (this.type) {
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
                checkFullLine();
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
            var nextBlockId = (gameGrid[block.getPosition()[0]][block.getPosition()[1] - 1]);
            if (nextBlockId != "0")
                if (nextBlockId.slice(3) != this.id)
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
            var nextBlockId = (gameGrid[block.getPosition()[0]][block.getPosition()[1] + 1]);
            if (nextBlockId != "0")
                if (nextBlockId.slice(3) != this.id)
                    return;
        }
        this.blocks.forEach(function (block) { return block.left(); });
        this.blocks.forEach(function (block) { return block.renderBlock(); });
    };
    Piece.prototype.rotatePiece = function () {
        var centerBlock = this.blocks[1].getPosition();
        this.blocks.forEach(function (block) { block.rotate(centerBlock); });
        this.blocks.forEach(function (block) { return block.renderBlock(); });
    };
    return Piece;
}());
function clearLine(row) {
    gameGrid.splice(row, 1); // remove the row
    gameGrid.push(Array(10).fill("0")); // add a new row at the bottom
    score++;
}
function checkFullLine() {
    gameGrid.forEach(function (row, rowIndex) {
        if (row.every(function (cell) { return cell != "0"; }))
            clearLine(rowIndex);
    });
}
function renderGridToHTML(grid) {
    var html = "<table>";
    grid.forEach(function (row) {
        html += "<tr>";
        row.forEach(function (cell) {
            html += "<td style=\"background-color:" + colorLibrary[cell] + ";\"></td>";
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
        if (event.key === "d")
            curPiece.movePieceRight();
        if (event.key === "a")
            curPiece.movePieceLeft();
        if (event.key === "s")
            curPiece.dropPiece();
        if (event.key === "e")
            curPiece.rotatePiece();
    });
}
main();
//conflicted
