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
// possible movement of the player. //
    movementOfplayer(){
      let newCoordonate= { x: this.x,
      y: this.y }
      return newCoordonate
      }
// update coordonate of the // 
      updateCoordonate(newCoordonate){
        this.x = newCoordonate.x;
        this.y = newCoordonate.y;
      }
// initialize the old coordonate of player after move // 
      initCoordonate(oldCoordonate){
        CurrentGame.mapGame.cells[oldCoordonate.x][oldCoordonate.y].fighter = null;     
      }

// update the image of the fighter contained in the cell. //
      updateCellFighterImage() {
        let imgCellDestination = "./images/" + this.img;
        return imgCellDestination;
      }
// method of attack which according to the condition divides by two the sudden damage. //
    attack(opposentPlayer) {
      var healthValue = opposentPlayer.health;
    
      if (opposentPlayer.defenceStance === true) {
         healthValue = healthValue - this.weapon.power * 0.5;
         this.defenceStance = (this.defenceStance != opposentPlayer.defenceStance);
         }   else {
         healthValue = healthValue - this.weapon.power;
       }
          opposentPlayer.setHealth(healthValue)
          CurrentGame.processFight()    
    }
    
// method to stop the fight at zero health or if sudden damage is less than zero health. //
    setHealth(health){
      if(health < 0){
        this.health = 0;
      }else{
        this.health = health;
      }
    }
};
// array contained the fighters //
var fightersArr = [Ryu = new Fighter("Ryu", 100, fireball, 0, 0, "Street-Fighter-Ryu.jpg"), Ken = new Fighter("Ken", 100, fireball, 0, 0, "Street-Fighter-Ken.jpg")];
