// Objet du déroulement du jeux , avec les fonctions pour le mouvements des joueurs , fonctions d'affichage , fonctions de combat, et d'effets sonore //
class Game {
  constructor(mapGame, players) {
    this.mapGame = mapGame;
    this.players = players;
    this.currentPlayer;
  }
  // method of beginning the game with a button with a fade effect in jquery //
  startGame() {
    let game = this;
    $(".jouez").click(function () {
      $(this).fadeToggle(700), $("#map-game").css("filter", "initial");
      $(".card").css("filter", "initial");
      $(".image-banniere").css("filter", "initial");
      game.choosePlayer();
    });
  }
  // keyboard key method for player movements //
  keyBiding() {
    let game = this;
    $(document).keydown(function (e) {
      if (e.which == 38) {
        game.move("up");
      }
      if (e.which == 40) {
        game.move("down");
      }
      if (e.which == 39) {
        game.move("right");
      }
      if (e.which == 37) {
        game.move("left");
      }
    });
  }
  // function who's choose randomly who is starting first and then the cells accessible for move light.
  choosePlayer() {
    this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)
    ];
    this.showWhoPlaying(this.currentPlayer);
    this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].lightAccessibleCells(this.currentPlayer.x, this.currentPlayer.y);
  }
  // tour par tour avec changement de couleurs de l'arrière plan de celui qui joue.
  nextToPlay() {
    this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].unsetlightAccessibleCells();
    this.togglePlayer();
    this.showWhoPlaying(this.currentPlayer);
    this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].lightAccessibleCells(this.currentPlayer.x, this.currentPlayer.y);
  }
  togglePlayer() {
    if (this.currentPlayer === this.players[1]) {
      this.currentPlayer = this.players[0];
      this.opposentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[1];
      this.opposentPlayer = this.players[0];
    }
  }

  showWhoPlaying(x) {
    if (x === this.players[0]) {
      $(".ryu-infos").css("background-color", "yellow");
      $(".ken-infos").css("background-color", "white");
      $(".arrow-key-ryu").show();
      $(".arrow-key-ken").hide();
    } else {
      $(".ken-infos").css("background-color", "yellow");
      $(".ryu-infos").css("background-color", "white");
      $(".arrow-key-ryu").hide();
      $(".arrow-key-ken").show();
    }
  }

  oldCoordonateOfPlayer() {
    let oldCoordonate = {
      x: this.currentPlayer.x,
      y: this.currentPlayer.y
    };
    return oldCoordonate;
  }
  calculateNewCoordonate(direction) {
    let newCoordonate = this.currentPlayer.coordonateOfplayer();
    switch (direction) {
      case "right":
        newCoordonate.x = newCoordonate.x + 1;
        break;
      case "left":
        newCoordonate.x = newCoordonate.x - 1;
        break;
      case "down":
        newCoordonate.y = newCoordonate.y + 1;
        break;
      case "up":
        newCoordonate.y = newCoordonate.y - 1;
        break;
      default:
        newCoordonate;
        break;
    }
    return newCoordonate;
  }

  // méthode de mouvement qui transmet les données du joueur qui doit se déplacer vers la céllule de destination.
  move(direction) {
    if (
      this.currentPlayer.move === true &&
      this.currentPlayer.movementCount > 0
    ) {
      let newCoordonate = this.calculateNewCoordonate(direction);
      let oldCoordonate = this.currentPlayer.coordonateOfplayer();

      if (
        this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].checkIfCellExist(newCoordonate.x, newCoordonate.y)
      ) {
        if (
          this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].checkIfCellHasobstacle(newCoordonate.x, newCoordonate.y)
        ) {
          this.mapGame.cells[newCoordonate.x][newCoordonate.y].transferObjetCells(newCoordonate);
          this.currentPlayer.initCoordonate(oldCoordonate);
          this.currentPlayer.updateCoordonate(newCoordonate);

          if (
            this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].checkIfCellHasWeapon(newCoordonate.x, newCoordonate.y)
          ) {
            this.swapWeapon(this.currentPlayer.x, this.currentPlayer.y);
          }
          if (
            this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].checkIfCellContainFighter(this.currentPlayer.x,this.currentPlayer.y)
          ) {
            this.fight();
          }

          this.updateBoard(oldCoordonate.x, oldCoordonate.y);
          this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].unsetlightAccessibleCells();
          this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].lightAccessibleCells(this.currentPlayer.x, this.currentPlayer.y);
          this.currentPlayer.movementCount--;
        }
      }
    }
    if (
      this.currentPlayer.movementCount === 0 &&
      this.currentPlayer.move === true
    ) {
      this.currentPlayer.movementCount = 3;
      this.nextToPlay();
    }
  }
  // méthode qui vérifie si la céllule de destinations contient une armes et l'échange avec le joueur si il passe dessus.
  swapWeapon(x, y) {
    var weaponExchange = this.mapGame.cells[x][y].weapon;
    this.mapGame.cells[x][y].weapon = this.currentPlayer.weapon;
    this.currentPlayer.weapon = weaponExchange;
    this.displayInfoPlayer();
  }
  // méthode de détection du joueur adverse sur une céllule voisine de celle de destination, et lancement du combat. Avec disparition du tableau et  apparition des boutons pour combatre

  // déplacement des images en mouvement

  createNewElmImage() {
    let cellOrigine = document.createElement("img");
    return cellOrigine;
  }

  updateBoard(x, y) {
    this.mapGame.cells[x][y].clearCell(x, y);
    let cellimgOld = this.createNewElmImage();
    cellimgOld.src = this.mapGame.cells[x][y].updateCellImage(x, y);
    $(`#${x}-${y}`).html(cellimgOld);
    let cellimgNew = this.createNewElmImage();
    cellimgNew.src = this.currentPlayer.updateCellFighterImage();
    $(`#${this.currentPlayer.x}-${this.currentPlayer.y}`).html(cellimgNew);
  }

  // méthode de combat avec une
  fight() {
    this.nextToPlay();
    this.displayTheFight();
    $(".attack").click(() => {
      this.animationOfFighting();
      this.currentPlayer.defenceStance = false;
      this.currentPlayer.attack(this.opposentPlayer);
    });
    $(".defence").click(() => {
      this.currentPlayer.defenceStance = true;
      this.nextToPlay();
    });
  }
  processFight() {
    this.gameOver();
    this.soundEffect(this.currentPlayer.weapon.name);
    this.displayInfoPlayer();
    this.nextToPlay();
  }
  displayTheFight() {
    $("#map-game").replaceWith($(".fight-button").css("display", "flex"));

    document.getElementById("fight-start").play();
  }
  animationOfFighting() {
    let game = this;
      $(".attack").on("click",function(){
        if (game.opposentPlayer === game.players[0]) {
       $(".ken-infos").effect("pulsate", "fast", 2000); 
      } else {
        $(".ryu-infos").effect( "pulsate", "fast", 2000); 
      };
    });
  }
  // méthode d'attaque qui soustrait la santé de l'adversaire en fonction de la puissance de l'arme en posséssion, et de la méthode défence.

  // méthode qui termine le jeux avec une santé arrivé à 0 et une image qui apparait selon le combatant battu.
  gameOver() {
    if (this.opposentPlayer.health <= 0) {
      document.getElementById("game-over").play();
      if (this.opposentPlayer === this.players[1]) {
        var endGame = "<img src=' ../images/ken-lose-image.jpg'>";
      } else {
        endGame = "<img src=' ../images/ryu-lose-image.jpg'>";
      }
      $(".fight-button").toggle(function () {
        $(this).replaceWith(endGame);
      });
    }
  }
  // méthode d'effet sonore.
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
  // méthode de mise à jour des infos des 2 joeurs.
  displayInfoPlayer() {
    $("#healthPlayer1").text(this.players[0].health);
    $("#healthPlayer2").text(this.players[1].health);
    $("#weaponPlayer1").text(this.players[0].weapon.name);
    $("#weaponPlayer2").text(this.players[1].weapon.name);
    $("#movementPlayer1").text(this.players[0].movementCount);
    $("#movementPlayer2").text(this.players[1].movementCount);
    $("#powerWeapon1").text(this.players[0].weapon.power);
    $("#powerWeapon2").text(this.players[1].weapon.power);
  }
}
var CurrentGame = new Game(mapGenerate, fightersArr);
CurrentGame.displayInfoPlayer();
CurrentGame.startGame();
CurrentGame.keyBiding();

window.onload = function () {
  document.getElementById("intro").play();
};
