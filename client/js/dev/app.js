import Chess from './chess/Chess.js'

export default class App {
    constructor(){
        const gameBoard = document.querySelector('#gameboard');
        

        POSTRequest('http://127.0.0.1:3000/createGame', {id1: 1, id2: 2});
        GETRequest('http://127.0.0.1:3000/getGame', {gameId: 1});

        this.game = new Chess();
        this.game.drawBoard(gameBoard, null, 'white', true);
    }
}


//async
function POSTRequest(url, body = null) {
    if (body) {
        body = new URLSearchParams(body);
    }

    const options = {
        method: 'POST',
        mode: "no-cors",
        body: body 
    };

    const response = fetch(url, options);
    return response;
}

function GETRequest(url, params){
    if (params) {
        url += new URLSearchParams(params);
    }

    const options = {
        method: 'GET',
        mode: "no-cors",
    };

    const response = fetch(url, options);
    return response;
}









