class fighter {
    constructor(name, weapon, health, index, imgUrl) {
        this.name = name;
        this.health = health;
        this.weapon = weapon;
        this.index = index;
        this.imgUrl = imgUrl;
        //this.fightRules = fight(attack,defence,move,replaceWeapon){}; 
    }
};
var Ken =  new fighter("Ken",this.fireball, 100,1, "<img src = '../css/Street-Fighter-Ken.jpg'>");
var Ryu = new fighter("Ryu", this.fireball, 100,2, "<img src = '../css/Street-Fighter-Ryu.jpg'>"); 