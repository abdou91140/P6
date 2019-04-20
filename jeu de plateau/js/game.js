class Game {
  constructor(mapGame, players) {
    this.mapGame = mapGame;
    this.players = players;
    this.currentPlayer;
  }


  startGame() {
    $(".jouez").one("click", function () {
      gameGenerate.choosePlayer();
      // gameGenerate.movementOfPlayer()
    });
  }

  choosePlayer() {
    this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)];
    $(".jouez").fadeToggle(700);
    console.log(this.currentPlayer)
    gameGenerate.lightingboard();
  }

  lightingboard() {
    for (let i = 0; i < 4; i++) {
      //   do {
      $(`#${this.currentPlayer.x + i}-${this.currentPlayer.y}`).css("background", "yellow").addClass("authorized")
      $(`#${this.currentPlayer.x - i}-${this.currentPlayer.y}`).css("background", "yellow").addClass("authorized")
      $(`#${this.currentPlayer.x}-${this.currentPlayer.y + i}`).css("background", "yellow").addClass("authorized")
      $(`#${this.currentPlayer.x}-${this.currentPlayer.y - i}`).css("background", "yellow").addClass("authorized")
      // } while (this.currentPlayer.x + 1 <= this.mapGame.sizeBoard - 1 && this.currentPlayer.x - 1 >= 0 && this.currentPlayer.y + 1 <= this.mapGame.sizeBoard - 1 && this.currentPlayer.y - 1 >= 0 && this.mapGame.board[this.currentPlayer.x+i][this.currentPlayer.y].type === cellTypes.obstacle) {
    }
    this.clickBiding()
  }

  clickBiding() {
    let game = this;
    $(".authorized").one("click", function () {
      game.updatePositionPlayer($(this).attr("id"));
    })
  }

  unsetClickBiding() {
    $(".authorized").unbind("click");
  }

  unsetLightingboard(position) {
    for (let j = 0; j < 4; j++) {
      $(`#${position.x + j}-${position.y}`).css("background", "black").removeClass("authorized");
      $(`#${position.x - j}-${position.y}`).css("background", "black").removeClass("authorized");
      $(`#${position.x }-${position.y + j}`).css("background", "black").removeClass("authorized");
      $(`#${position.x }-${position.y - j}`).css("background", "black").removeClass("authorized");
    }
  }

  updatePositionPlayer(id) {
    // console.log(this.currentPlayer)
    
    let newPosition = {
      x: id[0],
      y: id[2]
    };
    let currentPosition = {
      x: this.currentPlayer.x,
      y: this.currentPlayer.y
    };

    this.mapGame.board[newPosition.x][newPosition.y] = this.currentPlayer;
    this.mapGame.board[currentPosition.x][currentPosition.y].fighter = null;
    this.currentPlayer.x = newPosition.x;
    this.currentPlayer.y = newPosition.y;
    // console.log(this.currentPlayer)
    this.unsetLightingboard(currentPosition)
    this.swapWeaponByPassing(newPosition)
    this.updateImgOnBoard(currentPosition)

  }
  swapWeaponByPassing(newPosition) {
  let destinations = this.mapGame.board[newPosition.x][newPosition.y]; 
    if (destinations.weapon instanceof Weapon) {
      var weaponExchange = this.mapGame.board[newPosition.x][newPosition.y].weapon;
      this.mapGame.board[newPosition.x][newPosition.y].weapon = this.currentPlayer.weapon;
      this.currentPlayer.weapon = weaponExchange;
    }
  }
  updateImgOnBoard(currentPosition) {
    // console.log(this.currentPlayer)
    let cellOrigine = $(`#${currentPosition.x}-${currentPosition.y}`).html("");
    let imgOrigine = document.createElement("img")
    if (this.mapGame.board[this.currentPlayer.x][this.currentPlayer.y].weapon instanceof Weapon) {
      imgOrigine.src = "../images/" + this.mapGame.board[this.currentPlayer.x][this.currentPlayer.y].weapon.img;
      console.log(imgOrigine)
    } else {
      imgOrigine.src = "../images/" + this.mapGame.board[this.currentPlayer.x][this.currentPlayer.y].img;
      console.log(imgOrigine)
    }
    cellOrigine.html(imgOrigine)
    let cellDestination = $(`#${this.currentPlayer.x}-${this.currentPlayer.y}`).html("")
    let imgDestination = document.createElement("img")
    imgDestination.src = "../images/" + this.currentPlayer.img;
    cellDestination.html(imgDestination)
    this.unsetClickBiding()
    this.nextTurn()
    // console.log(this.currentPlayer)
  }
  nextTurn() {
    this.lightingboard()
    if(this.currentPlayer===this.players[0]){
 this.currentPlayer = this.players[1]
    }else{ 
  this.currentPlayer = this.players[0]
    }
  }
}
var gameGenerate = new Game(mapGenerate, fightersArr);
gameGenerate.startGame();
//gameGenerate.unBind();
//gameGenerate.unsetLightingboard();
/*window.onload = function () {
document.getElementById("intro").play();
}*/

//gameGenerate.resetPrint();