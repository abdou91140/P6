class Fighter {
    constructor(name,health,weapon,x,y,img, movementCount,status,attack, defence) {
        this.name = name;
        this.health = health;
        this.weapon = weapon;
        this.x = x;
        this.y = y;
        this.img = img; 
        this.movementCount = movementCount;
        this.status= status
        this.attack = attack;
        this.defence = defence;
     };
     

    
};

var fightersArr = [ Ryu = new Fighter("Ryu", 100, fireball,0,0,"Street-Fighter-Ryu.jpg"),Ken = new Fighter("Ken", 100,fireball,0,0,"Street-Fighter-Ken.jpg")];

var statusPlayer = {fight:1,move:2};