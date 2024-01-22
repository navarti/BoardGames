export default class Socket{
    constructor(key){
        this.socket = io('localhost:3000', { transports : ['websocket'], query: `key=${key}` });
        this.socket.on('send-userID', playerId => {
            this.playerId = playerId;
            document.querySelector('#playerId').innerHTML = playerId;
        });
        this.socket.on('send-alert', warning => {
            alert(warning);
        });
    }
}