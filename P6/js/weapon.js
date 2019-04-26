// prototype d'armes
class Weapon {
    constructor(name, power,x,y,img,sound) {
        this.name = name;
        this.power = power;
        this.x = x;
        this.y = y;
        this.img = img;
        this.sound = sound;
    }
}
var weaponsArr = [fireball = new Weapon('Fireball', 10,0,0, "../images/fireball.gif",'id="hadouken" src="../sound/hadouken.mp3"'),axe = new Weapon('Axe', 30,0,0, "../images/axe.png"), sword = new Weapon('Sword', 20,0,0, "../images/sword.jpg"),gun = new Weapon('Gun', 40,0,0, "../images/gun.png"),punch = new Weapon('Punch',1,0,0, "../images/punch.png")];


