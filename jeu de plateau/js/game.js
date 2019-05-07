// Objet du déroulement du jeux , avec les fonctions pour le mouvements des joueurs , fonctions d'affichage , fonctions de combat, et d'effets sonore.
class Game {
  constructor(mapGame, players) {
    this.mapGame = mapGame;
    this.players = players;
    this.currentPlayer;
  }
  // méthode du début du jeux avec un bouton avec un effet de fondu en jquery.
  startGame() {
    let game = this;
    $(".jouez").click(function () {
      $(this).fadeToggle(700);
      game.choosePlayer();
      game.lightAccessibleCells()
    });
  }
  // méthode des touches du clavier pour le mouvements des joueurs.
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
  // choix du joueur aléatoirement qui débute this.currentPlayer.
  choosePlayer() {
    this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)];
    // placer la fonction juste après choosePlayer.
  }
  // tour par tour avec changement de couleurs de l'arrière plan de celui qui joue.
  nextToPlay() {
    this.unsetlightAccessibleCells();
    this.togglePlayer();
    this.showWhoPlaying(this.currentPlayer);
    this.lightAccessibleCells();
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
    } else {
      $(".ken-infos").css("background-color", "yellow");
      $(".ryu-infos").css("background-color", "white");
    }
  }
checkIfCellHasobstacle(x,y) {
  if (this.mapGame.cells[x][y].obstacle instanceof Obstacle) {
    return false
  }
  return true
}
  checkIfCellHasWeapon(x, y) {
    if (this.mapGame.cells[x][y].weapon instanceof Weapon) {
      this.swapWeapon(this.currentPlayer.x, this.currentPlayer.y);
    }
    return false;
  }
checkIfCellHasFighter(x, y) {
  if (this.currentPlayer === this.players[0]) {
    if (this.mapGame.cells[x][y].fighter === this.players[1]) {
      return true
    } else {
      return false
    }
  } else {
    if (this.mapGame.cells[x][y].fighter === this.players[0]) {
      // if(Object.getOwnPropertyDescriptor(this.mapGame.cells[x], 'fighter') === false  ){ 
      return true
    } else {
      return false
    }
  }
}

  checkIfCellContainFighter(x, y) {
 
if(this.checkIfCellHasFighter(x+1,y)|| this.checkIfCellHasFighter(x-1,y) || this.checkIfCellHasFighter(x,y+1)|| this.checkIfCellHasFighter(x,y-1)){  
  this.fight()
   } 
  }
  calculateNewCoordonate(direction) {

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
        };
        break;
      case "down":
        newCoordonate = {
          x: this.currentPlayer.x,
          y: this.currentPlayer.y + 1
        };
        break;
      case "up":
        newCoordonate = {
          x: this.currentPlayer.x,
          y: this.currentPlayer.y - 1
        };
        break;
      default:
        newCoordonate = {
          x: this.currentPlayer.x,
          y: this.currentPlayer.y
        };
        break;
    }
    return newCoordonate
  }
  // méthode de mouvement qui transmet les données du joueur qui doit se déplacer vers la céllule de destination.
  move(direction) {
    if (
      this.currentPlayer.move === true &&
      this.currentPlayer.movementCount > 0
    ) {
      let newCoordonate = this.calculateNewCoordonate(direction)
      let oldCoordonate = {
        x: this.currentPlayer.x,
        y: this.currentPlayer.y
      };
      this.mapGame.cells[oldCoordonate.x][oldCoordonate.y].fighter = null;
      // condition qui évite de faire un mouvement sortant de la map.
      /* if (this.checkIfCellsExist(newCoordonate.x, newCoordonate.y) &&
         this.checkIfCellsNormal(newCoordonate.x, newCoordonate.y)

       ) {*/
      //transfères des données vers les coordonnées de la cellules sur laquelle on souhaite aller.
      if(this.checkIfCellHasobstacle(newCoordonate.x, newCoordonate.y)){
      this.mapGame.cells[newCoordonate.x][newCoordonate.y].fighter = this.currentPlayer;
      console.log(this.mapGame.cells[newCoordonate.x][newCoordonate.y]);
      console.log(this.mapGame.cells[newCoordonate.x][newCoordonate.y].fighter);
     
      this.currentPlayer.x = newCoordonate.x;
      this.currentPlayer.y = newCoordonate.y;
      this.checkIfCellContainFighter(this.currentPlayer.x, this.currentPlayer.y)
      this.checkIfCellHasWeapon(newCoordonate.x, newCoordonate.y)
      }
      

      this.updateBoard(oldCoordonate.x, oldCoordonate.y);
      this.unsetlightAccessibleCells(); // faire méthod qui gère le décompte et le lit name nextMovement.
      this.currentPlayer.movementCount--;
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
  clearCell(x, y) {
    $(`#${x}-${y}`).html("");
    return;
  }
  createNewElmImage() {
    let cellOrigine = document.createElement("img");
    return cellOrigine;
  }
  updateCellImage(x, y) {
    let imgCell;
    if (this.mapGame.cells[x][y].weapon instanceof Weapon) {
      imgCell = "../images/" + this.mapGame.cells[x][y].weapon.img;
    } else {
      imgCell = "../images/" + this.mapGame.cells[x][y].img;
    }
    return imgCell;
  }
  updateCellFighterImage() {
    let imgCellDestination = "../images/" + this.currentPlayer.img;
    return imgCellDestination;
  }
  updateBoard(x, y) {
    this.clearCell(x, y);
    let cellimgOld = this.createNewElmImage();
    cellimgOld.src = this.updateCellImage(x, y);
    $(`#${x}-${y}`).html(cellimgOld);
    let cellimgNew = this.createNewElmImage();
    cellimgNew.src = this.updateCellFighterImage();
    $(`#${this.currentPlayer.x}-${this.currentPlayer.y}`).html(cellimgNew);
  }

  // méthode d'allumage des céllules de déplacement.
  lightAccessibleCells(x, y) {
    //créer fonction qui rassemble toute les vérification des cells dispo et l'appeler dans mov() et litAccesiblecell().
    $(`#${x + 1}-${y}`)
      .css("background", "yellow")
    // .addClass("authorized");
    $(`#${x}-${y}`)
      .css("background", "yellow")
    // .addClass("authorized");
    $(`#${x}-${y}`)
      .css("background", "yellow")
      .addClass("authorized");
    $(`#${x}-${y}`)
      .css("background", "yellow")
    //  .addClass("authorized");
  }
  // méthode d'initialiation de l'arrière plan en noir pour éteindre les céllules allumé en jaune.
  unsetlightAccessibleCells() {
    for (let x = 0; x < this.mapGame.boardSize + 1; x++) {
      for (let y = 0; y < this.mapGame.boardSize + 1; y++) {
        $(`#${x}-${y}`)
          .css("background", "black")
          .removeClass("authorized");
      }
    }
  }
  // méthode de combat avec une
  fight() {
    this.nextToPlay()
    this.displayTheFight()
    let game = this;
    $(".attack").click(function () {
      game.currentPlayer.statut.attack;
      game.currentPlayer.attackOpposent(game)
    });
    $(".defence").click(function () {
      fightStatut.defenceOpposent()
    });
  }
  displayTheFight() {
    $("#base").toggle(function () {
      $(".attack").css("display", "inline");
      $(".defence").css("display", "inline");
    });
    document.getElementById("fight-start").play();
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
      $(".middle-page").html(endGame);
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
/*window.onload = function() {
document.getElementById("intro").play();
}*/