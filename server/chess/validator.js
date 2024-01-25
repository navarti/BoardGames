class Validator {
    checkMove(game, positionFrom, positionTo, playerId){
        if(!this.checkPlayer(game, positionFrom, positionTo, playerId)){
            return false;
        }

        if(!this.checkMoveByPiece(game, positionFrom, positionTo)){
            return false;
        }

        this.checkOwnCheck(game, positionFrom, positionTo);

        checkOpponentCheck(game)
        return true;
    }

    checkMoveByPiece(game, positionFrom, positionTo){
        switch(game.board[positionFrom[0]][positionFrom[1]].piece){
            case 'pawn':
                function checkMoveByPawn(row2, row3, row4){
                    //pawn moves forward by 2 cell on its first move
                    if(positionFrom[1] === positionTo[1] && positionFrom[0] === row2 && positionTo[0] === row4){
                        if(game.board[positionTo[0]][positionTo[1]].piece === '' && game.board[row3][positionTo[1]].piece === ''){
                            return true;
                        }
                        return false;
                    }
                    //pawn moves forward
                    if(positionFrom[0] + (row3 - row2) === positionTo[0]){
                        if(positionFrom[1] === positionTo[1] ){
                            //the cell is free
                            if(game.board[positionTo[0]][positionTo[1]].piece === ''){
                                return true;
                            }
                            //the cell is taken
                            return false;
                        }
                        //pawn eats neighbor
                        if(Math.abs(positionFrom[1] - positionTo[1]) < 2){
                            return true;
                        }
                    }
                    return false;
                }
                if(game.info[game.playerToMove].color === 'white'){
                    return checkMoveByPawn(1, 2, 3);
                }
                else{
                    return checkMoveByPawn(6, 5, 4);
                }
            case 'knight':
                if(Math.abs(positionFrom[1]-positionTo[1]) === 2 && Math.abs(positionFrom[0]-positionTo[0]) === 1){
                    return true;
                }
                if(Math.abs(positionFrom[1]-positionTo[1]) === 1 && Math.abs(positionFrom[0]-positionTo[0]) === 2){
                    return true;
                }
                return false;
            case 'bishop':
                if(Math.abs(positionFrom[1]-positionTo[1]) !== Math.abs(positionFrom[0]-positionTo[0])){
                    return false;
                }
                const addX = positionFrom[0] > positionTo[0] ? -1 : 1;
                const addY = positionFrom[1] > positionTo[1] ? -1 : 1;
                let y = positionFrom[1] + addY;

                for(let i=positionFrom[0]+addX; addX === 1 ? i<positionTo[0] :  i>positionTo[0]; i+=addX){
                    if(game.board[i][y].piece !== ''){
                        return false;
                    }
                    y+=addY;
                }                    
                return true;
            case 'rook':
                if(positionFrom[1] !== positionTo[1] && positionFrom[0] !== positionTo[0]){
                    return false;
                }
                for(let i=Math.min(positionFrom[1], positionTo[1])+1; i<Math.max(positionFrom[1], positionTo[1]); i++){
                    if(game.board[i][positionFrom[0]].piece !== ''){
                        return false;
                    }
                }
                for(let i=Math.min(positionFrom[0], positionTo[0])+1; i<Math.max(positionFrom[0], positionTo[0]); i++){
                    if(game.board[i][positionFrom[1]].piece !== ''){
                        return false;
                    }
                }
                return true;
            case 'king':
                //write to forbid move under attack

                if(Math.abs(positionFrom[1]-positionTo[1]) < 2 && Math.abs(positionFrom[0]-positionTo[0]) < 2){
                    return true;
                }
                return false;
            case 'queen':
                const bishopGame = JSON.parse(JSON.stringify(game));
                const rookGame = JSON.parse(JSON.stringify(game));

                bishopGame.board[positionFrom[0]][positionFrom[1]].piece = 'bishop';
                rookGame.board[positionFrom[0]][positionFrom[1]].piece = 'rook';

                const bishopMove = this.checkMoveByPiece(bishopGame, positionFrom, positionTo);
                const rookMove = this.checkMoveByPiece(rookGame, positionFrom, positionTo);
                if(bishopMove || rookMove){
                    return true;
                }
                return false;
            default:
                return false;
        }
    }

    getLegalMoves(game, playerId){
        game.board.forEach((row, i) => {
            row.forEach((square, j) => {
                if(game.pieces.color === game.info[game.playerToMove].color){
                    if(this.checkMoveByPiece(game, [i, j], kingPos)){
                        return true;
                    }
                }
            })
        });


    }

    checkPlayer(game, positionFrom, positionTo, playerId){
        //check if the move is done by current player
        if(game.info[game.playerToMove].color !== game.info[playerId].color){
            return false;
        }
        
        //check if it is an opponent's piece
        if(game.board[positionFrom[0]][positionFrom[1]].color !== game.info[game.playerToMove].color){
            return false;
        }
        
        //check if a person tries to eat an own piece
        if(game.board[positionTo[0]][positionTo[1]].color === game.info[game.playerToMove].color){
            return false;
        }
        return true;
    }

    // check if opponents king will be under attack
    checkOpponentCheck(game){
        game.info[this.playerWaiting].check = false;
        const kingPos = this.findOpponentKing(game);
        game.board.forEach((row, i) => {
            row.forEach((square, j) => {
                if(game.pieces.color === game.info[game.playerToMove].color){
                    if(this.checkMoveByPiece(game, [i, j], kingPos)){
                        return true;
                    }
                }
            })
        });
        game.info[this.playerWaiting].check = true;
        return false;
    }

    // check if player's king will be under attack
    checkOwnCheck(game, positionFrom, positionTo){
        const newGame = JSON.parse(JSON.stringify(game));
        
        newGame.swapPlayers();
        newGame.updateBoard(positionFrom, positionTo);
        
        if(this.checkOpponentCheck(newGame)){
            return true;
        }
        return false;
    }

    findOpponentKing(game){
        const kingColor = game.info[this.playerWaiting].color; 
        game.board.forEach((row, i) => {
            row.forEach((square, j) => {
                if(game.pieces.king === square.piece && square.color === kingColor){
                    return [i, j];
                }
            })
        })
        return null;
    }
}

export default Validator;