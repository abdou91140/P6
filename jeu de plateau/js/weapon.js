// prototype d'armes
class Weapon {
    constructor(name,power,x,y, img) {
        this.name = name;
        this.power = power;
        this.x = x;
        this.y = y;
        this.img = img;
    }
}
var weaponsArr = [fireball = new Weapon('Fireball',10,0,0, "../images/fireball.gif"),axe = new Weapon('Axe',3,0,0, "../images/axe.png"), sword = new Weapon('Sword',2,0,0, "../images/sword.jpg"),gun = new Weapon('Gun',4,0,0, "../images/gun.png")];


