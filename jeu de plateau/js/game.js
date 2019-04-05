class Game {
  constructor(mapGame, players) {
    this.mapGame = mapGame;
    this.players = players;
    this.currentPlayer = null;

  }


  displayInfoPlayer() {

    $("#healthPlayer1").text(this.players[0].health)
    $("#healthPlayer2").text(this.players[1].health)
    $("#weaponPlayer1").text(this.players[0].weapon.name)
    $("#weaponPlayer2").text(this.players[1].weapon.name)
    $("#movementPlayer1").text(this.players[0].movementCount)
    $("#movementPlayer2").text(this.players[1].movementCount)
  }

  startGame() {
    $(".jouez").click(function () {
      gameGenerate.choosePlayer()
    });

    $(document).keydown(function (e) {
      if (e.which == 38) {
        gameGenerate.move("up")
      }
      if (e.which == 40) {
        gameGenerate.move("down")
      }
      if (e.which == 39) {
        gameGenerate.move("right")
      }
      if (e.which == 37) {
        gameGenerate.move("left")
      }

    });
  }
  // choix du joueur this.currentPlayer aléatoirement.
  choosePlayer() {
    this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)];
    this.currentPlayer.status = statusPlayer.move;
    console.log(this.currentPlayer.status)
    $(".jouez").fadeToggle(700);
    console.log("hello" + " " + this.currentPlayer.name)

  }
  nextToPlay() {

    if (this.currentPlayer === this.players[1] && this.currentPlayer.status === statusPlayer.move) {
      this.currentPlayer = this.players[0];
    } else {
      this.currentPlayer = this.players[1]
    }
    return
  }

  move(direction) {

    if (this.currentPlayer.movementCount > 0) {
      // échange du joueur qui éffectue peut se déplacer
       
      // simplification du mouvement avec l'affectation du x et y par l'objet newCoordonate
      let oldCoordonate = {
        x: this.currentPlayer.x,
        y: this.currentPlayer.y
      };
      let newCoordonate;
      switch (direction) {
        case "right":
          newCoordonate = {
            x: this.currentPlayer.x + 1,
            y: this.currentPlayer.y
          };

          break;
        case "left":
          newCoordonate = {
            x: this.currentPlayer.x - 1,
            y: this.currentPlayer.y
          }
          break;
        case "down":
          newCoordonate = {
            x: this.currentPlayer.x,
            y: this.currentPlayer.y + 1
          }
          break;
        case "up":
          newCoordonate = {
            x: this.currentPlayer.x,
            y: this.currentPlayer.y - 1
          }
          break;
        default:
          newCoordonate = {
            x: this.currentPlayer.x,
            y: this.currentPlayer.y
          }
          break;
      }
      // condition qui évite de faire un mouvement sortant de la map
      if (newCoordonate.x <= this.mapGame.size - 1 && newCoordonate.x >= 0 && newCoordonate.y <= this.mapGame.size - 1 && newCoordonate.y >= 0) {
        // création d'une let destinations avec les coordonnée récupérer dans le choix des switch
        let destinations = this.mapGame.cells[newCoordonate.x][newCoordonate.y];
        //condition d'avoir la céllules vide , sans fighter.

        if (destinations.type === cellTypes.normal && destinations.fighter === null) {
          //transfères des données vers les coordonnées de la cellules sur laquelle on souhaite aller.
          this.mapGame.cells[newCoordonate.x][newCoordonate.y].fighter = this.currentPlayer;
          this.mapGame.cells[oldCoordonate.x][oldCoordonate.y].fighter = null;
          //mise à jour des coordonnée du x et y du joueur que l'ont déplace.
          this.currentPlayer.x = newCoordonate.x;
          this.currentPlayer.y = newCoordonate.y;

          // échange de d'arme sur la case de destination.
          if (destinations.weapon instanceof Weapon) {
            var weaponExchange = this.mapGame.cells[newCoordonate.x][newCoordonate.y].weapon;
            this.mapGame.cells[newCoordonate.x][newCoordonate.y].weapon = this.currentPlayer.weapon;
            this.currentPlayer.weapon = weaponExchange;
          }
        } else {

          if (this.mapGame.cells[oldCoordonate.x + 1][oldCoordonate.y] && this.mapGame.cells[oldCoordonate.x - 1][oldCoordonate.y] && this.mapGame.cells[oldCoordonate.x][oldCoordonate.y + 1] && this.mapGame.cells[oldCoordonate.x][oldCoordonate.y - 1] !== this.currentPlayer) {
            this.currentPlayer.status = statusPlayer.fight;
            console.log("ready to fight" + " " + this.currentPlayer.name + "?")
            this.fight()
          }
        }

        let cellOrigine = $(`#${oldCoordonate.x}-${oldCoordonate.y}`).html("");
        let imgCellOrigine = document.createElement("img");

        if (this.mapGame.cells[oldCoordonate.x][oldCoordonate.y].weapon instanceof Weapon) {
          imgCellOrigine.src = "../images/" + this.mapGame.cells[oldCoordonate.x][oldCoordonate.y].weapon.img;
        } else {
          imgCellOrigine.src = "../images/" + this.mapGame.cells[oldCoordonate.x][oldCoordonate.y].img;
        }
        cellOrigine.html(imgCellOrigine);
        //accès à la cellule du fighter avec une notation template litérale.
        let cellDestination = $(`#${this.currentPlayer.x}-${this.currentPlayer.y}`);
        let imgCellDestination = document.createElement("img");
        imgCellDestination.src = "../images/" + this.currentPlayer.img;
        cellDestination.html(imgCellDestination);
      }

      // à chaque déplacement du joueur le movementCount est décrémenté
      this.currentPlayer.movementCount--
      this.displayInfoPlayer()
    } else { //prochain tour du joueur suivant
      this.currentPlayer.movementCount = 3; // remise à 3 des mouvement des joueurs.
      this.nextToPlay()
      this.displayInfoPlayer()
    }
  }
  fight() {
    let i = 0;
    while (this.currentPlayer.health === i) {
      $(".attack-player-1").click(function () {
        this.attack()
        this.defence()
        this.displayInfoPlayer()
      })
      this.nextToPlay()
      i++   
       console.log("hello your dead" + " " + this.currentPlayer.name)

    }

  }
  //systeme de tour pour les attack jusqu'a 0 santé
  //while sur les santé de players.
  //création de statut mouvement, { fight:, movement: }
  //création id à voir.
  //faire une fonction pour savoir si il ya fight
  //deux fonction attack et defence.
  attack() {
    this.currentPlayer.health = (this.currentPlayer.health - this.opponentPlayer.weapon.power);
    return
  }
  defence() {
    this.nextToPlay()
  }

  gameOver() {};

}
var gameGenerate = new Game(mapGenerate, fightersArr);
gameGenerate.displayInfoPlayer()
gameGenerate.startGame()



//gameGenerate.resetPrint();



//window.onload = function() {
//document.getElementById("intro").play();
//}