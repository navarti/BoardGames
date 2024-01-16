import Validator from "./validator.js";

class Game {
    constructor(gameId, idWhite, idBlack) {
        this.validator = new Validator();

        this.gameId = gameId;
        this.board = null;

        this.idWhite = idWhite;
        this.idBlack = idBlack;

        this.colors = {}
        this.colors[idWhite] = 'white';
        this.colors[idBlack] = 'black';
        
        this.playerToMove = this.colors[idWhite];
        this.initializePieces();
    }

    initializePieces(){
        this.pieces = {
            rook: 'rook',
            knight: 'knight',
            bishop: 'bishop',
            king: 'king',
            queen: 'queen',
            pawn: 'pawn'
        };

        this.board = [
            [ 
                {piece: this.pieces.rook, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.knight, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.bishop, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.king, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.queen, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.bishop, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.knight, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.rook, color: this.colors[this.idWhite]}
            ],
            [ 
                {piece: this.pieces.pawn, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idWhite]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idWhite]}
            ],
            
            [
                {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, 
                {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}
            ],
            [
                {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, 
                {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}
            ],
            [
                {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, 
                {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}
            ],
            [
                {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, 
                {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}, {piece: '', color: ''}
            ],
            [ 
                {piece: this.pieces.pawn, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.pawn, color: this.colors[this.idBlack]}
            ],
            [ 
                {piece: this.pieces.rook, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.knight, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.bishop, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.king, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.queen, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.bishop, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.knight, color: this.colors[this.idBlack]}, 
                {piece: this.pieces.rook, color: this.colors[this.idBlack]}
            ], 
        ];
    }
    
    move(positionFrom, positionTo, playerId){
        if(!this.validator.checkMove(this, positionFrom, positionTo, playerId)){
            return false;
        }
        this.playerToMove = playerId === this.idWhite ? this.colors[this.idBlack] : this.colors[this.idWhite]; 
        this.board[positionTo[0]][positionTo[1]] = {
            piece: this.board[positionFrom[0]][positionFrom[1]].piece, 
            color: this.board[positionFrom[0]][positionFrom[1]].color
        };
        this.board[positionFrom[0]][positionFrom[1]] = {piece: '', color: ''};
        return true;
    }
}

export default Game;