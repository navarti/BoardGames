import Auth from './auth.js';
import BoardTheme from './boardTheme.js';
import Storage from './storage.js';
import Socket from './socket.js';
import Header from './header.js';
import GameManager from './gameManager.js';
import Profile from './profile.js';
import GameHistory from './gameHistory.js';

export default class App {
    constructor(){
        this.boardTheme = new BoardTheme();
        
        window.storage = new Storage();
        let socket = new Socket();
        window.storage.setSocket(socket);
        
        this.auth = new Auth();
        this.GameHistory = new GameHistory();
        this.profile = new Profile(); 
        this.header = new Header(); 
        this.gameManager = new GameManager();

        this.changeTab();
    }

    changeTab(){
        if(window.storage.getTypeOfGame() === window.storage.profileName){
            document.querySelector('#profileButton').click();
            return;
        }
        if(window.storage.getTypeOfGame() === window.storage.historyName){
            document.querySelector('#gameHistoryButton').click();
        }
    }
}


