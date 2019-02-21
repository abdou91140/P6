class Map {
    constructor(size) {
        this.cells = [];
        this.size = size;

    }
    generateCells() {

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                 this.cells[x][y] = new Cell(normalCells, null, null, null, x, y);
            
                          console.log(this.cells[x][y])
            }
        }
        
    }

    placeFighters() {
        if (this.randomXY(this.cells[type]) !== normalCells) {
            let KenPosition = this.randomXY(this.cells);
            let RyuPosition = this.randomXY(this.cells);
            Ken = KenPosition;
            Ryu = RyuPosition;
    
        }
        else if (Ken == Ryu || Ken == Ryu + 1 || Ken == Ryu - 1 || Ken + 1 == Ryu || Ken - 1 == Ryu) {
        
            placeFighters()

        }
    }

    placeWeapons(numberWeapon) {
        for (let i = 0; i < numberWeapon; i++) {
            if (this.randomXY() == this.cells[normalCells] || this.randomXY(this.cells) !== this.cells[obstacleCell]) {
                let fireballPosition = this.randomXY(this.cells);
                let axePosition = this.randomXY(this.cells);
                let swordPosition = this.randomXY(this.cells);
                let gunPosition = this.randomXY(this.cells);
                fireball = fireballPosition;
                axe = axePosition;
                sword = swordPosition;
                gun = gunPosition;
                console.log(fireball,axe,sword,gun)
            }
            else{
         this.placeWeapons()
            }

        }
    }


    placeObstacleCells(numberObstacles) {
        for (let i = 0; i < numberObstacles; i++) {
            let randomCoordonate = randomXY();
            randomCoordonate.x;
            randomCoordonate.y;
            while(obstacleCells == this.cells[randomCoordonate.x][randomCoordonate.y].type);
            this.cells[randomCoordonate.x][randomCoordonate.y].type(obstaclecells);
        }

    }
    //this.lightAccessibleCells(){};
    //this.printOnload(){};
    randomXY() {
        let randomX = Math.floor(Math.random() * this.size-1);
        let randomY = Math.floor(Math.random() * this.size-1);
   return {x:randomX, y:randomY}
    }

}

var mapGenerate = new Map(5);
    mapGenerate.placeObstacleCells(10);
    mapGenerate.randomXY();
    mapGenerate.placeFighters();
    mapGenerate.generateCells();
    mapGenerate.placeWeapons(4);
