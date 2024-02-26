export default class Socket{
    constructor(){
        const auth = window.storage.getAuth();

        if(!auth){
            return;
        }

        this.socket = io('https://localhost:3000', { transports : ['websocket'], query: `key=${auth}` });
        this.socket.on('send-userInfo-from-server', userInfo => {
            window.storage.setUserInfo(userInfo);
        });
        this.socket.on('send-alert', warning => {
            alert(warning);
        });
    }
}