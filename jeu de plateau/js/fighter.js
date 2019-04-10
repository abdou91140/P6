class Fighter {
    constructor(name,health,weapon,x,y,img) {
        this.name = name;
        this.health = health;
        this.weapon = weapon;
        this.x = x;
        this.y = y;
        this.img = img; 
        this.movementCount = 3;
        this.fight = true;
        this.move = true;
       // this.attack = attack;
        //this.defence = defence;
     };
     

    
};

var fightersArr = [Ryu = new Fighter("Ryu",100, fireball,0,0,"Street-Fighter-Ryu.jpg"),Ken = new Fighter("Ken",100,fireball,0,0,"Street-Fighter-Ken.jpg")];

