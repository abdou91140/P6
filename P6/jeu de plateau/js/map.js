// Objet de création du plateau de jeux.
class Map {
    constructor(boardSize) {
        this.cells = [];
        this.boardSize = boardSize;
    }
// méthode de céllule blanche créer dans un array en 2 dimensions.
    generateCells() {
        for (let x = 0; x < this.boardSize; x++) {
            this.cells[x] = [];
            for (let y = 0; y < this.boardSize; y++) {
                this.cells[x][y] = new Cell(cellTypes.normal, null, null, null, x, y, "../images/white_square.jpg");
            }
        }
    }
//méthode placement aléatoirement les obstacles sur le plateau.
    placeObstacleCells(numberObstacles) {
        let i = 0;
        while (i < numberObstacles) {
            let randomNumberXYCell = this.randomNumberXY();
            let cellObstacle = this.cells[randomNumberXYCell.x][randomNumberXYCell.y];
            if (cellObstacle.type === cellTypes.normal) {
                cellObstacle.type = cellTypes.obstacle;
                i++;
                console.log(cellObstacle.x);
            }else{
                location.reload()
            }
        } 
    }
//méthode placement aléatoirement les joueurs sur le plateau.
placeFighters(fightersArr) {
        fightersArr.forEach(fighter => {
            while (true) {
                let randomNumberXYCell = this.randomNumberXY();
                let cell = this.cells[randomNumberXYCell.x][randomNumberXYCell.y];
                fighter.x = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].x;
                fighter.y = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].y;

                if (cell.type === cellTypes.normal && cell.fighter === null && fighter.x !== cell.x + 1 || fighter.x !== cell.x - 1 || fighter.y !== cell.y + 1 || fighter.y !== cell.y - 1) {
                    this.cells[randomNumberXYCell.x][randomNumberXYCell.y].fighter = fighter;
                    break
                } else {
                    location.reload()
                }
            }
        }); 
    }
//méthode placement aléatoirement les armes sur le plateau.
    placeWeapons(weaponsArr) {
        weaponsArr.forEach(weapon => {
            while (true) {
                let randomNumberXYCell = this.randomNumberXY();
                let cell = this.cells[randomNumberXYCell.x][randomNumberXYCell.y];
                if (cell.type === cellTypes.normal && cell.weapon === null && cell.fighter === null) {
                    this.cells[randomNumberXYCell.x][randomNumberXYCell.y].weapon = weapon;
                    weapon.x = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].x;
                    weapon.y = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].y;
                    break
                }
            }
        });
    }
    // génération de nombre aléatoire pour les méthodes de placement des différents objets grace au coordonée x et y.
    randomNumberXY() {
        let randomNumberX = Math.floor(Math.random() * this.boardSize);
        let randomNumberY = Math.floor(Math.random() * this.boardSize);
        return {
            x: randomNumberX,
            y: randomNumberY
        }
    }
   // méthode de rendu des objets du plateau en affichant les images correspondantes aux objets.

    printOnload() {
        for (let x = 0; x < this.boardSize; x++) {
            var rowCell = $("<div class='column'></div>").attr("id", cellInRowX)
            for (let y = 0; y < this.boardSize; y++) {
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
mapGenerate.randomNumberXY();
mapGenerate.printOnload();