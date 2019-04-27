// prototype d'armes
class Weapon {
    constructor(name, power, x, y, img) {
        this.name = name;
        this.power = power;
        this.x = x;
        this.y = y;
        this.img = img;
    }
}
var weaponsArr = [fireball = new Weapon('Fireball', 10, 0, 0, "fireball.gif"), axe = new Weapon('Axe', 3, 0, 0, "axe.png"), sword = new Weapon('Sword', 2, 0, 0, "sword.jpg"), gun = new Weapon('Gun', 4, 0, 0, "gun.png"), punch = new Weapon('Punch', 1, 0, 0, "punch.png")];