// object cell. //
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


  // method of checking the contents of the cell. //
  checkIfCellExist(x, y) {
    if (x in CurrentGame.mapGame.cells) {
      if (y in CurrentGame.mapGame.cells[x]) {
        return true;
      }
    }
    else false
  }

  checkIfCellHasobstacle(x, y) {
    if (this.checkIfCellExist(x, y) && CurrentGame.mapGame.cells[x][y].obstacle instanceof Obstacle) {
      return false
    }
    return true
  }
  checkIfCellHasWeapon(x, y) {
    if (CurrentGame.mapGame.cells[x][y].weapon instanceof Weapon) {
      return true
    }
    return false;
  }
  checkIfCellHasFighter(x, y) {
    if (this.checkIfCellExist(x, y) && CurrentGame.mapGame.cells[x][y].fighter !== null) {
      return true
    } else {
      return false
    }

  }
  checkIfCellContainFighter(x, y) {
    if (this.checkIfCellHasFighter(x + 1, y) || this.checkIfCellHasFighter(x - 1, y) || this.checkIfCellHasFighter(x, y + 1) || this.checkIfCellHasFighter(x, y - 1)) {
      return true
    } else {
      return false
    }
  }


  // cell ignition method that allows movement. //
  lightAccessibleCells(x, y) {
    if (this.checkIfCellHasobstacle(x + 1, y)) {
      $(`#${x + 1}-${y}`)
        .css("background", "red")
    }
    if (this.checkIfCellHasobstacle(x - 1, y)) {
      $(`#${x - 1}-${y}`)
        .css("background", "red")
    }
    if (this.checkIfCellHasobstacle(x, y + 1)) {
      $(`#${x}-${y + 1}`)
        .css("background", "red")
    }
    if (this.checkIfCellHasobstacle(x, y - 1)) {
      $(`#${x}-${y - 1}`)
        .css("background", "red")
    }
  }

  // method of initializing the entire background of the map to turn off the displacement cells. //
  unsetlightAccessibleCells() {
    for (let x = 0; x < CurrentGame.mapGame.boardSize + 1; x++) {
      for (let y = 0; y < CurrentGame.mapGame.boardSize + 1; y++) {
        $(`#${x}-${y}`)
          .css("background", "black")
          .removeClass("authorized");
      }
    }
  }

  transferObjetCells(newCoordonate) {
    CurrentGame.mapGame.cells[newCoordonate.x][newCoordonate.y].fighter = CurrentGame.currentPlayer;
  }

  // method of erasing the image contained in the cell. //
  initCellImage(x, y) {
    $(`#${x}-${y}`).html("");
    return;
  }

  // update the image contained in the cell. //
  updateCellImage(x, y) {
    let imgCell;
    if (CurrentGame.mapGame.cells[x][y].weapon instanceof Weapon) {
      imgCell = "./images/" + CurrentGame.mapGame.cells[x][y].weapon.img;
    } else {
      imgCell = CurrentGame.mapGame.cells[x][y].img;
    }
    return imgCell;
  }
}