class game {
  constructor(mapGame, players) {
    this.mapGame = mapGame;
    this.players = players;
    this.currentPlayer = players[0];
    //this.startGame(){};
    //this.gameOver(){};
    //this.nextTurn(){};
    //this.displayInfosOfGame(){};
  }
  move(direction) {


      // function qui doit servir à échanger les armes présentes sur la case.

      //transfère des données de la case d'origine du fighter vers sa destination et retirer les éléments de la case de départ.  
      let newCoordonate;

      switch (direction) {
        case "right":
          newCoordonate = { x:this.currentPlayer.x +1, y : this.currentPlayer.y} ;
          break;
        case "left":
         newCoordonate = { x:this.currentPlayer.x -1, y : this.currentPlayer.y} 
          break;
        case "up":
         newCoordonate = { x:this.currentPlayer.x, y : this.currentPlayer.y +1} 
          break;
        case "down":
         newCoordonate = { x:this.currentPlayer.x, y : this.currentPlayer.y -1} 
          break;
        default: 
         newCoordonate = { x:this.currentPlayer.x, y : this.currentPlayer.y} 
          break;
      }

      if ( newCoordonate.x + 1 <= this.mapGame.size - 1) {
        let destinationRight = this.mapGame.cells[newCoordonate.x][newCoordonate.y];
        if (destinationRight.type === cellTypes.normal && destinationRight.fighter === null) {
          this.mapGame.cells[newCoordonate.x][newCoordonate.y].fighter = this.currentPlayer;
          this.mapGame.cells[newCoordonate.x][newCoordonate.y].fighter = null;
          this.currentPlayer.x = newCoordonate.x;
          this.currentPlayer.y= newCoordonate.y;
          console.log(this.players, this.currentPlayer)

       if (destinationRight.weapon instanceof Weapon) {}
        }
       
      }//accès à la cellule du fighter avec une notation template litérale.
      $(`#${this.currentPlayer.x}-${this.currentPlayer.y}`).html("<div></div>");
      let img =document.createElement("img");
      img.src = "../css/" + this.currentPlayer.img;
      $(`#${newCoordonate.x}-${newCoordonate.y}`).append(img)

    }
          



        }
        var gameGenerate = new game(mapGenerate, fightersArr);
        gameGenerate.move("right");