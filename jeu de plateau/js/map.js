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
       if(randomXY(this.cells).type == normalCell){
        Ken[randomXY(this.cells)];
        Ryu[randomXY(this.cells)];
    } 
       else if((Ken[this.x] == Ryu[this.x]) || (Ken[this.y] == Ryu[this.y]) || (Ken[this.x] == Ryu[this.x + 1]) || (Ken[this.y] == Ryu[this.y - 1]) || (Ken[this.y] == Ryu[this.y]) || (Ken[this.y] == Ryu[this.y + 1]) || (Ken[this.y] == Ryu[this.y - 1])) {

            //Ryu[randomXY(this.cells)];
            placeFighters()
       }
        
    }

    placeWeapons(number) {
        for (let i = 0; i < number; i++) {
            while (randomXY(this.cells).type == normalCell && randomXY(this.cells).type !== fireball && randomXY(this.cells).type !== axe || randomXY(this.cells).type !== sword || randomXY(this.cells).type !== gun || Ken[this.cells] !== this.cells(placeWeapons()) || Ryu[this.cells] !== this.cells(placeWeapons())) {
                fireball[randomXY(this.cells)];     
                axe[randomXY(this.cells)];     
                sword[randomXY(this.cells)];  
                gun[randomXY(this.cells)];  
            }
           }
       }
    
    placeObstacleCells(number) {
        for (let i = 0; i < number; i++) {
            randomXY(this.cells).type = obstacleCell;
         while (randomXY(this.cells).type == obstacleCell) {
         }
         placeObstacleCells();
        }
    }
    //this.lightAccessibleCells(){};
    //this.printOnload(){};
    randomXY() {
        let randomX = Math.floor(Math.random()* this.cells.length);
        let randomY = Math.floor(Math.random()* this.cells[this.x].length);
        return (randomX+randomY);
    }
     

}
var mapGenerate = new Map(10,10);
console.log(mapGenerate.generateCells());
console.log(mapGenerate.placeFighters());
console.log(mapGenerate.placeObstacleCells());
console.log(mapGenerate.placeWeapons());
console.log(mapGenerate.randomXY());
console.log();
