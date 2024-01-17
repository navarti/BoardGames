import Chess from './chess/Chess.js';
import Socket from './socket.js';

export default class App {
    constructor(){
        const socket = new Socket();
        this.socket = socket.socket; 
        this.chess = null;

        this.socket.on('send-alert', warning => {
            alert(warning);
        });
        this.socket.on('game-ready', () => {
            this.launchGame();
        });
        
        this.bindButtons();
    }

    async bindButtons(){
        //to fix
        document.querySelector('#playerId').value = 1; 
        document.querySelector('#checkGameButton').onclick = () => {
            const playerId = parseInt(document.querySelector('#playerId').value);
            if(typeof playerId === 'number'){
                global.playerId = playerId;
            }
            this.socket.emit('check-game-in-progress', global.playerId);
        };
        document.querySelector('#createGameButton').onclick = () => {
            const playerId = parseInt(document.querySelector('#playerId').value);
            if(typeof playerId === 'number'){
                global.playerId = playerId;
            }
            this.socket.emit('create-game', global.playerId);
        };
    }

    async launchGame(){      
        document.querySelector('.game-section').style.display = 'flex';
        const gameBoard = document.querySelector('#gameboard');
        this.chess = new Chess(this.socket, gameBoard);
    }
}









