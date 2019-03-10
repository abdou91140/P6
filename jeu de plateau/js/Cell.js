class Cell {
    constructor(type,weapon, fighter, lightCell,position, data,imgUrl) {
        this.type = type;
        this.weapon = weapon;
        this.fighter = fighter;
        this.lightCell = lightCell;
        this.position = position;
        this.data = data;
        this.imgUrl = imgUrl ;

    }
}
let cellTypes = {normal : 1,obstacle : 2};
let cellData = {obstacle :"<data-cell-type = 'cellObstacle'>" , normal : "<data-cell-type = 'cellNormal'>", weapon : "<data-cell-type = 'cellWeapon'>", fighter : "<data-cell-type = 'cellFighter'>" }


