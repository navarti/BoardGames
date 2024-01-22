import Chess from './chess/Chess.js';
import BoardTheme from './boardTheme.js';
import Storage from './storage.js';
import Auth from './auth.js';

export default class App {
    constructor(){
        window.storage = new Storage();
        this.storage = window.storage;

        this.auth = new Auth();
        this.boardTheme = new BoardTheme();

        if(!this.auth.check()){
            return;
        }

        this.socket = this.storage.socket.socket;
        this.chess = null;

        this.socket.on('game-ready', () => {
            this.launchGame();
        });
        this.socket.emit('check-game-in-progress');
        this.bindButtons();
    }

    async bindButtons(){
        document.querySelector('#createGameButton').onclick = () => {
            this.socket.emit('create-game');
        };
    }

    async launchGame(){      
        document.querySelector('.game-section').style.display = 'flex';
        const gameBoard = document.querySelector('#gameboard');
        this.chess = new Chess(gameBoard);
    }
}









