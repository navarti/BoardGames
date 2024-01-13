import Game from "./chess/game.js";

class Games {
    constructor() {
        this.counterGameId = 1;
        this.gameList = [];
        this.playersToGamesDict = {};
    }
    
    addGame(idWhite, idBlack){
        const gameId = this.counterGameId++;
        this.gameList.push(new Game(gameId, idWhite, idBlack));
        if(this.counterGameId === 1000000){
            this.counterGameId = 1;
        }
        this.playersToGamesDict[idWhite] = gameId;
        this.playersToGamesDict[idBlack] = gameId;
    }

    getGameByPlayerId(playerId){
        const game = this.getGameByGameId(this.playersToGamesDict[playerId]);
        return game;
    }

    getGameByGameId(gameId){
        for(let i=0; i<this.gameList.length;i++){
            if(this.gameList[i].gameId === gameId){
                return this.gameList[i];
            }
        }
        return null;
    }
}

export default Games;
