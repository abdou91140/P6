class Map {
    constructor(x,y) {
        this.cells = [];
        this.x = x;
        this.y = y;
    }
        generateCells () {
            for (let x = 0; x < this.x; x++) {  
             for(let y = 0 ; y< this.y ; y++) {
         this.cells[[x][y]] = new Cell(normalCells,null,null,null);

         console.log(this.cells.length)

             }
            }
            

        }
      
      placeFighters() {
       if(this.cells[[this.x],[this.y]] !== obstacleCell){
       [[this.x][this.y]] = this.randomXY([this.x],[this.y]); 
       Ryu = this.randomXY([this.x],[this.y]); 
        return Ken , Ryu;
        } 
       else if((Ken[this.x] == Ryu[this.x]) || (Ken[this.y] == Ryu[this.y]) || (Ken[this.x] == Ryu[this.x + 1]) || (Ken[this.y] == Ryu[this.y - 1]) || (Ken[this.y] == Ryu[this.y]) || (Ken[this.y] == Ryu[this.y + 1]) || (Ken[this.y] == Ryu[this.y - 1])) {

      placeFighters()
      
       }
    }

     placeWeapons() { 
    
  console.log(fireball);
            if(this.cells[type] == this.cells[normalCells]){// && this.cells[this.x, this.y] !== this.cells[fireball] && (this.cells[this.x, this.y] !== this.cells[axe]) && this.cells[this.x, this.y] !== sword[this.cells[this.x, this.y]] && this.cells[this.x, this.y] !== gun[this.cells[this.x, this.y]] && Ken[this.cells[this.x, this.y]] !== this.cells[placeWeapons()] && Ryu[this.cells[this.x, this.y]] !== this.cells[placeWeapons()]) {
                fireball = [this.randomXY(this.cells[this.x, this.y])]; 
                axe = [this.randomXY(this.cells[this.x, this.y])]; 
                return fireball,axe ;
            }else{
              placeWeapons();
            }
           }

       
    
    placeObstacleCells() {
        for (let i = 0; i < number; i++) {
            this.randomXY(this.cells).type = obstacleCell;
         while (this.randomXY(this.cells).type == obstacleCell) {
         }
         this.placeObstacleCells();
        }console.log(this.placeObstacleCells());

    }
    //this.lightAccessibleCells(){};
    //this.printOnload(){};
     randomXY(randomX,randomY) {
         randomX = Math.floor(Math.random()* random);
         randomY = Math.floor(Math.random()* random);
      let arrRandom = [randomX,randomY];
      console.log(arrRandom)
       return arrRandom
    }
     


}
var mapGenerate = new Map(10,10);
mapGenerate.generateCells();
console.log(mapGenerate.placeFighters());
console.log(mapGenerate.placeWeapons());
mapGenerate.randomXY();
