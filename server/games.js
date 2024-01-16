import Game from "./chess/game.js";

class Games {
    constructor() {
        this.counterGameId = 1;
        this.gameList = [];
        this.playersToGamesDict = {};
    }
    
    addGame(idWhite, idBlack){
        const gameId = this.counterGameId++;
        const game = new Game(gameId, idWhite, idBlack);
        this.gameList.push(game);
        if(this.counterGameId === 1000000){
            this.counterGameId = 1;
        }
        this.playersToGamesDict[idWhite] = game;
        this.playersToGamesDict[idBlack] = game;
    }

    getGameByPlayerId(playerId){
        const game = this.playersToGamesDict[playerId];
        return game;
    }
}

export default Games;
