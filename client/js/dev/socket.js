export default class Socket{
    constructor(){
        this.socket = io('localhost:3000', { transports : ['websocket'] });
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
    }
}