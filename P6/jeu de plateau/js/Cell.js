class Cell {
    constructor(type, weapon, fighter, lightCell, x, y, img) {
        this.type = type;
        this.weapon = weapon;
        this.fighter = fighter;
        this.lightCell = lightCell;
        this.x = x;
        this.y = y;
        this.img = img;
    }
}
let cellTypes = {
    normal: 1,
    obstacle: 2
};