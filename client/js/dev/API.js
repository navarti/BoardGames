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
        const json = await res.json();
        return json;
    }
    
    async GETRequest(url, params){
        if (params) {
            url += new URLSearchParams(params);
        }
    
        const options = {
            method: 'GET',
        };
    
        const res = await fetch(url, options);
        const json = await res.json();
        return json;
    }

    async createGame(playerId){
        return await this.POSTRequest(this.serverURL + '/createGame', {playerId: playerId});
    }

    async getGame(playerId){
        return await this.GETRequest(this.serverURL + '/getGame?', {playerId: playerId});
    }

    async getStatus(playerId){
        return await this.GETRequest(this.serverURL + '/getStatus?', {playerId: playerId});
    }

    async move(positionFrom, positionTo, playerId){
        return await this.POSTRequest(this.serverURL + '/move', {
            playerId: playerId, 
            positionFrom: positionFrom, 
            positionTo: positionTo
        });
    }
}