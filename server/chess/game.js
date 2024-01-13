class Game {
    constructor(gameId, idWhite, idBlack) {
        this.gameId = gameId;
        this.board = null;

        this.colors = {
            playerWhite: 'white',
            playerBlack: 'black',
        };

        this.playerIds = {
            playerWhite: idWhite,
            playerBlack: idBlack,
        };
        
        this.playerToMove = this.colors.playerWhite;
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
            [ ['rook', 'white'], ['knight', 'white'], ['bishop', 'white'], ['king', 'white'], ['queen', 'white'], ['bishop', 'white'], ['knight', 'white'], ['rook', 'white']],
            [['pawn', 'white'], ['pawn', 'white'], ['pawn', 'white'], ['pawn', 'white'], ['pawn', 'white'], ['pawn', 'white'], ['pawn', 'white'], ['pawn', 'white']],
            [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''],],
            [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''],],
            [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''],],
            [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''],],
            [['pawn', 'black'], ['pawn', 'black'], ['pawn', 'black'], ['pawn', 'black'], ['pawn', 'black'], ['pawn', 'black'], ['pawn', 'black'], ['pawn', 'black']],
            [['rook', 'black'], ['knight', 'black'], ['bishop', 'black'], ['king', 'black'], ['queen', 'black'], ['bishop', 'black'], ['knight', 'black'], ['rook', 'black']],
        ];
    } 
}

export default Game;