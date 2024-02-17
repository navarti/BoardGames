import { Chess } from 'chess.js';

class ChessGame {
    constructor(gameId, idWhite, idBlack) {
        this.type = "chess";
        
        this.idWhite = idWhite;
        this.idBlack = idBlack;

        this.lastMove = null;
        this.secondLastMove = null;
        this.gameId = gameId;
        
        this.players = {};
        this.players['w'] = idWhite;
        this.players['b'] = idBlack;

        this.surrendedBy = null;

        this.engine = new Chess();
        this.fen = this.engine.fen();
    }
    
    move(source, target, playerId){
        if(this.players[this.engine.turn()] !== playerId){
            return false;
        }
        const color = this.engine.turn();
        const move = this.engine.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });
        // illegal move
        if (move === null) return false;
        this.secondLastMove = this.lastMove;
        this.lastMove = {
            color: color,
            source: source,
            target: target
        };
        this.fen = this.engine.fen();        
        return true;
    }

    //for using with rw which has another function with gameOver 
    isGameOver(){
        return this.engine.isGameOver();
    }
}

export default ChessGame;