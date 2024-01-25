import Validator from "./validator.js";
import { Chess } from 'chess.js'

class Game {
    constructor(gameId, idWhite, idBlack) {
        this.validator = new Validator();
        this.idWhite = idWhite;
        this.idBlack = idBlack;

        this.gameId = gameId;
        
        this.players = {};
        this.players['w'] = idWhite;
        this.players['b'] = idBlack;
        
        this.chess = new Chess();
        this.fen = this.chess.fen();
    }
    
    move(positionFrom, positionTo, playerId){
        if(this.players[this.chess.turn()] !== playerId){
            return false;
        }
        try{
            this.chess.move({from: positionFrom, to: positionTo});
            this.fen = this.chess.fen();
        }
        catch(err){
            return false;
        }
        return true;
    }
}

export default Game;