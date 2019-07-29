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
// Method for switching objects between two cells // 
    transferObjetCells(newCoordonate){
        CurrentGame.mapGame.cells[newCoordonate.x][newCoordonate.y].fighter = CurrentGame.currentPlayer;
      }
// erase an image in the cell //
    clearCell(x, y) {
        $(`#${x}-${y}`).html("");
        return;
      }
// replace the image of the cell //
      updateCellImage(x, y) {
        let imgCell;
        if (CurrentGame.mapGame.cells[x][y].weapon instanceof Weapon) {
          imgCell = "../images/" + CurrentGame.mapGame.cells[x][y].weapon.img;
        } else {
          imgCell = "../images/" + CurrentGame.mapGame.cells[x][y].img;
        }
        return imgCell;
      }
}
