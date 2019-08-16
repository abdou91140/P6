// game settings and gameplay. //
class Game {
  constructor(mapGame, players) {
    this.mapGame = mapGame;
    this.players = players;
    this.currentPlayer;
  }
  // start of the game when the button is clicked and the background becomes clear. // 
  startGame() {
    let game = this;
    $(".jouez").on("click", function () {
      $(this).fadeToggle(700)
      $("#map-game").css("filter", "initial");
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
  // method that randomly chooses who starts to play first. //
  choosePlayer() {
    this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)
    ];
    this.showWhoPlaying(this.currentPlayer);
    this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].lightAccessibleCells(this.currentPlayer.x, this.currentPlayer.y);
  }
  // turn-based management method . //
  nextToPlay() {
    this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].unsetlightAccessibleCells();
    this.togglePlayer();
    this.showWhoPlaying(this.currentPlayer);
    this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].lightAccessibleCells(this.currentPlayer.x, this.currentPlayer.y);
  }
  // method that swaps the players. //
  togglePlayer() {
    if (this.currentPlayer === this.players[1]) {
      this.currentPlayer = this.players[0];
      this.opposentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[1];
      this.opposentPlayer = this.players[0];
    }
  }
  // method of changing the color of the background of the current player. //
  showWhoPlaying(x) {
    if (x === this.players[0]) {
      $(".ryu-infos").css("background-color", "yellow");
      $(".ken-infos").css("background-color", "white");

    } else {
      $(".ken-infos").css("background-color", "yellow");
      $(".ryu-infos").css("background-color", "white");

    }
  }
  // method saving the player's current position. //
  oldCoordonateOfPlayer() {
    let oldCoordonate = {
      x: this.currentPlayer.x,
      y: this.currentPlayer.y
    };
    return oldCoordonate;
  }
  // motion position search method. //
  calculateNewCoordonate(direction) {
    let newCoordonate = this.currentPlayer.movementOfplayer();
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
  // method of checking the existence of the given cell. //
  cellExist(x, y) {
    if (x in CurrentGame.mapGame.cells) {
      if (y in CurrentGame.mapGame.cells[x]) {
        return true;
      }
    }
    else false
  }
  // player movement management method. //
  move(direction) {
    if (
      this.currentPlayer.move === true &&
      this.currentPlayer.movementCount > 0
    ) {
      let newCoordonate = this.calculateNewCoordonate(direction)
      let oldCoordonate = this.currentPlayer.movementOfplayer()
      if (this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].checkIfCellExist(newCoordonate.x, newCoordonate.y)) {
        if (this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].checkIfCellHasobstacle(newCoordonate.x, newCoordonate.y)) {
          this.mapGame.cells[newCoordonate.x][newCoordonate.y].transferObjetCells(newCoordonate)
          this.currentPlayer.initCoordonate(oldCoordonate)
          this.currentPlayer.updateCoordonate(newCoordonate)
          if (this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].checkIfCellHasWeapon(newCoordonate.x, newCoordonate.y)) {
            this.swapWeapon(this.currentPlayer.x, this.currentPlayer.y);
          }
          if (this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].checkIfCellContainFighter(this.currentPlayer.x, this.currentPlayer.y)) {
            this.fight()
          }
          this.updateBoard(oldCoordonate.x, oldCoordonate.y);
          this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].unsetlightAccessibleCells();
          this.mapGame.cells[this.currentPlayer.x][this.currentPlayer.y].lightAccessibleCells(this.currentPlayer.x, this.currentPlayer.y)
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

  // method of swapping the player's weapon with that of the cell. //
  swapWeapon(x, y) {
    var weaponExchange = this.mapGame.cells[x][y].weapon;
    this.mapGame.cells[x][y].weapon = this.currentPlayer.weapon;
    this.currentPlayer.weapon = weaponExchange;
    this.displayInfoPlayer();
  }
  // method of creating an image html element. //
  createNewElmImage() {
    let cellOrigine = document.createElement("img");
    return cellOrigine;
  }
  // method for updating DOM elements. //
  updateBoard(x, y) {
    this.mapGame.cells[x][y].initCellImage(x, y);
    let cellimgOld = this.createNewElmImage();
    cellimgOld.src = this.mapGame.cells[x][y].updateCellImage(x, y);
    $(`#${x}-${y}`).html(cellimgOld);

    let cellimgNew = this.createNewElmImage();
    cellimgNew.src = this.currentPlayer.updateCellFighterImage();
    $(`#${this.currentPlayer.x}-${this.currentPlayer.y}`).html(cellimgNew);
  }
  // start the fighting condition. //
  fight() {
    this.nextToPlay();
    this.displayTheFight();
    let game = this;

    $(".attack").on("click", function () {
      game.currentPlayer.defenceStance = false;
      game.currentPlayer.attack(game.opposentPlayer);
    });
    $(".defence").on("click", function () {
      game.currentPlayer.defenceStance = true;
      game.nextToPlay();
    });
  }
  // fight management method. //
  processFight() {
    this.animationOfFighting();
    this.gameOver();
    this.soundEffect(this.currentPlayer.weapon.name);
    this.displayInfoPlayer();
    this.nextToPlay();
  }
  // method of displaying control elements for combat. //
  displayTheFight() {
    $("#map-game").replaceWith($(".fight-button").css("display", "flex"));
    document.getElementById("fight-start").play();
  }
  // effect method on the information blocks of the players. //
  animationOfFighting() {
    let game = this;
    $(".attack").one("click", function () {
      if (game.opposentPlayer === game.players[0]) {
        $(".ken-infos").effect("pulsate", "normal", 500);
      } else {
        $(".ryu-infos").effect("pulsate", "normal", 500);
      };
    });
  }
  // method that ends the game with a health that has reached 0 or less and an image appears according to the defeated fighter. //
  gameOver() {
    if (this.opposentPlayer.health <= 0) {
      document.getElementById("game-over").play();
      if (this.opposentPlayer === this.players[1]) {
        var endGame = "<img src=' ./images/ken-lose-image.jpg'>";
      } else {
        endGame = "<img src=' ./images/ryu-lose-image.jpg'>";
      }
      $(".fight-button").toggle(function () {
        $(this).replaceWith(endGame);
      });
    }
  }
  // method sound effect. //
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
  // method of updating information of both players. //
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


