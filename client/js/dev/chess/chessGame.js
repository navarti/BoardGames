// import { Chess } from 'chess.js'

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

        this.playFor = document.querySelector('#playFor')
        this.infoDisplay = document.querySelector('#info-display')
        
        this.playFor.innerHTML = 'white';
        this.infoDisplay.innerHTML = '';
        
        this.gameBoardName = 'gameboard';
        this.gameBoard = Chessboard(this.gameBoardName, {
            draggable: true,
            dropOffBoard: 'trash',
            sparePieces: true
        });
    }

    drawGame(){
        this.forWhite = this.gameInfo.idWhite === this.storage.socket.playerId;
        this.playFor.innerHTML = this.forWhite ?  'white' : 'black';
        this.infoDisplay.textContent = '';

        // const whiteSquares = localStorage.lightSquares;
        // const blackSquares = localStorage.darkSquares;

        function pieceTheme (piece) {
            if (piece.search(/w/) !== -1) {
              return 'img/chesspieces/wikipedia/' + piece + '.png'
            }
          
            return 'img/chesspieces/wikipedia/' + piece + '.png'
        }

        function onDragStart (source, piece, position, orientation) {
            // do not pick up pieces if the game is over
            if (this.gameLogic.game_over()) return false
          
            // only pick up pieces for the side to move
            if ((this.gameLogic.turn() === 'w' && piece.search(/^b/) !== -1) ||
                (this.gameLogic.turn() === 'b' && piece.search(/^w/) !== -1)) {
              return false
            }
        }
        const bindedOnDragStart = onDragStart.bind(this);

        function onDrop (source, target) {
            // see if the move is legal
            var move = this.gameLogic.move({
              from: source,
              to: target,
              promotion: 'q' // NOTE: always promote to a queen for example simplicity
            })
          
            // illegal move
            if (move === null) return 'snapback'
            
            bindedUpdateStatus();
        }
        const bindedOnDrop = onDrop.bind(this);
          
        // update the board position after the piece snap
        // for castling, en passant, pawn promotion
        function onSnapEnd () {
            this.gameBoard.position(this.gameLogic.fen())
        }
        const bindedOnSnapEnd = onSnapEnd.bind(this);
          
        function updateStatus () {
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
        const bindedUpdateStatus = updateStatus.bind(this);

        const config = {
            draggable: true,
            pieceTheme: pieceTheme,
            position: this.gameLogic.fen(),
            orientation: this.forWhite ? 'white' : 'black',
            onDragStart: bindedOnDragStart,
            onDrop: bindedOnDrop,
            onSnapEnd: bindedOnSnapEnd
        }

        bindedUpdateStatus();
        this.gameBoard = Chessboard(this.gameBoardName, config);
    }

    socketInit(){
        this.socket = this.storage.socket.socket;
        //socket requests
        this.socket.on('send-game', (game) => {
            this.gameInfo = game;
            this.gameLogic = new Chess(game.fen); 
            this.drawGame();
        });

        this.socket.on('send-error', () => {
            this.infoDisplay.textContent = 'Illegal move';    
        });
        
        this.socket.emit('get-game');
    }




    sendMove(){
        //this.socket.emit('send-move', this.positionFrom, this.positionTo);
    }
}




