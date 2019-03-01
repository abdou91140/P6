class Fighter {
    constructor(name, weapon, health, index, imgUrl) {
        this.name = name;
        this.health = health;
        this.weapon = weapon;
        this.index = index;
        this.imgUrl = imgUrl;
        //this.fightRules = fight(attack,defence,move,replaceWeapon){}; 
    }
};
var Ken =  new Fighter("Ken",this.fireball, 100,1, "<img src = '../css/Street-Fighter-Ken.jpg'>");
var Ryu = new Fighter("Ryu", this.fireball, 100,2, "<img src = '../css/Street-Fighter-Ryu.jpg'>"); 