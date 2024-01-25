import Chess from './chess/Chess.js';
import Storage from './storage.js';
import Auth from './auth.js';
import BoardTheme from './boardTheme.js';

export default class App {
    constructor(){
        window.storage = new Storage();
        this.storage = window.storage;
        this.auth = new Auth();
        this.boardTheme = new BoardTheme();

        this.chess = new Chess();

        if(this.auth.check()){
            this.socketInit();        
        }
    }

    socketInit(){
        this.socket = this.storage.socket.socket;
        this.socket.on('game-ready', () => {
            this.chess.socketInit();
        });

        this.socket.emit('check-game-in-progress');
        this.bindButtons();
    }

    bindButtons(){
        document.querySelector('#createGameButton').onclick = () => {
            this.socket.emit('create-game');
        };
    }
}









