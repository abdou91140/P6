// prototype d'armes
class weapon {
    constructor(name, power, imgUrl) {
        this.name = name;
        this.power = power;
        this.imgUrl = imgUrl;
    }
}
var weaponsArr = [fireball = new weapon('Fireball', 10, "<img src = '../css/fireball.jpg'>"),axe = new weapon('Axe', 30, "<img src = '../css/axe.jpg'>"), sword = new weapon('Sword', 20, "<img src = '../css/sword.jpg'>"),gun = new weapon('Gun', 40, "<img src = '../css/fireball.jpg'>")];


