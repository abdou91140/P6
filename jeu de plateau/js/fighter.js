// prototype de joueur
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
        this.statut ={ attack :true, defence : false};
    };
    attackOpposent(Game) {
        if (this.statut === false) {
          Game.opposentPlayer.health =
          Game.opposentPlayer.health -  Game.currentPlayer.weapon.power * 0.5;
           }   if (this.statut === true) {
             Game.opposentPlayer.health =
             Game.opposentPlayer.health -  Game.currentPlayer.weapon.power;
        }
         Game.soundEffect( Game.currentPlayer.weapon.name);
         Game.displayInfoPlayer();
         Game.nextToPlay();
         Game.gameOver();
      }
      // méthode qui permet de diviser par 2 l'attaque en modifiant  le statut du joueur "this.defence" en "true".
      defenceOpposent() {
        this.statut.defence;
       Game.nextToPlay();
      }
};
var fightersArr = [Ryu = new Fighter("Ryu", 100, fireball, 0, 0, "Street-Fighter-Ryu.jpg"), Ken = new Fighter("Ken", 100, fireball, 0, 0, "Street-Fighter-Ken.jpg")];
