class Map {
    constructor(size) {
        this.cells = [];
        this.size = size;
    }
    generateCells() {
        for (let x = 0; x < this.size; x++) {
            this.cells[x] = [];
            for (let y = 0; y < this.size; y++) {
                this.cells[x][y] = new Cell(cellTypes.normal, null, null, null, x, y, "../images/white_square.jpg");
                // this.cells.push(x)
                //console.log(this.cells[x])
            }
        }
    }
    placeObstacleCells(numberObstacles) {
        let i = 0;
        while (i < numberObstacles) {
            let randomXYCell = this.randomXY();
            let cellObstacle = this.cells[randomXYCell.x][randomXYCell.y];
            if (cellObstacle.type === cellTypes.normal) {
                cellObstacle.type = cellTypes.obstacle;
                i++;
            }
        } //console.log(this.cells)
        return i;
    }
    placeFighters(fightersArr) {
        fightersArr.forEach(fighter => {
            while (true) {
                let randomXYCell = this.randomXY();
                let cell = this.cells[randomXYCell.x][randomXYCell.y];
                fighter.x = this.cells[randomXYCell.x][randomXYCell.y].x;
                fighter.y = this.cells[randomXYCell.x][randomXYCell.y].y;

                if (cell.type === cellTypes.normal && cell.fighter === null && fighter.x >= 0 && fighter.x !== cell.x + 1 && fighter.x !== cell.x - 1 && fighter.y !== cell.y + 1 && fighter.y !== cell.y - 1) {
                    this.cells[randomXYCell.x][randomXYCell.y].fighter = fighter;
                    // console.log(fighter)
                    break
                } else {
                    location.reload()
                }
            }
        }); // console.log(this.cells)
    }
    placeWeapons(weaponsArr) {
        weaponsArr.forEach(weapon => {
            while (true) {
                let randomXYCell = this.randomXY();
                let cell = this.cells[randomXYCell.x][randomXYCell.y];
                if (cell.type === cellTypes.normal && cell.weapon === null && cell.fighter === null) {
                    this.cells[randomXYCell.x][randomXYCell.y].weapon = weapon;
                    weapon.x = this.cells[randomXYCell.x][randomXYCell.y].x;
                    weapon.y = this.cells[randomXYCell.x][randomXYCell.y].y;
                    break
                }
            }
        }); // console.log(this.cells)
    }



    randomXY() {
        let randomX = Math.floor(Math.random() * this.size);
        let randomY = Math.floor(Math.random() * this.size);
        return {
            x: randomX,
            y: randomY
        }
    }
   
    printOnload() {
        for (let x = 0; x < this.size; x++) {
            var rowCell = $("<div class='column'></div>").attr("id", cellInRowX)
            for (let y = 0; y < this.size; y++) {
                var cellInRow = this.cells[x][y];
                var cellInRowX = this.cells[x][y].x.valueOf();
                var cellInRowY = this.cells[x][y].y.valueOf();
                rowCell.append(function () {
                    let caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + cellInRow.img + ">" + "</div>";
                    let imgObstacle = "<img src='../images/red_square.jpg' alt='Obstacle'></img>";

                    if (cellInRow.type === cellTypes.obstacle) {
                        caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + imgObstacle + "</div>";
                    }
                    if (cellInRow.weapon instanceof Weapon) {
                        caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + "../images/" + cellInRow.weapon.img + ">" + "</div>";
                    }
                    if (cellInRow.fighter instanceof Fighter) {
                        caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + "../images/" + cellInRow.fighter.img + ">" + "</div>";
                    }
                    return caseContent

                })
                $("#base").append(rowCell)

            }
        }
    };
}
var mapGenerate = new Map(9);
mapGenerate.generateCells();
mapGenerate.placeObstacleCells(9);
mapGenerate.placeFighters(fightersArr);
mapGenerate.placeWeapons(weaponsArr);
mapGenerate.randomXY();
mapGenerate.printOnload();