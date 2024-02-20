export default class Socket{
    constructor(key){
        this.socket = io('localhost:3000', { transports : ['websocket'], query: `key=${key}` });
        this.socket.on('send-userInfo-from-server', userInfo => {
            localStorage.userInfo = userInfo;

            document.querySelector('#playerId').innerHTML = userInfo.email;
        });
        this.socket.on('send-alert', warning => {
            alert(warning);
        });
    }
}