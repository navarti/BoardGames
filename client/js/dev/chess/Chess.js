export default class Chess{
    constructor(){
        this.storage = window.storage;
        this.gameInfo = null;
        
        this.init();
    }

    init(){
        // //bind change theme button
        // document.querySelector('#changeThemeButton').onclick = (e) => {
        //     e.preventDefault();
        //     this.changeBoardTheme(null);
        //     this.drawBoard();
        // }    

        this.playerMove = document.querySelector('#playerMove')
        this.playFor = document.querySelector('#playFor')
        this.infoDisplay = document.querySelector('#info-display')
        
        this.playerMove.innerHTML = 'white';
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

        function pieceTheme (piece) {
            // wikipedia theme for white pieces
            if (piece.search(/w/) !== -1) {
              return 'img/chesspieces/wikipedia/' + piece + '.png'
            }
          
            // alpha theme for black pieces
            return 'img/chesspieces/alpha/' + piece + '.png'
        }

        // const config = {
        //     draggable: true,
        //     pieceTheme: pieceTheme,
        // }

        // this.gameBoard = Chessboard(this.gameBoardName, this.gameInfo.fen);
        this.gameBoard.sparePieces = false;
    }

    socketInit(){
        this.socket = this.storage.socket.socket;
        //socket requests
        this.socket.on('send-game', (game) => {
            this.gameInfo = game;
            this.drawGame();
        });

        this.socket.on('send-error', () => {
            this.infoDisplay.textContent = 'Illegal move';    
        });
        
        this.socket.emit('get-game');
    }

    // drawBoard(){
    //     this.gameBoardHTML.innerHTML = '';
    //     this.infoDisplay.textContent = '';
        
    //     this.playerDisplay.textContent = this.gameInfo.info[this.gameInfo.playerToMove].color;

    //     const whiteSquares = localStorage.lightSquares;
    //     const blackSquares = localStorage.darkSquares;

        
    // }

    sendMove(){


        //this.socket.emit('send-move', this.positionFrom, this.positionTo);
    }
}