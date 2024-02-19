import Logger from './logger.js';
import App from './app.js';
import GameDistributor from './gameDistributor.js';
import FileManager from './fileManager.js';
import Auth from './auth.js';
import DB from './db.js';

process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection at: ', error);
});

global.client = ["http://127.0.0.1:5500", "http://127.0.0.1:5500/client", "http://localhost", "http://localhost/client"];

//remove unused variables from global later
global.logger = new Logger();
global.gameDistributor = new GameDistributor();
global.fileManager = new FileManager();
global.auth = new Auth();

global.db = new DB();
global.db.initDatabase();

let server = new App(3000);
server.run();

