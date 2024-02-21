import ChessGame from './games/chessGame.js';
import RWGame from './games/rwGame.js';

export default class GameManager {
    constructor(){
        this.typeOfGame = window.storage.getTypeOfGame();
        if(this.typeOfGame === "chess"){
            this.game = new ChessGame();
        }
        else if(this.typeOfGame === "rw"){
            this.game = new RWGame();
        }

        if(!window.storage.getAuth()){
            this.bindButtonsWithoutLogIn();
            return;
        }

        // this.bindElements();
        this.socketInit();
    }

    bindElements(){
        // document.querySelector('#profileButton').onclick = () => {
        //     document.querySelector('.game-section').classList.add('d-none');
        // }

        // document.querySelector('#profileButton').addEventListener('click', () => {
        //     document.querySelector('.game-section').classList.add('d-none');  
        // });
    }

    socketInit(){
        this.socket = window.storage.socket.socket;
        this.socket.on('surrender-notify', playerId => {
            this.bindButtonsFreeToSeek();
        });
        
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
        this.socket.on('gameOver-notify', () => {
            this.bindButtonsFreeToSeek();
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
            this.socket.emit(`create-game`, window.storage.getTypeOfGame());
            this.bindButtonsWhileSeeking();
        };
    }

    bindButtonsWhileSeeking(){
        document.querySelector('#universalGameButton').value = 'Stop seeking an opponent';        
        document.querySelector('#universalGameButton').onclick = () => {
            this.socket.emit(`remove-from-queue`);
            this.bindButtonsFreeToSeek();
        };
    }

    bindButtonsWhilePlaying(){
        document.querySelector('#universalGameButton').value = 'Surrender';
        document.querySelector('#universalGameButton').onclick = () => {
            this.socket.emit(`surrender`);
            this.bindButtonsFreeToSeek();
        };
    }
}