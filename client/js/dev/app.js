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
            this.bindButtonsWithoutLogIn();
            return;
        }
        this.socketInit();
    }

    socketInit(){
        this.socket = window.storage.socket.socket;
        //as a parameter can pass type of game in case
        this.socket.on('game-ready', () => {
            this.game.socketInit();
            
            this.bindButtonsWhilePlaying();
        });
        this.socket.on('can-create-game-response', canCreate => {
            if(!canCreate){
                this.bindButtonsWhileSeeking();

                this.socket.emit('check-game-in-progress');
            }
            else{
                this.bindButtonsFreeToSeek();
            }
        });
        this.socket.emit('can-create-game');
    }

    bindButtonsWithoutLogIn(){
        document.querySelector('#universalGameButton').onclick = () => {
            alert('Log in to play chess');
        };
    }

    bindButtonsFreeToSeek(){
        document.querySelector('#universalGameButton').value = 'Seek an opponent';
        document.querySelector('#universalGameButton').onclick = () => {
            this.socket.emit(`create-${this.typeOfGame}-game`);
            this.socket.emit('can-create-game');
        };
    }

    bindButtonsWhileSeeking(){
        document.querySelector('#universalGameButton').value = 'Stop seeking an opponent';
                
        //bind to stop seeking
        document.querySelector('#universalGameButton').onclick = () => {
            
        };
    }

    bindButtonsWhilePlaying(){
        document.querySelector('#universalGameButton').value = 'Surrender';

        //bind to surrender
        document.querySelector('#universalGameButton').onclick = () => {
            
        };
    }
}









