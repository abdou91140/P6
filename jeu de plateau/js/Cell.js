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

  checkIfCellHasobstacle() {
    if (mapGenerate.cells[this.x][this.y].obstacle instanceof Obstacle) {
      return false
    }
    return true
  }
  checkIfCellHasWeapon() {
    if (mapGenerate.cells[this.x][this.y].weapon instanceof Weapon) {
      return true
    }
    return false;
  }
  checkIfCellHasFighter() {
    if (mapGenerate.cells[this.x][this.y].fighter !== null ) {
      return true
    }
      return false
    }

  checkIfCellContainFighter() {
    if (this.checkIfCellHasFighter(this.x + 1, this.y) || this.checkIfCellHasFighter(this.x - 1, this.y) || this.checkIfCellHasFighter(this.x, this.y + 1) || this.checkIfCellHasFighter(this.x, this.y - 1)) {
      return true
    } 
      return false
  }

  // méthode d'allumage des céllules de déplacement.
  lightAccessibleCells() {
    if (this.checkIfCellHasobstacle(this.x + 1, this.y)) {
      $(`#${this.x + 1}-${this.y}`)
        .css("background", "red")
    }
    if (this.checkIfCellHasobstacle(this.x - 1, this.y)) {
      $(`#${this.x - 1}-${this.y}`)
        .css("background", "red")
    }
    if (this.checkIfCellHasobstacle(this.x, this.y + 1)) {
      $(`#${this.x}-${this.y + 1}`)
        .css("background", "red")
    }
    if (this.checkIfCellHasobstacle(this.x, this.y - 1)) {
      $(`#${this.x}-${this.y - 1}`)
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
  transferObjetCells() {
    mapGenerate.cells[this.x][this.y].fighter = CurrentGame.currentPlayer;
  }
  // erase an image in the cell //
  clearCell() {
    $(`#${this.x}-${this.y}`).html("");
    return;
  }
  // replace the image of the cell //
  updateCellImage() {
    let imgCell;
    if (mapGenerate.cells[this.x][this.y].weapon instanceof Weapon) {
      imgCell = "./images/" + mapGenerate.cells[this.x][this.y].weapon.img;
    } else {
      imgCell = mapGenerate.cells[this.x][this.y].img;
    }
    return imgCell;
  }
}
