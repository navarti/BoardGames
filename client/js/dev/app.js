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

        this.socket = this.storage.socket.socket;
        this.chess = null;

        // this.socket.on('send-alert', warning => {
        //     alert(warning);
        // });
        this.socket.on('game-ready', () => {
            this.launchGame();
        });
        
        this.socket.emit('check-game-in-progress', this.storage.playerId);
        this.bindButtons();
    }

    async bindButtons(){
        //to fix
        document.querySelector('#playerId').value = this.storage.playerId; 
        document.querySelector('#checkGameButton').onclick = () => {
            const playerId = parseInt(document.querySelector('#playerId').value);
            if(typeof playerId === 'number'){
                this.storage.changePlayerId(playerId);
            }
            this.socket.emit('check-game-in-progress', this.storage.playerId);
        };
        document.querySelector('#createGameButton').onclick = () => {
            const playerId = parseInt(document.querySelector('#playerId').value);
            if(typeof playerId === 'number'){
                this.storage.changePlayerId(playerId);
            }
            this.socket.emit('create-game', this.storage.playerId);
        };
    }

    async launchGame(){      
        document.querySelector('.game-section').style.display = 'flex';
        const gameBoard = document.querySelector('#gameboard');
        this.chess = new Chess(gameBoard);
    }
}









