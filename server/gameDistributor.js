import ChessGame from "./games/chessGame.js";

class GameDistributor {
    constructor() {
        this.playersInQueue = [];
        this.counterGameId = 1;
        this.gameList = [];
        this.playersToGamesDict = {};
        this.gameStorage = [];
    }

    onCanCreateGame(playerId){
        //check if player is not waiting for game already and not have game in progress
        return !this.playersInQueue.includes(playerId) && !this.getGameByPlayerId(playerId);
    }

    //return players obj if game created, null if added a player to a queue  
    onCreateGame(playerId) {
        if(this.playersInQueue.length === 0){
            this.playersInQueue.push(playerId);
            return null;
        }
        const opponentId = this.playersInQueue[0];
        this.playersInQueue.splice(0, 1);
        
        this.addGame(playerId, opponentId);
        return {
            player1: playerId, 
            player2: opponentId
        };
    }

    addGame(idWhite, idBlack){
        const gameId = this.counterGameId++;
        const game = new ChessGame(gameId, idWhite, idBlack);
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

    onDisposeGame(playerId, fenString){
        const game = this.playersToGamesDict[playerId];
        this.gameStorage.push({
            idWhite: game.idWhite,
            idBlack: game.idBlack,
            gameId: game.gameId,
            fen: fenString
        });
        delete this.playersToGamesDict[game.idWhite];
        delete this.playersToGamesDict[game.idBlack];
    }
}

export default GameDistributor;