import ChessGame from './chess/chessGame.js';
import Storage from './storage.js';
import Auth from './auth.js';
import BoardTheme from './boardTheme.js';

export default class App {
    constructor(){
        window.storage = new Storage();
        this.storage = window.storage;
        this.auth = new Auth();
        this.boardTheme = new BoardTheme();

        this.chess = new ChessGame();

        if(!this.auth.check()){
            this.bindButtonsWithoutSocket();
            return;
        }
        this.socketInit();        
    }

    bindButtonsWithoutSocket(){
        document.querySelector('#createGameButton').onclick = () => {
            alert('Log in to play chess');
        };
    }

    socketInit(){
        this.socket = this.storage.socket.socket;
        this.socket.on('game-ready', () => {
            this.chess.socketInit();
        });

        this.socket.emit('check-game-in-progress');
        this.bindButtonsWithSocket();
    }

    bindButtonsWithSocket(){
        document.querySelector('#createGameButton').onclick = () => {
            this.socket.emit('create-game');
        };
    }
}









