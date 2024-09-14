// array of zeros
var gameGrid = Array.from({ length: 22 }, function (_, rowIndex) {
    return Array.from({ length: 10 }, function (_, colIndex) { return rowIndex + "," + colIndex; });
});
var score = 0;
// console.log(gameGrid); // testing
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
        this.position = [5, 22]; //center top of the game grid
        // block element setup
        this.blockElement.className = "block";
        this.blockElement.id = this.id;
        this.blockElement.style.backgroundColor = this.color;
        document.getElementById("gameLayout").appendChild(this.blockElement); // adding block to the game layout (fyi, ! is for ignoring null values)
        // getters
        function getColor() {
            return this.color;
        }
        function getIsImportant() {
            return this.isImportant;
        }
        function getId() {
            return this.id;
        }
        function getBlockElement() {
            return this.blockElement;
        }
        function getPosition() {
            return this.position;
        }
        function getPositionInPiece() {
            return this.posInPiece;
        }
        // methods
        function fall() {
            gameGrid[this.position[0]][this.position[1]] = "0";
            this.position[1]--;
            gameGrid[this.position[0]][this.position[1]] = this.id;
            //todo: update for css grid
        }
        function right() {
            gameGrid[this.position[0]][this.position[1]] = "0";
            this.position[0]--;
            gameGrid[this.position[0]][this.position[1]] = this.id;
            //todo: update for css grid
        }
        function left() {
            gameGrid[this.position[0]][this.position[1]] = "0";
            this.position[0]++;
            gameGrid[this.position[0]][this.position[1]] = this.id;
            //todo: update for css grid
        }
        function isBlockUnder() {
            if (!isImportant)
                return false;
            if (gameGrid[this.position[0] - 1][this.position[1]] !== "0")
                return true;
            return false;
        }
    }
    return Block;
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
console.log(gameGrid);
document.getElementById("gameLayout").innerHTML = renderGridToHTML(gameGrid);
// clearLine(5); //testing
// render main
