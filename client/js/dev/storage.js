import API from './API.js';

export default class Storage{
    constructor(){
        this.playerId = 1;
        this.api = new API();
    }
}