import Socket from './socket.js';
import API from './API.js';

export default class Storage{
    constructor(){
        this.playerId = parseInt(localStorage.playerId);
        this.api = new API();
        this.socket = new Socket();
    }

    //temporary
    changePlayerId(playerId){
        localStorage.playerId = playerId;
        this.playerId = playerId;
    }
}