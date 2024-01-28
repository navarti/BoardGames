export default class ChessGame{
    constructor(){
        this.storage = window.storage;
        
        this.init();
    }

    init(){
        // //bind change theme button
        // document.querySelector('#changeThemeButton').onclick = (e) => {
        //     e.preventDefault();
        //     this.changeBoardTheme(null);
        //     this.drawBoard();
        // }
        
        document.querySelector('#revertBoardButton').onclick = () => {
            this.forWhite = !this.forWhite;
            this.drawGame();
        }

        this.playFor = document.querySelector('#playFor')
        this.infoDisplay = document.querySelector('#info-display')
        
        
        this.gameBoardName = 'gameboard';
        this.gameBoard = Chessboard(this.gameBoardName, {
            draggable: true,
            dropOffBoard: 'trash',
            sparePieces: true
        });
        this.adjustStyleForBoardTheme();
    }

    removeHighlights (color) {
        const squareClass = 'square-55d63';
        $(`#${this.gameBoardName}`).find('.' + squareClass).removeClass('highlight-' + color);
    }

    addHighlights (color, source, target){
        $(`#${this.gameBoardName}`).find('.square-' + source).addClass('highlight-' + color);
        $(`#${this.gameBoardName}`).find('.square-' + target).addClass('highlight-' + color);
    }

    drawGame(){
        this.infoDisplay.textContent = '';
        this.playFor.innerHTML = this.playerColorWhite ?  'white' : 'black';

        function pieceTheme (piece) {
            if (piece.search(/w/) !== -1) {
              return 'img/chesspieces/wikipedia/' + piece + '.png';
            }
          
            return 'img/chesspieces/wikipedia/' + piece + '.png';
        }

        function removeGreySquares () {
            $(`#${this.gameBoardName} .square-55d63`).css('background', '');
        }
        const bindedRemoveGreySquares = removeGreySquares.bind(this);
    
        function greySquare (square) {
            const whiteSquareGrey = '#a9a9a9';
            const blackSquareGrey = '#696969';
            const $square = $(`#${this.gameBoardName} .square-` + square);

            let background = whiteSquareGrey;
            if ($square.hasClass('black-3c85d')) {
                background = blackSquareGrey;
            }
            
            $square.css('background', background);
        }
        const bindedGreySquare = greySquare.bind(this);

        function onMouseoverSquare (square, piece) {
            // get list of possible moves for this square
            var moves = this.gameLogic.moves({
                square: square,
                verbose: true
            });
          
            // exit if there are no moves available for this square
            if (moves.length === 0) return;
          
            // highlight the square they moused over
            bindedGreySquare(square);
          
            // highlight the possible squares for this piece
            for (var i = 0; i < moves.length; i++) {
                bindedGreySquare(moves[i].to);
            }
        }
        const bindedOnMouseoverSquare = onMouseoverSquare.bind(this);
          
        function onMouseoutSquare (square, piece) {
            bindedRemoveGreySquares();
        }
        const bindedOnMouseoutSquare = onMouseoutSquare.bind(this);


        function onDragStart (source, piece, position, orientation) {
            // do not pick up pieces if the game is over
            if (this.gameLogic.game_over()) return false;
            this.activePosition = position;  
            // get list of possible moves for this square
            var moves = this.gameLogic.moves({
                square: position,
                verbose: true
            });
          
            // exit if there are no moves available for this square
            if (moves.length === 0) return;
          
            // highlight the square they moused over
            bindedGreySquare(square);
          
            // highlight the possible squares for this piece
            for (var i = 0; i < moves.length; i++) {
                bindedGreySquare(moves[i].to);
            }

            // only pick up pieces for the side to move
            // if ((this.gameLogic.turn() === 'w' && piece.search(/^b/) !== -1) ||
            //     (this.gameLogic.turn() === 'b' && piece.search(/^w/) !== -1)) {
            //   return false
            // }
        }
        const bindedOnDragStart = onDragStart.bind(this);

        function onDrop (source, target) {
            // see if the move is legal
            if((this.playerColorWhite && this.gameLogic.turn() !== 'w')
                || (!this.playerColorWhite && this.gameLogic.turn() === 'w')){
                return false;
            }

            const move = this.gameLogic.move({
              from: source,
              to: target,
              promotion: 'q' // NOTE: always promote to a queen for example simplicity
            })
          
            // illegal move
            if (move === null) return 'snapback';
            
            this.source = source;
            this.target = target;
            // this.promotion = 'q';
            this.sendMove();
            this.updateStatus();
            this.removeHighlights(this.playerColorWhite ? 'white' : 'black');
            this.addHighlights(this.playerColorWhite ? 'white' : 'black', source, target);
        }
        const bindedOnDrop = onDrop.bind(this);
          
        // update the board position after the piece snap
        // for castling, en passant, pawn promotion
        function onSnapEnd () {
            this.gameBoard.position(this.gameLogic.fen())
        }
        const bindedOnSnapEnd = onSnapEnd.bind(this);
          
        const config = {
            draggable: true,
            pieceTheme: pieceTheme,
            position: this.gameLogic.fen(),
            orientation: this.forWhite ? 'white' : 'black',
            onDragStart: bindedOnDragStart,
            onDrop: bindedOnDrop,
            onMouseoutSquare: bindedOnMouseoutSquare,
            onMouseoverSquare: bindedOnMouseoverSquare,
            //onMoveEnd: bindedOnMoveEnd,
            onSnapEnd: bindedOnSnapEnd
        }

        this.updateStatus();
        this.gameBoard = Chessboard(this.gameBoardName, config);
        this.adjustStyleForBoardTheme();
        if(this.gameInfo.lastMove){
            this.addHighlights(this.gameInfo.lastMove.color === 'w' ? 'white' : 'black', this.gameInfo.lastMove.source, this.gameInfo.lastMove.target);
        }        
        if(this.gameInfo.secondLastMove){
            this.addHighlights(this.gameInfo.secondLastMove.color === 'w' ? 'white' : 'black', this.gameInfo.secondLastMove.source, this.gameInfo.secondLastMove.target);
        }
    }

    updateStatus () {
        var status = ''
        
        const moveColor = this.gameLogic.turn() === 'w' ? 'White' : 'Black';
        
        // checkmate?
        if (this.gameLogic.in_checkmate()) {
            status = 'Game over, ' + moveColor + ' is in checkmate.'
        }
        
        // draw?
        else if (this.gameLogic.in_draw()) {
            status = 'Game over, drawn position'
        }
        
        // game still on
        else {
            status = moveColor + ' to move'
        
            // check?
            if (this.gameLogic.in_check()) {
            status += ', ' + moveColor + ' is in check'
            }
        }
        this.infoDisplay.textContent = status;
    }

    socketInit(){
        this.socket = this.storage.socket.socket;
        //socket requests
        this.socket.on('send-game', (game) => {
            this.gameInfo = game;
            this.gameLogic = new Chess(game.fen); 
            this.playerColorWhite = this.gameInfo.idWhite === this.storage.socket.playerId;
            this.forWhite = this.playerColorWhite;
            this.drawGame();
        });

        this.socket.on('send-move-from-server', (source, target) => {
            this.gameBoard.move(`${source}-${target}`);
            this.gameLogic.move({
                from: source,
                to: target,
                promotion: 'q' // NOTE: always promote to a queen for example simplicity
            });
            this.removeHighlights(this.playerColorWhite ? 'black' : 'white');
            this.addHighlights(this.playerColorWhite ? 'black' : 'white', source, target);
            this.updateStatus();
        });

        this.socket.on('send-error', () => {
            this.infoDisplay.textContent = 'Illegal move';    
        });
        
        this.socket.emit('get-game');
    }

    sendMove(){
        this.socket.emit('send-move', this.source, this.target);
    }

    adjustStyleForBoardTheme(){
        const board = document.querySelector(`#${this.gameBoardName}`);
        const allElements = board.querySelectorAll('*');

        const whiteSquaresColor = localStorage.lightSquares;
        const blackSquaresColor = localStorage.darkSquares;

        allElements.forEach(element => {
            element.classList.forEach(className => {
                if(className.startsWith('white')){
                    element.style.backgroundColor = whiteSquaresColor; 
                }
                if(className.startsWith('black')){
                    element.style.backgroundColor = blackSquaresColor; 
                }
            });
        });
    }
}




