class Game {
  constructor(mapGame, players) {
    this.mapGame = mapGame;
    this.players = players;
    this.currentPlayer;
    this.opposentPlayer;
    this.litCells;
  }
 

  startGame() {
    $(".jouez").one("click", function () {
      gameGenerate.choosePlayer();
    });
  }
  // choix du joueur this.currentPlayer aléatoirement.
  choosePlayer() {
    this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)];
  
    $(".jouez").fadeToggle(700);
    console.log(this.currentPlayer.name);
    this.lightingCells()
  }
  lightingCells() {
      for (let i = 1; i < 4 ; i++ ) { 
           $(`#${this.currentPlayer.x + i}-${this.currentPlayer.y}`).css("background", "yellow")
              $(`#${this.currentPlayer.x}-${this.currentPlayer.y + i}`).css("background", "yellow")
              $(`#${this.currentPlayer.x - i}-${this.currentPlayer.y}`).css("background", "yellow")
              $(`#${this.currentPlayer.x}-${this.currentPlayer.y - i}`).css("background", "yellow")
              this.movementOfPlayer(i)
    }
  }
       
  initLightingCells(){
    for (var i = 0; i < 4; i++) {
    $(`#${this.currentPlayer.x + i}-${this.currentPlayer.y}`).css("background", "black");
    $(`#${this.currentPlayer.x - i}-${this.currentPlayer.y}`).css("background", "black");
    $(`#${this.currentPlayer.x }-${this.currentPlayer.y + i}`).css("background", "black");
    $(`#${this.currentPlayer.x }-${this.currentPlayer.y - i}`).css("background", "black");
    }
    console.log("backgound black")
  }
 /* initPlayerImg(){
    imgCellDestination = 
    imgCellOrigine.src = "../images/" + this.mapGame.board[this.currentPlayer.x][this.currentPlayer.y].img;

  }*/
 
  movementOfPlayer(i) {
    
   
    $(`#${this.currentPlayer.x+i}-${this.currentPlayer.y}`).one("click", function (e) {
      gameGenerate.movementOfDataPlayer("right", i);
    });
    $(`#${this.currentPlayer.x - i}-${this.currentPlayer.y}`).click(function (e) {
      gameGenerate.movementOfDataPlayer("left", i);
    });
    $(`#${this.currentPlayer.x}-${this.currentPlayer.y + i}`).click(function (e) {
      gameGenerate.movementOfDataPlayer("down", i);
    });
    $(`#${this.currentPlayer.x}-${this.currentPlayer.y - i}`).click(function (e) {
      gameGenerate.movementOfDataPlayer("up", i);
    });
  }
  

  movementOfDataPlayer(direction,i) {
    var oldPosition = {
      x:this.currentPlayer.x ,
      y:this.currentPlayer.y
    };
    console.log(oldPosition)
    let newPosition;
    switch (direction) {
      case "right":
        newPosition = {
          x: this.currentPlayer.x + i,
          y: this.currentPlayer.y
        };
        break;
      case "left":
        newPosition = {
          x: this.currentPlayer.x - i,
          y: this.currentPlayer.y
        };
        break;
      case "down":
        newPosition = {
          x: this.currentPlayer.x,
          y: this.currentPlayer.y + i
        };
        break;
      case "up":
        newPosition = {
          x: this.currentPlayer.x,
          y: this.currentPlayer.y - i
        };
        break;
      default:
        break;
    }
    // condition qui évite de faire un mouvement sortant de la map
    if (newPosition.x <= this.mapGame.sizeBoard - 1 && newPosition.x >= 0 && newPosition.y <= this.mapGame.sizeBoard - 1 && newPosition.y >= 0) {
      // création d'une let destinations avec les coordonnée récupérer dans le choix des switch
      let destinations = this.mapGame.board[newPosition.x][newPosition.y];
      //condition d'avoir la céllules vide , sans fighter.
      if (destinations.type === cellTypes.normal && destinations.fighter === null) {
        //transfères des données vers les coordonnées de la cellules sur laquelle on souhaite aller.
        this.mapGame.board[newPosition.x][newPosition.y].fighter = this.currentPlayer;
        this.mapGame.board[oldPosition.x][oldPosition.y].fighter = null;
        //mise à jour des coordonnée du x et y du joueur que l'ont déplace.
        this.currentPlayer.x = newPosition.x;
        this.currentPlayer.y = newPosition.y;
        console.log("ready to fight" + " " + this.currentPlayer.x +" "+this.currentPlayer.y)

        if (destinations.weapon instanceof Weapon) {
          var weaponExchange = this.mapGame.board[newPosition.x][newPosition.y].weapon;
          this.mapGame.board[newPosition.x][newPosition.y].weapon = this.currentPlayer.weapon;
          this.currentPlayer.weapon = weaponExchange;
        }
        if (this.mapGame.board[oldPosition.x + 1][oldPosition.y] || this.mapGame.board[oldPosition.x - 1][oldPosition.y] || this.mapGame.board[oldPosition.x][oldPosition.y + 1] || this.mapGame.board[oldPosition.x][oldPosition.y - 1] === this.mapGame.board[oldPosition.x][oldPosition.y].fighter) {
          this.fight()
          console.log("ready to fight" + " " + this.currentPlayer.x +" "+this.currentPlayer.y)
        }
      }
    }
  
    let cellOrigine = $(`#${oldPosition.x}-${oldPosition.y}`).html("");
    let imgCellOrigine = document.createElement("img"); 
    if (this.mapGame.board[this.currentPlayer.x][this.currentPlayer.y].weapon instanceof Weapon) {
      imgCellOrigine.src = "../images/" + this.mapGame.board[this.currentPlayer.x][this.currentPlayer.y].weapon.img;
    } else {
      imgCellOrigine.src = "../images/" + this.mapGame.board[this.currentPlayer.x][this.currentPlayer.y].img;
    }
    cellOrigine.html(imgCellOrigine);
    let cellDestination = $(`#${newPosition.x}-${newPosition.y}`);
    let imgCellDestination = document.createElement("img");
    imgCellDestination.src = "../images/" + this.currentPlayer.img;
    cellDestination.html(imgCellDestination);
    console.log("coordonate :"+ this.currentPlayer.x +" "+this.currentPlayer.y)
    this.nextTurn()
  }

  nextTurn() {
    this.initLightingCells()

    if(this.currentPlayer===this.players[0]){
 this.currentPlayer = this.players[1]
    }else{ 
  this.currentPlayer = this.players[0]
    }
    this.lightingCells()
      /* $(".ryu-infos").css("background-color", "#39e400")
       $(".ken-infos").css("background-color", "white")*/
       
  }

  fight() {
    $(".attack").one("click", function () {
      gameGenerate.attack();
    });
    $(".defence").one("click", function () {
      gameGenerate.defence();
    });
  }

  attack() {
    if (this.opposentPlayer.defence === true) {
      this.opposentPlayer.health =
        this.opposentPlayer.health - this.currentPlayer.weapon.power * 0.5;
    } else {
      this.opposentPlayer.health =
        this.opposentPlayer.health - currentPlayer.weapon.power;
    }
    this.soundEffect(this.currentPlayer.weapon.name);
    this.displayInfoPlayer();
    this.isGameOver();
  }

  defend() {
    this.currentPlayer.attack = false;
    this.currentPlayer.defence = true;
    this.nextToPlay();
  }

  isGameOver() {
    if (this.opposentPlayer.health >= 0) {
      document.getElementById("game-over").play();
      if (this.opposentPlayer === this.players[1]) {
        var endGame = "<img src=' ../images/ken-lose-image.jpg'>";
      } else {
        endGame = "<img src=' ../images/ryu-lose-image.jpg'>";
      }
      $(".middle-page").html(endGame);
    } else {
      this.nextToPlay();
    }
  }
  displayInfoPlayer() {
    $("#healthPlayer1").text(this.players[0].health);
    $("#healthPlayer2").text(this.players[1].health);
    $("#weaponPlayer1").text(this.players[0].weapon.name);
    $("#weaponPlayer2").text(this.players[1].weapon.name);
  }
  soundEffect(weaponName) {
    switch (weaponName) {
      case "Fireball":
        document.getElementById("hadouken").play();
        break;
      case "Punch":
        document.getElementById("punch-sound").play();
        break;
      case "Gun":
        document.getElementById("gun-sound").play();
        break;
      case "Axe":
        document.getElementById("axe-sound").play();
        break;
      case "Sword":
        document.getElementById("sword-sound").play();
        break;
      default:
        break;
    }
  }
}
var gameGenerate = new Game(mapGenerate, fightersArr);
gameGenerate.displayInfoPlayer();
gameGenerate.startGame();
/*window.onload = function () {
document.getElementById("intro").play();
}*/

//gameGenerate.resetPrint();