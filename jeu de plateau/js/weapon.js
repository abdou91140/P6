// prototype d'armes
class Weapon {
    constructor(name, power, imgUrl) {
        this.name = name;
        this.power = power;
        this.imgUrl = imgUrl;
    }
}
var weaponsArr = [fireball = new Weapon('Fireball', 10, "<img src = '../css/fireball.gif'>"),axe = new Weapon('Axe', 30, "<img src = '../css/axe.png'>"), sword = new Weapon('Sword', 20, "<img src = '../css/sword.jpg'>"),gun = new Weapon('Gun', 40, "<img src = '../css/gun.png'>")];


