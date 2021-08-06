// object MAP of creation of the game board. //
class Map {
    constructor(boardSize) {
        this.cells = [];
        this.boardSize = boardSize;
    }
    // method of creation of white cell with integration of coordinates. //
    generateCells() {
        for (let x = 0; x < this.boardSize; x++) {
            this.cells[x] = [];
            for (let y = 0; y < this.boardSize; y++) {
                this.cells[x][y] = new Cell(null, null, null, null, x, y, "./images/white_square.jpg");
            }
        }
    }
    // random placement method of obstacles on the board. //  
    placeObstacleCells(obstacle) {
        let i = 0;
        while (i < 9) {
            let randomNumberXYCell = this.randomNumberXY();
            let cell = this.cells[randomNumberXYCell.x][randomNumberXYCell.y];
            if (cell.obstacle === null) {
                this.cells[randomNumberXYCell.x][randomNumberXYCell.y].obstacle = obstacle;
                obstacle.x = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].x;
                obstacle.y = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].y;
                i++;
            } else {
            }
        }
    }
    // random placement method of Fighters on the board. //  
    placeFighters(fightersArr) {
        let boardSize = this.boardSize;
        fightersArr.forEach(fighter => {
            while (true) {
                let randomNumberXYCell = this.randomNumberXY();
                let cell = this.cells[randomNumberXYCell.x][randomNumberXYCell.y];
                fighter.x = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].x;
                fighter.y = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].y;
                if (cell.obstacle === null && cell.fighter === null) {
                    //if(this.cells[randomNumberXYCell.x][randomNumberXYCell.y] != this.cells[boardSize][randomNumberXYCell.y] || this.cells[randomNumberXYCell.x][randomNumberXYCell.y]  != this.cells[0][randomNumberXYCell.y] || this.cells[randomNumberXYCell.x][randomNumberXYCell.y]  != this.cells[randomNumberXYCell.x][boardSize]|| this.cells[randomNumberXYCell.x][randomNumberXYCell.y]  != this.cells[randomNumberXYCell.x][0]){ 
                    if (this.cells[randomNumberXYCell.x + 1][randomNumberXYCell.y].fighter === null || this.cells[randomNumberXYCell.x - 1][randomNumberXYCell.y].fighter === null || this.cells[randomNumberXYCell.x][randomNumberXYCell.y + 1].fighter === null || this.cell[randomNumberXYCell.x][randomNumberXYCell.y - 1].fighter === null) {
                        cell.fighter = fighter;
                        break
                    }
                    else {

                    }
                }
            }
        });
    }
    // random placement method of Weapons on the board. //  
    placeWeapons(weaponsArr) {
        weaponsArr.forEach(weapon => {
            while (true) {
                let randomNumberXYCell = this.randomNumberXY();
                let cell = this.cells[randomNumberXYCell.x][randomNumberXYCell.y];
                if (cell.obstacle === null && cell.weapon === null && cell.fighter === null) {
                    this.cells[randomNumberXYCell.x][randomNumberXYCell.y].weapon = weapon;
                    weapon.x = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].x;
                    weapon.y = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].y;
                    break
                }
            }
        });
    }
    // random method of coordonates on the board. //  
    randomNumberXY() {
        let randomNumberX = Math.floor(Math.random() * this.boardSize);
        let randomNumberY = Math.floor(Math.random() * this.boardSize);
        return {
            x: randomNumberX,
            y: randomNumberY
        }
    }
    // method of displaying the elements of the board in the DOM. // 
    displayOnScreen() {
        for (let x = 0; x < this.boardSize; x++) {
            var rowCell = $("<div class='column'></div>").attr("id", cellInRowX)
            for (let y = 0; y < this.boardSize; y++) {
                var cellInRow = this.cells[x][y];
                var cellInRowX = this.cells[x][y].x.valueOf();
                var cellInRowY = this.cells[x][y].y.valueOf();
                rowCell.append(function () {
                    let caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + cellInRow.img + ">" + "</div>";
                    if (cellInRow.obstacle) {
                        caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + cellInRow.obstacle.img + ">" + "</div>";
                    }
                    if (cellInRow.weapon instanceof Weapon) {
                        caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + "./images/" + cellInRow.weapon.img + ">" + "</div>";
                    }
                    if (cellInRow.fighter instanceof Fighter) {
                        caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + "./images/" + cellInRow.fighter.img + ">" + "</div>";
                    }
                    return caseContent
                })
                $("#map-game").append(rowCell)
            }
        }
        window.onload = function () {
            document.getElementById("intro").play();
        };
    };
}
var mapGenerate = new Map(9);
mapGenerate.generateCells();
mapGenerate.placeObstacleCells(obstacle);
mapGenerate.placeFighters(fightersArr);
mapGenerate.placeWeapons(weaponsArr);
mapGenerate.randomNumberXY();
mapGenerate.displayOnScreen();