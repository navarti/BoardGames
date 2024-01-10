import Chess from './chess/Chess.js'

export default class App {
    constructor(){
        const gameBoard = document.querySelector('#gameboard')
        const playerDisplay = document.querySelector('#player')
        const infoDisplay = document.querySelector('#info-display')

        this.game = new Chess()
        this.game.createBoard(gameBoard)
    }
}








