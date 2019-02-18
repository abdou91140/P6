class Map {
    constructor(x,y) {
        this.cells = [];
        this.x = x;
        this.y = y;
    }
        generateCells () {

            for (let i = 0; i < this.x; i++) {  
                       
             for(let j = 0 ; j<= this.y ; j++) {
                
                 this.cells[this.x, this.y] = new Cell(normalCells);

                     }
            }
        }
    
   placeFighters() {
       console.log();
       if(this.randomXY(this.cells) !== obstacleCell){
        Ken[this.randomXY(this.cells)];
        Ryu[this.randomXY(this.cells)];
    } 
       else if((Ken[this.x] == Ryu[this.x]) || (Ken[this.y] == Ryu[this.y]) || (Ken[this.x] == Ryu[this.x + 1]) || (Ken[this.y] == Ryu[this.y - 1]) || (Ken[this.y] == Ryu[this.y]) || (Ken[this.y] == Ryu[this.y + 1]) || (Ken[this.y] == Ryu[this.y - 1])) {

            //Ryu[randomXY(this.cells)];
            this.placeFighters();
       }
        
    }

    placeWeapons(number) {
        for (let i = 0; i < number; i++) {
            while (this.randomXY(this.cells) == normalCells && this.randomXY(this.cells).type !== fireball && this.randomXY(this.cells).type !== axe || this.randomXY(this.cells).type !== sword || this.randomXY(this.cells).type !== gun || Ken[this.cells] !== this.cells(placeWeapons()) || Ryu[this.cells] !== this.cells(placeWeapons())) {
                fireball[this.randomXY(this.cells)];     
                axe[this.randomXY(this.cells)];     
                sword[this.randomXY(this.cells)];  
                gun[this.randomXY(this.cells)];  
            }
           }
       }
    
    placeObstacleCells(number) {
        for (let i = 0; i < number; i++) {
            this.randomXY(this.cells).type = obstacleCell;
         while (this.randomXY(this.cells).type == obstacleCell) {
         }
         this.placeObstacleCells();
        }
    }
    //this.lightAccessibleCells(){};
    //this.printOnload(){};
    randomXY() {
        console.log()
        let randomX = Math.floor(Math.random()* this.x);
        let randomY = Math.floor(Math.random()* this.cells.length);
        return (randomX+randomY);
    }
     

}
var mapGenerate = new Map(10,10);
mapGenerate.this.placeFighters();
mapGenerate.this.placeObstacleCells();
mapGenerate.this.placeWeapons();
mapGenerate.this.randomXY();
console.log();
