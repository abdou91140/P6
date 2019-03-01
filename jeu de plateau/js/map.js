class Map {
    constructor(x, y) {
        this.cells = [];
        this.x = x;
        this.y = y;
    }
    generateCells() {

        for (let x = 0; x < this.x; x++) {
            this.cells[x] = [];
            for (let y = 0; y < this.y; y++) {
                this.cells[x][y] = new Cell(cellTypes.normal, null, null, null, (x + "-" + y));
                //console.log(this.cells)
            }
        }
    }
    placeObstacleCells(numberObstacles) {
        let i = 0;
        while (i < numberObstacles) {
            let randomXYCells = this.randomXY();
            let cellObstacle = this.cells[randomXYCells.x][randomXYCells.y];
            if (cellObstacle.type === cellTypes.normal) {
                cellObstacle.type = cellTypes.obstacle;
                i++;
            }
        } //console.log(this.cells)
    }
    placeFighters() {
        let randomXYCells = this.randomXY();
        let cellFighter1 = this.cells[randomXYCells.x][randomXYCells.y];
        let cellFighter2 = this.cells[randomXYCells.x][randomXYCells.y];
        if (cellFighter1.type === cellTypes.normal && cellFighter1.fighter === null) {
            cellFighter1.fighter = Ken;
            //if(cellFighter.figther.Ken !== cellFighter.figther.Ryu && cellFighter.figther.Ken !== cellFighter.figther.Ryu -1 && cellFighter.figther.Ken !== cellFighter.figther.Ryu+1){ 
            if (cellFighter2 === cellTypes.normal || cellFighter1 !== cellFighter2 && cellFighter1 !== cellFighter2 + 1 && cellFighter1 !== cellFighter2 - 1 && cellFighter2 !== cellFighter1 + 1 && cellFighter2 !== cellFighter1 - 1) {
            cellFighter2.fighter = Ryu;
            }
        } // console.log(this.cells)
    }
    placeWeapons(weaponsArr) {
        weaponsArr.forEach(weapon => {
            while (true) {
                let randomXYCells = this.randomXY();
                let cell = this.cells[randomXYCells.x][randomXYCells.y];
                if (cell.type === cellTypes.normal && cell.weapon === null) {
                    this.cells[randomXYCells.x][randomXYCells.y].weapon = weapon;
                    break
                }
            }
        }); // console.log(this.cells)
    }



    randomXY() {
        let randomX = Math.floor(Math.random() * this.x);
        let randomY = Math.floor(Math.random() * this.y);
        return { x: randomX, y: randomY }
    }
    //this.lightAccessibleCells(){};
    printOnload(){
        //recupérer les this.cells
        if(this.cells === cellTypes.normal)
        $("#map").append(this.cells);
        //assigner une images 


    };

}

var mapGenerate = new Map(10, 10);
mapGenerate.generateCells();
mapGenerate.placeObstacleCells(10);
mapGenerate.placeFighters();
mapGenerate.placeWeapons(weaponsArr);
mapGenerate.randomXY();
mapGenerate.printOnload();

