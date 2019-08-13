// object cell of the map with proprety //
class Cell {
    constructor(obstacle, weapon, fighter, lightCell, x, y, img) {
        this.obstacle = obstacle;
        this.weapon = weapon;
        this.fighter = fighter;
        this.lightCell = lightCell;
        this.x = x;
        this.y = y;
        this.img = img;
    }
 
    checkIfCellHasobstacle(x,y) {
      if (CurrentGame.checkIfCellExist(x,y) && mapGenerate.cells[x][y].obstacle instanceof Obstacle) {
        return false
      }
      return true
    }
      checkIfCellHasWeapon(x, y) {
        if (this.cells[x][y].weapon instanceof Weapon) {
          return true
        }
        return false;
      }
      checkIfCellHasFighter(x, y) {
    if(this.checkIfCellExist(x,y) && this.cells[x][y].fighter!==null){       
          return true
        }else{
          return false
        }
     
    }
      checkIfCellContainFighter(x, y) {
    if(this.checkIfCellHasFighter(x+1,y)|| this.checkIfCellHasFighter(x-1,y) || this.checkIfCellHasFighter(x,y+1)|| this.checkIfCellHasFighter(x,y-1)){  
     return true
    } else{
      return false
    }
  }
  
  // méthode d'allumage des céllules de déplacement.
  lightAccessibleCells(x,y) {
    if(this.checkIfCellHasobstacle(x+1,y)){
     $(`#${ x+ 1}-${y}`)
       .css("background", "red")
     }
     if(this.checkIfCellHasobstacle(x-1,y)){
     $(`#${x-1}-${y}`)
       .css("background", "red")
         }
         if(this.checkIfCellHasobstacle(x,y+1)){
               $(`#${x}-${y+1}`)
       .css("background", "red")
         }
         if(this.checkIfCellHasobstacle(x,y-1)){
       $(`#${x}-${y-1}`)
       .css("background", "red")
             }
   }
   // méthode d'initialiation de l'arrière plan en noir pour éteindre les céllules allumé en jaune.
   unsetlightAccessibleCells() {
     for (let x = 0; x < mapGenerate.boardSize + 1; x++) {
       for (let y = 0; y < mapGenerate.boardSize + 1; y++) {
         $(`#${x}-${y}`)
           .css("background", "black")
           .removeClass("authorized");
       }
     }
   }
// Method for switching objects between two cells // 
    transferObjetCells(newCoordonate){
        this.cells[newCoordonate.x][newCoordonate.y].fighter = CurrentGame.currentPlayer;
      }
// erase an image in the cell //
    clearCell(x, y) {
        $(`#${x}-${y}`).html("");
        return;
      }
// replace the image of the cell //
      updateCellImage(x, y) {
        let imgCell;
        if (this.cells[x][y].weapon instanceof Weapon) {
          imgCell = "./images/" + this.cells[x][y].weapon.img;
        } else {
          imgCell = "./images/" + this.cells[x][y].img;
        }
        return imgCell;
      }
}
