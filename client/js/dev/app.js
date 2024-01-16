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

    // doesnt have game in progress
    async canCreateGame(){
        return (await global.api.getStatus(global.playerId)).status === 'free';
    }

    async createGame(){
        if(!(await this.canCreateGame())){
            alert('You have game in progress');
            return;
        }
        const application = await global.api.createGame(global.playerId);
        if(application.status === 'waiting'){
            return;
        }
        this.launchGame();
    }

    async getGame(){
        this.gameInfo = await global.api.getGame(global.playerId);
    }

    async launchGame(){
        const application = await global.api.getStatus(global.playerId);
        if(application.status !== 'playing'){
            alert('You do not have game in progress');
            return;
        }
        await this.getGame();
        const gameBoard = document.querySelector('#gameboard');
        this.chess = new Chess(this.gameInfo, gameBoard);
        this.chess.drawBoard(null);
    }
}









