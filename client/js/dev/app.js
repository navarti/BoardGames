import Chess from './chess/Chess.js';

export default class App {
    constructor(){
        this.chess = null;

        this.gameInfo = null;

        this.bindButtons();
    }

    async bindButtons(){
        //to fix
        document.querySelector('#playerId').value = 1; 
        document.querySelector('#connectButton').onclick = () => {
            const playerId = parseInt(document.querySelector('#playerId').value);
            if(typeof playerId === 'number'){
                global.playerId = playerId;
            }
            this.launchGame();
        };
        document.querySelector('#createButton').onclick = () => {
            const playerId = parseInt(document.querySelector('#playerId').value);
            if(typeof playerId === 'number'){
                global.playerId = playerId;
            }
            this.createGame();
        };
    }

    async createGame(){
        if((await global.api.createGame(global.playerId)) !== 200){
            alert('You have game in progress');
            return;
        };
    }

    async launchGame(){
        this.gameInfo = null;
        this.gameInfo = await global.api.getGame(global.playerId);
        if(!this.gameInfo){
            alert('You do not have game in progress');
            return;
        }
        const gameBoard = document.querySelector('#gameboard');
        this.chess = new Chess(this.gameInfo, gameBoard);
        this.chess.drawBoard(null);
    }
}









