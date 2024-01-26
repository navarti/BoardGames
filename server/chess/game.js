import { Chess } from 'chess.js'

class Game {
    constructor(gameId, idWhite, idBlack) {
        this.idWhite = idWhite;
        this.idBlack = idBlack;

        this.gameId = gameId;
        
        this.players = {};
        this.players['w'] = idWhite;
        this.players['b'] = idBlack;
        
        this.chess = new Chess();
        this.fen = this.chess.fen();
    }
    
    move(source, target, playerId){
        if(this.players[this.chess.turn()] !== playerId){
            return false;
        }
        const move = this.chess.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });
        // illegal move
        if (move === null) return false;
        this.fen = this.chess.fen();        
        return true;
    }
}

export default Game;