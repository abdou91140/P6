class Map {
    constructor(boardSize) {
        this.board = [];
        this.boardSize = boardSize;
    }
    // fonction qui créer un array y dans un array x dans l'array this.board qui devient l'objet Cell, avec les proprietés des élément de la carte.
    generateEmptyBoard() {
        for (let x = 0; x < this.boardSize; x++) {
            this.board[x] = [];
            for (let y = 0; y < this.boardSize; y++) {
                this.board[x][y] = new Cell(cellTypes.normal, null, null, null, x, y, "../images/white_square.jpg");
            }
        }
    }
    placeObstacleOnBoard(numberOfObstacles) {
        let i = 0;
        while (i < numberOfObstacles) {
            let randomNumberFor = this.randomNumberForXY();
            let cellObstacle = this.board[randomNumberFor.x][randomNumberFor.y];
            if (cellObstacle.type === cellTypes.normal) {
                cellObstacle.type = cellTypes.obstacle;
                i++;
            }
        } //console.log(this.board)
        return i;
    }
    placeFightersOnBoard(fightersArr) {
        fightersArr.forEach(fighter => {
            while (true) {
                let randomNumberFor = this.randomNumberForXY();
                let cell = this.board[randomNumberFor.x][randomNumberFor.y];
                fighter.x = this.board[randomNumberFor.x][randomNumberFor.y].x;
                fighter.y = this.board[randomNumberFor.x][randomNumberFor.y].y;

                if (cell.type === cellTypes.normal && cell.fighter === null && fighter.x >= 0 && fighter.x !== cell.x + 1 && fighter.x !== cell.x - 1 && fighter.y !== cell.y + 1 && fighter.y !== cell.y - 1) {
                    this.board[randomNumberFor.x][randomNumberFor.y].fighter = fighter;
                    // console.log(fighter)
                    break
                } else {
                    location.reload()
                }
            }
        }); // console.log(this.board)
    }
    placeWeaponsOnBoard(weaponsArr) {
        weaponsArr.forEach(weapon => {
            while (true) {
                let randomNumberFor = this.randomNumberForXY();
                let cell = this.board[randomNumberFor.x][randomNumberFor.y];
                if (cell.type === cellTypes.normal && cell.weapon === null && cell.fighter === null) {
                    this.board[randomNumberFor.x][randomNumberFor.y].weapon = weapon;
                    weapon.x = this.board[randomNumberFor.x][randomNumberFor.y].x;
                    weapon.y = this.board[randomNumberFor.x][randomNumberFor.y].y;
                    break
                }
            }
        }); // console.log(this.board)
    }



randomNumberForXY() {
        let numberX = Math.floor(Math.random() * this.boardSize);
        let numberY = Math.floor(Math.random() * this.boardSize);
        return {
            x: numberX,
            y: numberY
        }
    }
   
    printOnload() {
        for (let x = 0; x < this.boardSize; x++) {
            var rowCell = $("<div class='column'></div>").attr("id", cellInRowX)
            for (let y = 0; y < this.boardSize; y++) {
                var cellInRow = this.board[x][y];
                var cellInRowX = this.board[x][y].x.valueOf();
                var cellInRowY = this.board[x][y].y.valueOf();
                rowCell.append(function () {
                    let cellContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + cellInRow.img + ">" + "</div>";
                    let imgObstacle = "<img src='../images/red_square.jpg' alt='Obstacle'></img>";

                    if (cellInRow.type === cellTypes.obstacle) {
                        cellContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + imgObstacle + "</div>";
                    }
                    if (cellInRow.weapon instanceof Weapon) {
                        cellContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + "../images/" + cellInRow.weapon.img + ">" + "</div>";
                    }
                    if (cellInRow.fighter instanceof Fighter) {
                        cellContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + "../images/" + cellInRow.fighter.img + ">" + "</div>";
                    }
                    return cellContent

                })
                $("#base").append(rowCell)

            }
        }
    };
}
var mapGenerate = new Map(9);
mapGenerate.generateEmptyBoard();
mapGenerate.placeObstacleOnBoard(9);
mapGenerate.placeFightersOnBoard(fightersArr);
mapGenerate.placeWeaponsOnBoard(weaponsArr);
mapGenerate.randomNumberForXY();
mapGenerate.printOnload();