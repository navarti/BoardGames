import ChessGame from './games/chessGame.js';
import RWGame from './games/rwGame.js';
import Storage from './storage.js';
import Auth from './auth.js';
import BoardTheme from './boardTheme.js';
import Header from './header.js';

export default class App {
    constructor(){
        window.storage = new Storage();
        this.auth = new Auth();
        this.header = new Header(); 
        this.boardTheme = new BoardTheme();

        this.typeOfGame = window.storage.getTypeOfGame();
        if(this.typeOfGame === "chess"){
            this.game = new ChessGame();
        }
        else if(this.typeOfGame === "rw"){
            this.game = new RWGame();
        }

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
        this.socket = window.storage.socket.socket;
        //as a parameter can pass type of game in case
        this.socket.on('game-ready', () => {
            this.game.socketInit();
        });

        this.socket.emit('check-game-in-progress');
        this.bindButtonsWithSocket();
    }

    bindButtonsWithSocket(){
        document.querySelector('#createGameButton').onclick = () => {
            this.socket.emit(`create-${this.typeOfGame}-game`);
        };
    }
}









