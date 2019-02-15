class map {
    constructor(x,y) {
        this.cells = new Array(1);
        this.x = x;
        this.y = y;
    }
    generateCells() {
        for (let i = 0; i < this.x; i++) {                
            for (let j = 0; j < this.y; j++) {
             this.cells[this.x][this.y]= new Cell();
             $("#map").append(this.cells)

            }
        }
        
    };
    placeFighters() {

       if(randomXY(this.cells).type == normalCell){
        Ken[randomXY(this.cells)];

    } 
       else if(Ken[randomXY(this.cells)] !== this.cells[this.x] || Ken[randomXY(this.cells)] !== this.cells[this.y] ){

            Ryu[randomXY(this.cells)];
       }
        

    
    };

    placeWeapons(number) {
        for (let i = 0; i < number; i++) {
            while (randomXY(this.cells).type == normalCell && randomXY(this.cells).type !== fireball && randomXY(this.cells).type !== axe || randomXY(this.cells).type !== sword || randomXY(this.cells).type !== gun ) {
                fireball[randomXY(this.cells)];     
                axe[randomXY(this.cells)];     
                sword[randomXY(this.cells)];  
                gun[randomXY(this.cells)];  
            }
           }
       };
    
    placeObstacleCells(number) {
        for (let i = 0; i < number; i++) {
            randomXY(this.cells).type = obstacleCell;
         while (randomXY(this.cells).type == obstacleCell) {
         }
         randomXY(this.cells).type = obstacleCell;
        }
    };
    //this.lightAccessibleCells(){};
    //this.printOnload(){};
    randomXY() {
        let randomX = Math.floor(Math.random()* this.cells.length);
        let randomY = Math.floor(Math.random()* this.cells[this.x].length);
        return randomX ,randomY;
    }
    
}

const mapGenerate = new map(10,10);
