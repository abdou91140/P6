class Map {
    constructor(size) {
        this.cells = [];
        this.size = size;
    }
    generateCells() {
        for (let x = 0; x < this.size; x++) {
            this.cells[x] = [];
            for (let y = 0; y < this.size; y++) {
                this.cells[x][y] = new Cell(cellTypes.normal, null, null, null,(x + '-' + y),cellData.normal);
                this.cells.imgUrl ="<img src = '../css/white_square.jpg'>";
        //console.log(this.cells[x][y])
            }
        }
        
        
    }
    placeObstacleCells(numberObstacles) {
        let i = 0;
        while (i < numberObstacles) {
            let randomXYCell = this.randomXY();
            let cellObstacle = this.cells[randomXYCell.x][randomXYCell.y];
            cellObstacle.imgUrl = "<img src = '../css/red_square.jpg'>";
            if (cellObstacle.type === cellTypes.normal) {
                if(cellObstacle.data === cellData.normal){
                    cellObstacle.data = cellData.obstacle
                }
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
                if (cell.type === cellTypes.normal && cell.fighter === null &&  cell.fighter !== cell.fighter +1 && cell.fighter !== cell.fighter-1 && cell.fighter !== cell.fighter + 1 && cell.fighter !== cell.fighter - 1) {
                    if(cell.data === cellData.normal && cell.data !== cellData.obstacle){
                        cell.data = cellData.fighter;
                    }
                    this.cells[randomXYCell.x][randomXYCell.y].fighter = fighter;
                    break
                }
            }
        }); // console.log(this.cells)
    }
    placeWeapons(weaponsArr) {
        weaponsArr.forEach(weapon => {
            while (true) {
                let randomXYCell = this.randomXY();
                let cell = this.cells[randomXYCell.x][randomXYCell.y];
                if (cell.type === cellTypes.normal && cell.weapon === null) {
                    if(cell.data === cellData.normal && cell.data !== cellData.obstacle && cell.data !== cellData.fighter){
                        cell.data = cellData.weapon;
                    }
                    this.cells[randomXYCell.x][randomXYCell.y].weapon = weapon;
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
    lightAccessibleCells(){
   this.cells.forEach(imgCell => {
    $("img").mouseover(function() {
       $("img").css("width","110")})
    return imgCell}
   )
   
    };
    printOnload() {
        this.cells.forEach(row => {
            row.forEach(cellInRow => {
                if (cellInRow.type === cellTypes.normal) {
                    let normal = this.cells.imgUrl ;
                    $("#map").append(normal)
                } 
                if (cellInRow.type === cellTypes.obstacle) {
                    let obstacle = cellInRow.imgUrl;
                    $("#map").append(obstacle)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.weapon === fireball) {
                    let weapon1 = fireball.imgUrl;
                    $("#map").append(weapon1)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.weapon === gun) {
                    let weapon2 = gun.imgUrl;
                    $("#map").append(weapon2)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.weapon === sword) {
                    let weapon3 = sword.imgUrl;
                    $("#map").append(weapon3)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.weapon === axe) {
                    let weapon4 = axe.imgUrl;
                    $("#map").append(weapon4)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.fighter === Ken) {
                    let fighter1 = Ken.imgUrl;
                    $("#map").append(fighter1)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.fighter === Ryu) {
                    let fighter2 = Ryu.imgUrl;
                    $("#map").append(fighter2)
                }
                else{
                    this.printOnload
                }
            });

        });
    }

    };

var mapGenerate = new Map(9);
mapGenerate.generateCells();
mapGenerate.placeObstacleCells(8);
mapGenerate.placeFighters(fightersArr);
mapGenerate.placeWeapons(weaponsArr);
mapGenerate.randomXY();
mapGenerate.lightAccessibleCells()
mapGenerate.printOnload();

