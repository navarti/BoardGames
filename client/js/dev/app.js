import Auth from './auth.js';
import BoardTheme from './boardTheme.js';
import Storage from './storage.js';
import Socket from './socket.js';
import Header from './header.js';
import GameManager from './gameManager.js';

export default class App {
    constructor(){
        this.boardTheme = new BoardTheme();
        
        window.storage = new Storage();
        let socket = new Socket();
        window.storage.setSocket(socket);
        
        this.auth = new Auth();
        this.header = new Header(); 
        this.gameManager = new GameManager();
    }
}

