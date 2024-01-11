import makeStruct from "makestruct";

class Game {
    constructor(gameId, idWhite, idBlack) {
        const player = new makeStruct("id, color");
        this.gameId = gameId;
        this.board = null;
        this.setStartBoard();

        this.playerWhite = new player(idWhite, 'white');
        this.playerWhite = new player(idBlack, 'black');
        
        this.currentPlayer = this.playerWhite;
    }
    
    setStartBoard(){
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