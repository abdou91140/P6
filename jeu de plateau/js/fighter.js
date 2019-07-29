// prototype of fighters //
class Fighter {
    constructor(name, health, weapon, x, y, img) {
        this.name = name;
        this.health = health;
        this.weapon = weapon;
        this.x = x;
        this.y = y;
        this.img = img;
        this.movementCount = 3; 
        this.move = true;
        this.defenceStance;
    }; 
// coordonate of the destination of the fighter // 
    coordonateOfplayer(){
      let newCoordonate= { x: this.x,
      y: this.y }
      return newCoordonate
      }
// update coodonate after calling the move function // 
      updateCoordonate(newCoordonate){
        this.x = newCoordonate.x;
        this.y = newCoordonate.y;
      }
// initialize the old coordonate of player after move // 
      initCoordonate(oldCoordonate){
        CurrentGame.mapGame.cells[oldCoordonate.x][oldCoordonate.y].fighter = null;     
      }
// change the image of the cell destination after mov //
      updateCellFighterImage() {
        let imgCellDestination = "../images/" + this.img;
        return imgCellDestination;
      }
// function of attack with condition of if opposent player is in defence stance, the injurie is half efFicient //      
    attack(opposentPlayer) {
      if (opposentPlayer.defenceStance === true) {
        opposentPlayer.health =
        opposentPlayer.health -  this.weapon.power * 0.5;
         }   else {
           opposentPlayer.health =
           opposentPlayer.health - this.weapon.power;
      }
        CurrentGame.processFight()
    }
};
// array contained the players //
var fightersArr = [Ryu = new Fighter("Ryu", 100, fireball, 0, 0, "Street-Fighter-Ryu.jpg"), Ken = new Fighter("Ken", 100, fireball, 0, 0, "Street-Fighter-Ken.jpg")];
