import Game from "./chess/game.js";

class Games {
    constructor() {
        this.counterGameId = 1;
        this.gameList = []
    }
    
    addGame(idWhite, idBlack){
        const gameId = this.counterGameId++;
        this.gameList.push(new Game(gameId, idWhite, idBlack));
        if(this.counterGameId === 1000000){
            this.counterGameId = 1;
        }
        return gameId;
    }

    getGameByGameId(gameId){
        for(let i=0; i<this.gameList;i++){
            if(this.gameList[i].gameId === gameId){
                return this.gameList[i];
            }
        }
        return null;
    }
}

export default Games;
