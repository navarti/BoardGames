import ChessGame from "./games/chessGame.js";
import RWGame from "./games/rwGame.js";

class GameDistributor {
    constructor() {
        this.chessName = 'chess';
        this.rwName = 'rw';

        this.playersInQueue = [];
        this.counterGameId = 1;
        this.gameList = [];
        this.playersToGamesDict = {};
        this.gameStorage = [];
    }

    onCanCreateGame(playerId){
        //check if player is not waiting for game already and not having game in progress

        let isInQueue = false;
        for(let i=0; i<this.playersInQueue.length; i++){
            if(this.playersInQueue[i].playerId === playerId){
                isInQueue = true;
            }
        }
        return !isInQueue && !this.getGameByPlayerId(playerId);
    }

    //return players obj if game created, null if added a player to a queue  
    onCreate(playerId, gameType) {
        if(gameType !== this.chessName 
            && gameType !== this.rwName){
            
            return null;
        }

        for(let i=0; i<this.playersInQueue.length; i++){
            if(this.playersInQueue[i].gameType === gameType){
                const opponentId = this.playersInQueue[i].playerId;
                this.playersInQueue.splice(i, 1);
                
                if(gameType === this.chessName){
                    this.addChessGame(playerId, opponentId);
                }
                else if(gameType === this.rwName){
                    this.addRWGame(playerId, opponentId);
                }

                return {
                    player1: playerId, 
                    player2: opponentId
                };
            }
        }
        this.playersInQueue.push({playerId: playerId, gameType: gameType});
        return null;
    }

    addChessGame(idWhite, idBlack){
        const gameId = this.counterGameId++;
        const game = new ChessGame(gameId, idWhite, idBlack);
        this.gameList.push(game);
        if(this.counterGameId === 1000000){
            this.counterGameId = 1;
        }
        this.playersToGamesDict[idWhite] = game;
        this.playersToGamesDict[idBlack] = game;
    }

    addRWGame(idWhite, idBlack){
        const gameId = this.counterGameId++;
        const game = new RWGame(gameId, idWhite, idBlack);
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

    onSurrended(playerId){
        const game = this.playersToGamesDict[playerId];
        game.surrendedBy = playerId;

        this.onDisposeGame(playerId);
    }

    onRemoveFromQueue(playerId){
        for(let i=0; i<this.playersInQueue.length; i++){
            if(this.playersInQueue[i].playerId === playerId){
                this.playersInQueue.splice(i, 1);
            }
        }
    }

    onDisposeGame(playerId){
        const game = this.playersToGamesDict[playerId];
        this.gameStorage.push({
            idWhite: game.idWhite,
            idBlack: game.idBlack,
            gameId: game.gameId,
            fen: game.engine.fen()
        });
        delete this.playersToGamesDict[game.idWhite];
        delete this.playersToGamesDict[game.idBlack];
    }
}

export default GameDistributor;