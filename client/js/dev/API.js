export default class API{
    constructor(){
        // this.serverURL = 'http://192.168.168.100:3000';
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
        return res;
    }

    async getJsonFromRes(res){
        if(res.status === 400){
            return null;
        }
        const json = await res.json();
        return json;
    }

    async getClient(){
        const res = await this.GETRequest(this.serverURL + '/client');
        const data = await this.getJsonFromRes(res);
        return data;
    }
}