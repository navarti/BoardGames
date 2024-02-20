import RabbitandWolfs from '../../node_modules/@navarti/rw/RW.js';

export default class RWGame{
    constructor(){        
        this.init();
    }

    init(){
        // //bind change theme button
        // document.querySelector('#changeThemeButton').onclick = (e) => {
        //     e.preventDefault();
        //     this.changeBoardTheme(null);
        //     this.drawBoard();
        // }
        
        // change board orientation
        document.querySelector('#revertBoardButton').onclick = () => {
            if(!this.gameLogic){
                return;
            }
            this.forWhite = !this.forWhite;
            this.drawGame();
        }

        // binding some elements
        this.playFor = document.querySelector('#playFor')
        this.infoDisplay = document.querySelector('#info-display')
        
        //setting board up
        this.gameBoardName = 'gameboard';
        this.gameBoard = Chessboard(this.gameBoardName, {
            draggable: true,
            dropOffBoard: 'trash',
            sparePieces: true,
            pieceTheme: pieceTheme
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

        function onDragStart (source, piece, position, orientation) {
            if(piece === ''){
                return;
            }
            // do not pick up pieces if the game is over
            if (this.gameLogic.game_over() || this.surrender) return false;
            // only pick up pieces for the side to move
            if((this.gameLogic.turn() === 'w' && !this.playerColorWhite) 
                || (this.gameLogic.turn() === 'b' && this.playerColorWhite)){
                return false;
            }
            if ((this.gameLogic.turn() === 'w' && piece.search(/^b/) !== -1) 
                || (this.gameLogic.turn() === 'b' && piece.search(/^w/) !== -1)) {
                return false
            }
        }
        const bindedOnDragStart = onDragStart.bind(this);

        function onDrop (source, target) {
            if(!this.sendMove(source, target)){
                return 'snapback';
            }
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

        //listen to clicks of empty squares
        const board = document.querySelector(`#${this.gameBoardName}`);
        const allElements = board.querySelectorAll('*');

        for(let i=0; i<allElements.length; i++){
            for(let j=0; j<allElements[i].classList.length;j++){
                const className = 'square-';
                if(allElements[i].classList[j].startsWith(className) 
                    && allElements[i].classList[j].length === className.length + 2){
                    
                    const square = allElements[i].classList[j].split('-')[1];
                    // bind onclick
                    allElements[i].addEventListener('click', () => {
                        if(allElements[i].childElementCount !== 0){
                            return;
                        }
                        bindedOnDragStart(square, '', null, null);
                    });
                    break;
                }
            }
        }
    }

    updateStatus (text = null) {
        if(text){
            this.infoDisplay.textContent = text;
            return;
        }
        
        var status = '';
        
        const moveColor = this.gameLogic.turn() === 'w' ? 'White' : 'Black';
        
        // checkmate?
        if (this.gameLogic.game_over()) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }
        
        // game still on
        else {
            status = moveColor + ' to move';
        }
        this.infoDisplay.textContent = status;
    }

    socketInit(){
        this.surrender = false;
        this.socket = window.storage.socket.socket;
        //socket requests
        this.socket.on('send-game', (game) => {
            this.gameInfo = game;
            this.gameLogic = new RabbitandWolfs(game.fen); 
            this.playerColorWhite = this.gameInfo.idWhite === window.storage.getUserInfo().email;
            this.forWhite = this.playerColorWhite;
            this.drawGame();
        });

        this.socket.on('send-move-from-server', (source, target) => {
            this.gameBoard.move(`${source}-${target}`);
            this.gameLogic.move(source, target);
            this.removeHighlights(this.playerColorWhite ? 'black' : 'white');
            this.addHighlights(this.playerColorWhite ? 'black' : 'white', source, target);
            this.updateStatus();
        });

        this.socket.on('surrender-notify', playerId => {
            if(playerId === window.storage.getUserInfo().email){
                this.updateStatus("You surrendered");
            }
            else{
                this.updateStatus("You won because the opponent surrender");
            }
            this.surrender = true;
        });
        
        this.socket.emit('get-game');
    }

    sendMove(source, target){
        // see if the move is legal
        const move = this.gameLogic.move(source, target);
        
        // illegal move
        if (move === null) return false;
        
        this.updateStatus();
        this.removeHighlights(this.playerColorWhite ? 'white' : 'black');
        this.addHighlights(this.playerColorWhite ? 'white' : 'black', source, target);
        this.gameBoard.move(`${source}-${target}`);
        this.activePosition = null;
        this.socket.emit('send-move', source, target);
        return true;
    }

    adjustStyleForBoardTheme(){
        const board = document.querySelector(`#${this.gameBoardName}`);
        const allElements = board.querySelectorAll('*');

        const whiteSquaresColor = localStorage.lightSquares;
        const blackSquaresColor = localStorage.darkSquares;

        for(let i=0; i<allElements.length; i++){
            for(let j=0; j<allElements[i].classList.length;j++){
                if(allElements[i].classList[j].startsWith('white')){
                    allElements[i].style.backgroundColor = whiteSquaresColor;
                    break;
                }
                if(allElements[i].classList[j].startsWith('black')){
                    allElements[i].style.backgroundColor = blackSquaresColor; 
                    break;
                }
            }
        }
    }
}

function pieceTheme (piece) {
    if (piece.search(/w/) !== -1) {
      return 'img/rwpieces/' + piece + '.png';
    }
  
    return 'img/rwpieces/' + piece + '.png';
}

