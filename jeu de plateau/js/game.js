class Game {
  constructor(mapGame, players) {
    this.mapGame = mapGame;
    this.players = players;
    this.currentPlayer;

  }

  displayInfoPlayer() {
    $("#healthPlayer1").text(this.players[0].health)
    $("#healthPlayer2").text(this.players[1].health)
    $("#weaponPlayer1").text(this.players[0].weapon.name)
    $("#weaponPlayer2").text(this.players[1].weapon.name)
    $("#movementPlayer1").text(this.players[0].movementCount)
    $("#movementPlayer2").text(this.players[1].movementCount)
    $("#powerWeapon1").text(this.players[0].weapon.power)
    $("#powerWeapon2").text(this.players[1].weapon.power)

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
    $(".jouez").fadeToggle(700);
    this.lightAccessibleCells()
  }

  nextToPlay() {
    if (this.currentPlayer === this.players[1]) {
      this.currentPlayer = this.players[0];
      this.opposentPlayer = this.players[1]
      $(".ryu-infos").css("background-color", "yellow")
      $(".ken-infos").css("background-color", "white")
    } else {
      this.currentPlayer = this.players[1]
      this.opposentPlayer = this.players[0]
      $(".ken-infos").css("background-color", "yellow")
      $(".ryu-infos").css("background-color", "white")
    }
    this.lightAccessibleCells()
  }



  move(direction) {
    if (this.currentPlayer.move === true && this.currentPlayer.movementCount > 0) {
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
      if (newCoordonate.x < this.mapGame.size && newCoordonate.x >= 0 && newCoordonate.y < this.mapGame.size && newCoordonate.y >= 0) {
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
          this.swapWeaponByPassing(newCoordonate)
          this.updateImgOnBoard(oldCoordonate)
          this.detectingTheFighter()
        }
      } else {}
    }
  }
  swapWeaponByPassing(newCoordonate) {
    // échange de d'arme sur la case de destination.

    if (this.mapGame.cells[newCoordonate.x][newCoordonate.y].weapon instanceof Weapon) {
      var weaponExchange = this.mapGame.cells[newCoordonate.x][newCoordonate.y].weapon;
      this.mapGame.cells[newCoordonate.x][newCoordonate.y].weapon = this.currentPlayer.weapon;
      this.currentPlayer.weapon = weaponExchange;
    }
  }
  detectingTheFighter() {
    if (this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y + 1].fighter || this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y - 1].fighter || this.mapGame.cells[this.currentPlayer.x + 1][this.currentPlayer.y].fighter || this.mapGame.cells[this.currentPlayer.x - 1][this.currentPlayer.y].fighter !== null) {
      console.log(this.currentPlayer.name + ", " + "let's fight !")
      document.getElementById("fight-start").play();
      $("#base").toggle(function () {
        $(".attack").css("display", "inline")
        $(".defence").css("display", "inline")
      })

      this.currentPlayer.move = false;
      this.fight()
      this.nextToPlay()
      return
    }
  }


  updateImgOnBoard(oldCoordonate) {
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

    this.unsetlightAccessibleCells()
    this.currentPlayer.movementCount--
    this.displayInfoPlayer()
    this.lightAccessibleCells()
    if (this.currentPlayer.movementCount === 0 && this.currentPlayer.move === true) {
      this.currentPlayer.movementCount = 3;
      this.unsetlightAccessibleCells()
      this.nextToPlay()
    }
  }


  lightAccessibleCells() {

    for (let x = -1; x < this.mapGame.size - 1; x++) {
      for (let y = -1; y < this.mapGame.size - 1; y++) {
        if (this.mapGame.cells[this.currentPlayer.x + 1][this.currentPlayer.y].type === 1) {
          $(`#${this.currentPlayer.x+1}-${this.currentPlayer.y}`).css("background", "yellow").addClass("authorized")
        }
        if (this.mapGame.cells[this.currentPlayer.x - 1][this.currentPlayer.y].type === 1) {
          $(`#${this.currentPlayer.x-1}-${this.currentPlayer.y}`).css("background", "yellow").addClass("authorized")

        }
        if (this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y + 1].type === 1) {
          $(`#${this.currentPlayer.x}-${this.currentPlayer.y+1}`).css("background", "yellow").addClass("authorized")
        }
        if (this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y - 1].type === 1) {
          $(`#${this.currentPlayer.x}-${this.currentPlayer.y-1}`).css("background", "yellow").addClass("authorized")
        }
      }
    }
  }

  unsetlightAccessibleCells() {
    for (let x = 0; x < this.mapGame.size; x++) {
      for (let y = 0; y < this.mapGame.size; y++) {
        $(`#${x}-${y}`).css("background", "black").removeClass("authorized")
      }
    }
  }

  fight() {

    $(".attack").click(function () {
      gameGenerate.attack()
    })
    $(".defence").click(function () {
      gameGenerate.defence()
    })
  }

  attack() {
    this.soundEffect(this.currentPlayer.weapon.name)
    if (this.currentPlayer.defence === true) {
      this.opposentPlayer.health = this.opposentPlayer.health - (this.currentPlayer.weapon.power * 0.5);
    } else {
      this.opposentPlayer.health = this.opposentPlayer.health - this.currentPlayer.weapon.power;
    }
    this.displayInfoPlayer()
    this.nextToPlay()
    this.gameOver()
  }

  defence() {
    this.currentPlayer.defence = true;
    this.nextToPlay()
  }

  gameOver() {
    if (this.opposentPlayer.health <= 0) {
      document.getElementById("game-over").play()
      if (this.opposentPlayer === this.players[1]) {
        var endGame = "<img src=' ../images/ken-lose-image.jpg'>";
      } else {
        endGame = "<img src=' ../images/ryu-lose-image.jpg'>";
      }
      $(".middle-page").html(endGame)
    }
  }
  soundEffect(weaponName) {
    switch (weaponName) {
      case "Fireball":
        document.getElementById("hadouken").play()
        break;
      case "Punch":
        document.getElementById("punch-sound").play()
        break;
      case "Gun":
        document.getElementById("gun-sound").play()
        break;
      case "Axe":
        document.getElementById("axe-sound").play()
        break;
      case "Sword":
        document.getElementById("sword-sound").play()
        break;
      default:
        break;
    }
  }
  /*window.onload = function() {
document.getElementById("intro").play();
}*/
}
var gameGenerate = new Game(mapGenerate, fightersArr);
gameGenerate.displayInfoPlayer()
gameGenerate.startGame()
gameGenerate.gameOver()

