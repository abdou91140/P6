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
                 return this.cells[this.x, this.y]
                     }
            }
            
        }
    
     placeFighters(Ken,Ryu) {
       if(this.randomXY(this.cells) !== obstacleCell){
       Ken = [this.randomXY(this.cells[this.x, this.y])]; 
       Ryu = [this.randomXY(this.cells[this.x, this.y])]; 
        return Ken , Ryu;
        } 
       else if((Ken[this.x] == Ryu[this.x]) || (Ken[this.y] == Ryu[this.y]) || (Ken[this.x] == Ryu[this.x + 1]) || (Ken[this.y] == Ryu[this.y - 1]) || (Ken[this.y] == Ryu[this.y]) || (Ken[this.y] == Ryu[this.y + 1]) || (Ken[this.y] == Ryu[this.y - 1])) {

           placeFighters(Ken,Ryu)
      
       }
    }

    placeWeapons(fireball,axe,sword,gun) {
        for (let i = 0; i < 4; i++) {
            while (this.cells[type] == this.cells[normalCells] && this.cells[this.x, this.y] !== fireball[this.cells[this.x, this.y]] && this.cells[this.x, this.y] !== axe[this.cells[this.x, this.y]] && this.cells[this.x, this.y] !== sword[this.cells[this.x, this.y]] && this.cells[this.x, this.y] !== gun[this.cells[this.x, this.y]] && Ken[this.cells[this.x, this.y]] !== this.cells(placeWeapons(number)) && Ryu[this.cells[this.x, this.y]] !== this.cells(placeWeapons(number))) {
                fireball = this.randomXY(this.cells[this.x, this.y]);     
                axe =this.randomXY(this.cells[this.x, this.y]);    
                sword = this.randomXY(this.cells[this.x, this.y]);
                gun = this.randomXY(this.cells[this.x, this.y]);  
                return fireball, axe, sword, gun
            }
           }

       }
    
    placeObstacleCells(number) {
        for (let i = 0; i < number; i++) {
            this.randomXY(this.cells).type = obstacleCell;
         while (this.randomXY(this.cells).type == obstacleCell) {
         }
         this.placeObstacleCells();
        }console.log(this.placeObstacleCells());

    }
    //this.lightAccessibleCells(){};
    //this.printOnload(){};
    randomXY() {

        let randomX = Math.floor(Math.random()* this.x);
        let randomY = Math.floor(Math.random()* this.cells.length);
        return (randomX+randomY);
    }
     


}
var mapGenerate = new Map(10,10);
console.log(mapGenerate.generateCells());
console.log(mapGenerate.placeFighters(Ken,Ryu));
console.log(mapGenerate.placeWeapons(fireball,axe,sword,gun));
console.log(mapGenerate.randomXY());
