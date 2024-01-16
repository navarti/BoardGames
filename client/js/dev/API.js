export default class API{
    constructor(){
        this.serverURL = 'http://127.0.0.1:3000';
    }

    async POSTRequest(url, body = null) {
        if (body) {
            body = new URLSearchParams(body);
        }
    
        const options = {
            method: 'POST',
            body: body 
        };
    
        const res = await fetch(url, options);
        return res;
    }
    
    async GETRequest(url, params){
        if (params) {
            url += new URLSearchParams(params);
        }
    
        const options = {
            method: 'GET',
        };
    
        const res = await fetch(url, options);
        if(res.status === 400){
            return null;
        }
        const json = await res.json();
        return json;
    }

    async createGame(playerId){
        return (await this.POSTRequest(this.serverURL + '/createGame', {playerId: playerId})).status;
    }

    async getGame(playerId){
        return await this.GETRequest(this.serverURL + '/getGame?', {playerId: playerId});
    }

    async move(positionFrom, positionTo, playerId){
        return (await this.POSTRequest(this.serverURL + '/move', {
            playerId: playerId, 
            positionFrom: positionFrom, 
            positionTo: positionTo
        })).status;
    }
}