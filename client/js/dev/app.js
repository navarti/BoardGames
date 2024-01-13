import Chess from './chess/Chess.js';
import API from './API.js';

export default class App {
    constructor(){
        this.api = new API();
        this.chess = null;

        this.gameInfo = null;

        this.bindButtons();
    }

    async bindButtons(){
        //to fix
        document.querySelector('#playerId').value = 1; 
        document.querySelector('#connectButton').onclick = () => {
            const playerId = parseInt(document.querySelector('#playerId').value);
            if(playerId !== 'Nan'){
                global.playerId = playerId;
            }
            this.launchGame();
        };
        document.querySelector('#createButton').onclick = () => {
            const playerId = parseInt(document.querySelector('#playerId').value);
            if(playerId !== 'Nan'){
                global.playerId = playerId;
            }
            this.createGame();
        };
    }

    // has game in progress
    async canCreateGame(){
        return (await this.api.canCreateGame(global.playerId)).status === 'free';
    }

    async createGame(){
        if(!(await this.canCreateGame())){
            alert('You have game in progress');
            return;
        }
        const application = await this.api.createGame(global.playerId);
        if(application.status === 'waiting'){
            return;
        }
        await this.getGame(); 
        this.launchGame();
    }

    async getGame(){
        this.gameInfo = await this.api.getGame(global.playerId);
    }

    async launchGame(){
        await this.getGame();
        const gameBoard = document.querySelector('#gameboard');
        this.chess = new Chess(this.gameInfo);
        this.chess.drawBoard(gameBoard);
    }
}









