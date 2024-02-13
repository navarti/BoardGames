exports.printMsg = function() {
    console.log("Rabbit and Wolfs is required here");
}

export default class RabbitWolfs {
    constructor(){
        this.rabbit = 'w';
        this.wolf = 'b';

        this.initBoard();
    }

    initBoard(){
        this.rabbitPos = {row: 1, col: 5};
        this.wolfPos = [{row: 8, col: 2}, {row: 8, col: 4}, {row: 8, col: 6}, {row: 8, col: 8}];
        this.turnOf = this.rabbit;
    }

    move(source, target) {
        // const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const cols = "abcdefgh";

        if(source.length != 2 || target.length != 2){
            return null;
        }

        const colS = cols.indexOf(source[0]) + 1; 
        const rowS = parseInt(source[1]);
        const colT = cols.indexOf(target[0]) + 1; 
        const rowT = parseInt(target[1]);

        if(colS === -1 || colT === -1 || rowS === NaN || rowT === NaN){
            return null;
        }
        source = {row: rowS, col: colS};
        target = {row: rowT, col: colT};
        
        if(this.turnOf === this.rabbit){
            if(!this.isLegalMoveRabbit(source, target)){
                return null;
            }
            this.rabbitPos = target;
            this.turnOf = this.wolf;
        }
        else{
            if(!this.isLegalMoveWolf(source, target)){
                return null;
            }
            try{
                this.wolfPos[this.findWolfSquare(source)] = target;
            }
            catch{
                // impossible, but)))
                return null;
            }
            this.turnOf = this.rabbit;
        }
        return true;
    } 

    fen() {
        let fen = '';
        let emptySquares = 0;
    
        for (let row = 8; row >= 1; row--) {
            for (let col = 1; col <= 8; col++) {
                let isBlackPawn = this.wolfPos.some(pawn => pawn.row === row && pawn.col === col);
                let isWhitePawn = this.rabbitPos.row === row && this.rabbitPos.col === col;

                if (isBlackPawn) {
                    if (emptySquares > 0) {
                        fen += emptySquares;
                        emptySquares = 0;
                    }
                    fen += 'p';
                } else if (isWhitePawn) {
                    if (emptySquares > 0) {
                        fen += emptySquares;
                        emptySquares = 0;
                    }
                    fen += 'P';
                } else {
                    emptySquares++;
                }
            }
            if (emptySquares > 0) {
                fen += emptySquares;
                emptySquares = 0;
            }
            if (row > 1) {
                fen += '/';
            }
        }
    
        fen += ` ${this.turnOf} - - 0 1`; // Adding placeholder values for the remaining FEN fields

        return fen;
    }

    turn(){
        return this.turnOf;
    }

    isGameOver() {
        if(this.rabbitPos.row == 8){
            this.winner = this.rabbit;
            return true;
        }
        if(this.listOfLegalMovesRabbit().length == 0){
            this.winner = this.wolf;
            return true;
        }
        return false;
    }   

    findWolfSquare(square){
        return this.wolfPos.findIndex(wolfP => square.col === wolfP.col && square.row === wolfP.row);
    }

    isRabbitSquare(square){
        if(square.col === this.rabbitPos.col && square.row === this.rabbitPos.row){
            return true;
        }
        return false;
    }

    isNotOutOfBoard(square){
        if(square.col < 1 || square.col > 8){
            return false;
        }
        if(square.row < 1 || square.row > 8){
            return false;
        }
        return true;
    }

    isLegalMoveRabbit(source, target){
        if(!this.isNotOutOfBoard(target)){
            return false;
        }
        if(!this.isRabbitSquare(source)){
            return false;
        }
        if(this.findWolfSquare(target) !== -1){
            return false;
        }
        if(Math.abs(source.row - target.row) != 1){
            return false;
        }
        if(Math.abs(source.col - target.col) != 1){
            return false;
        }
        return true;
    }

    listOfLegalMovesRabbit(){
        res = [];
        for(let i=this.rabbitPos.row-1; i<this.rabbitPos.row+1; i++){
            for(let j=this.rabbitPos.col - 1; j<this.rabbitPos.col+1; j++){
                if(this.isLegalMoveRabbit(this.rabbitPos, {row: i, col: j})){
                    res.push({row: i, col: j});
                }
            }
        }
        return res;
    }

    listOfLegalMovesWolf(){
        res = [];
        this.wolfPos.forEach((wolfP) => {
            for(let j=wolfP.col - 1; j<wolfP.col+1; j++){
                if(this.isLegalMoveRabbit(wolfP, {row: wolfP.row+1, col: j})){
                    res.push({row: i, col: j});
                }
            }
        });
        return res;
    }

    isLegalMoveWolf(source, target){
        if(!this.isNotOutOfBoard(target)){
            return false;
        }
        if(this.findWolfSquare(source) === -1){
            return false;
        }
        if(this.isRabbitSquare(source)){
            return false;
        }
        if(source.row - target.row != 1){
            return false;
        }
        if(Math.abs(source.col - target.col) != 1){
            return false;
        }
        return true;
    }
}