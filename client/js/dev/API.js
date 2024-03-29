export default class API{
    constructor(){
        // this.serverURL = 'http://192.168.56.1:3000';
        this.serverURL = 'https://127.0.0.1:3000';
    }

    // Post || Put request
    async request(method, url, body = null) {
        if (body) {
            body = new URLSearchParams(body);
        }
    
        const options = {
            method: method,
            body: body,
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

    async getHistory(skip=0, take=10){    
        const res = await this.GETRequest(this.serverURL + '/history?', {
            key: window.storage.getAuth(), 
            skip: skip, 
            take: take
        });    
        const data = await this.getJsonFromRes(res);
        return data;
    }

    async postNickname(newNickname){
        const body = {
            nickname: newNickname,
            key: window.storage.getAuth()
        };
        const res = await this.request('POST', this.serverURL + '/upd_nickname', body);
        return res;
    }
}



