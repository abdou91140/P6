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
                this.cells[x][y] = new Cell(null, null, null, null, x, y, "../images/white_square.jpg");
            }
        }
    }
    //méthode placement aléatoirement les obstacles sur le plateau.
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
    //méthode placement aléatoirement les joueurs sur le plateau.
    placeFighters(fightersArr) {
        fightersArr.forEach(fighter => {
            while (true) {
                let randomNumberXYCell = this.randomNumberXY();
                let cell = this.cells[randomNumberXYCell.x][randomNumberXYCell.y];
                fighter.x = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].x;
                fighter.y = this.cells[randomNumberXYCell.x][randomNumberXYCell.y].y;
               // if(this.cells[randomNumberXYCell.x]<= this.boardSize && this.cells[randomNumberXYCell.y]<= this.boardSize && this.cells[randomNumberXYCell.x]>=0 && this.cells[randomNumberXYCell.y].y>= 0 ){
                if (cell.obstacle === null && cell.fighter === null) {
                    if( cell.x+1 && cell.x-1 !== fighter.x || cell.y+1 && cell.y-1 !== fighter.y){ 
                        this.cells[randomNumberXYCell.x][randomNumberXYCell.y].fighter = fighter;
                        break
                    }
                } else {
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
                if (cell.obstacle === null && cell.weapon === null && cell.fighter === null) {
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
                    if (cellInRow.obstacle) {
                        caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + cellInRow.obstacle.img  + ">" + "</div>";
                    }
                    if (cellInRow.weapon instanceof Weapon) {
                        caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + "../images/" + cellInRow.weapon.img + ">" + "</div>";
                    }
                    if (cellInRow.fighter instanceof Fighter) {
                        caseContent = "<div id=" + cellInRowX + "-" + cellInRowY + ">" + "<img src=" + "../images/" + cellInRow.fighter.img + ">" + "</div>";
                    }
                    return caseContent
                })
                $("#map-game").append(rowCell)
            }
        }
    };
}
var mapGenerate = new Map(9);
mapGenerate.generateCells();
mapGenerate.placeObstacleCells(obstacle);
mapGenerate.placeFighters(fightersArr);
mapGenerate.placeWeapons(weaponsArr);
mapGenerate.randomNumberXY();
mapGenerate.printOnload();