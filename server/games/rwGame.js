import RabbitWolfs from '@navarti/rw';

class RWGame {
    constructor(gameId, idWhite, idBlack) {
        this.type = "rw";
        
        this.idWhite = idWhite;
        this.idBlack = idBlack;

        this.lastMove = null;
        this.secondLastMove = null;
        this.gameId = gameId;
        
        this.players = {};
        this.players['w'] = idWhite;
        this.players['b'] = idBlack;

        this.winner = null;
        
        this.engine = new RabbitWolfs();
        this.fen = this.engine.fen();
    }
    
    move(source, target, playerId){
        if(this.players[this.engine.turn()] !== playerId){
            return false;
        }
        const color = this.engine.turn();
        const move = this.engine.move(source, target);
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

    //for using with chess which has another method with gameOver
    isGameOver(){
        return this.engine.game_over();
    }
}

export default RWGame;