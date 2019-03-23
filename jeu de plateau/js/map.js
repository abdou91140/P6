class Map {
    constructor(size) {
        this.cells = [];
        this.size = size;
    }
    generateCells() {
        for (let x = 0; x < this.size; x++) {
            this.cells[x] = [];
            for (let y = 0; y < this.size; y++) {
                this.cells[x][y] = new Cell(cellTypes.normal, null, null, null,(x),(y),null);
                //console.log(this.cells[x][y])
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
                if (cell.type === cellTypes.normal && cell.fighter === null &&  cell.fighter !== cell.fighter +1 && cell.fighter !== cell.fighter-1 && cell.fighter !== cell.fighter + 1 && cell.fighter !== cell.fighter - 1) {
                    this.cells[randomXYCell.x][randomXYCell.y].fighter = fighter;
                    fighter.x = this.cells[randomXYCell.x][randomXYCell.y].x 
                    fighter.y= this.cells[randomXYCell.x][randomXYCell.y].y;

                  //  console.log(this.cells[randomXYCell.x][randomXYCell.y].position)
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
                    this.cells[randomXYCell.x][randomXYCell.y].weapon = weapon;
                    break
                }
            }
        }); // console.log(this.cells)
    }



    randomXY() {
        let randomX = Math.floor(Math.random() * this.size);
        let randomY = Math.floor(Math.random() * this.size);
        return {x: randomX,y: randomY}
    }
    lightAccessibleCells(){
   

   
    };
    printOnload() {
        
        this.cells.forEach(row => {
         
            row.forEach(cellInRow => {
                if (cellInRow.type === cellTypes.normal) { 
                   let divCell = $(document.createElement("div"))
                    let imgCell =document.createElement("img");
                    divCell.attr("id", cellInRow.x +"-"+ cellInRow.y);
                    imgCell.src= "../css/white_square.jpg";
                    divCell.prepend(imgCell);
                    $("#cell").append(divCell)
                
                } 
                if (cellInRow.type === cellTypes.obstacle) {
                    let divObstacle = $(document.createElement("div"))
                    let imgObstacle =document.createElement("img");
                    imgObstacle.src = "../css/red_square.jpg";
                     divObstacle.append(imgObstacle);
                    $("#cell").append(divObstacle)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.weapon === fireball) {
                    let divWeapon1 = document.createElement("div");
                     divWeapon1.innerHTML = fireball.imgUrl;
                    $("#cell").append(divWeapon1)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.weapon === gun) {
                    let divWeapon2 = document.createElement("div");
                    divWeapon2.innerHTML = gun.imgUrl;
                    $("#cell").append(divWeapon2)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.weapon === sword) {
                    let divWeapon3 = document.createElement("div");
                    divWeapon3.innerHTML = sword.imgUrl;
                    $("#cell").append(divWeapon3)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.weapon === axe) {
                    let divWeapon4 = document.createElement("div");
                    divWeapon4.innerHTML = axe.imgUrl;
                    $("#cell").append(divWeapon4)
                }
                if (cellInRow.type === cellTypes.normal && cellInRow.fighter instanceof Fighter) {
                    let divFighter1 = $(document.createElement("div"));
                     let imgFighter =document.createElement("img");
                     imgFighter.src = "../css/" + cellInRow.fighter.img;
                    divFighter1.append(imgFighter);
                    $("#cell").append(divFighter1)
                }
               
            });

        });
    }

    };

var mapGenerate = new Map(8);
mapGenerate.generateCells();
mapGenerate.placeObstacleCells(8);
mapGenerate.placeFighters(fightersArr);
mapGenerate.placeWeapons(weaponsArr);
mapGenerate.randomXY();
mapGenerate.lightAccessibleCells()
mapGenerate.printOnload();
 

