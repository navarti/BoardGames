import Chess from './chess/Chess.js'

export default class App {
    constructor(){
        const gameBoard = document.querySelector('#gameboard');
        

        this.game = new Chess();
        this.game.createBoard(gameBoard, null, 'white');
    }
}








