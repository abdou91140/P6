class game {
    constructor(mapGame,currentPlayer) {
       this.mapGame = mapGame;
        this.currentPlayer = currentPlayer;
        //this.startGame(){};
        //this.gameOver(){};
        //this.nextTurn(){};
        //this.displayInfosOfGame(){};
        }
        move() {
            $('[src]').click(function () {
                    mapGenerate.cells.forEach(cellGame => {
                            cellGame.forEach(cellInGame => {
                                    if (cellInGame.data === cellData.fighter) {
                    
                                        console.log()
                                    }
                                    })
                            })
                    })
            }
        
}
var gameGenerate = new game(mapGenerate, fightersArr);
gameGenerate.move();
