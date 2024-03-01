import ChessGame from "./games/chessGame.js";
import RWGame from "./games/rwGame.js";

class GameDistributor {
    constructor() {
        this.chessName = 'chess';
        this.rwName = 'rw';

        this.playersInQueue = [];
        this.playersToIndexesInQueue = {};

        this.counterGameId = 1;
        this.gameList = [];
        this.playersToGamesDict = {};

        this.friendsInvites = [];
        this.invitorsToIndexesInInvites = {};
        this.opponentsToIndexesInInvites = {};
    }

    onCanCreateGame(playerId){
        //check if player is not waiting for game (not in queue) already and not having game in progress

        return !this.invitorsToIndexesInInvites[playerId] 
            && !this.playersToIndexesInQueue[playerId] 
            && !this.getGameByPlayerId(playerId);
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
                delete this.playersToIndexesInQueue[opponentId];

                return {
                    player1: playerId, 
                    player2: opponentId
                };
            }
        }
        this.playersToIndexesInQueue[playerId] = this.playersInQueue.length;
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

    async onSurrended(playerId){
        const game = this.playersToGamesDict[playerId];
        game.winner = game.idWhite === playerId ? 'b' : 'w';
        await this.onDisposeGame(playerId);
    }

    onRemoveFromQueue(playerId){
        this.playersInQueue.splice(this.playersToIndexesInQueue[playerId], 1);
    }

    async onDisposeGame(playerId){
        const game = this.playersToGamesDict[playerId];
        delete this.playersToGamesDict[game.idWhite];
        delete this.playersToGamesDict[game.idBlack];
        await global.db.createGame(game.type, game.engine.fen(), game.idWhite, game.idBlack, game.winner);
    }

    onCreateInviteFriend(invitorId, opponentId, gameType){
        this.invitorsToIndexesInInvites[invitorId] = this.friendsInvites.length;
        this.opponentsToIndexesInInvites[opponentId] = this.friendsInvites.length;
        this.friendsInvites.push({gameType: gameType, invitor: invitorId, opponent: opponentId});
    }

    onAcceptInviteFriend(playerId){
        const invite = this.friendsInvites[this.opponentsToIndexesInInvites[playerId]];

        if(gameType === this.chessName){
            this.addChessGame(invite.invitor, invite.opponent);
        }
        else if(gameType === this.rwName){
            this.addRWGame(invite.invitor, invite.opponent);
        }

        delete this.opponentsToIndexesInInvites[playerId];
        delete this.invitorsToIndexesInInvites[playerId];
    }
}

export default GameDistributor;