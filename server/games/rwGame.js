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
        
        this.rw = new RabbitWolfs();
        this.fen = this.rw.fen();
    }
    
    move(source, target, playerId){
        if(this.players[this.rw.turn()] !== playerId){
            return false;
        }
        const color = this.rw.turn();
        const move = this.rw.move(source, target);
        // illegal move
        if (move === null) return false;
        this.secondLastMove = this.lastMove;
        this.lastMove = {
            color: color,
            source: source,
            target: target
        };
        this.fen = this.rw.fen();        
        return true;
    }
}

export default RWGame;