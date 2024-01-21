import Logger from './logger.js';
import App from './app.js';
import Games from './games.js';
import GameDistributor from './gameDistributor.js';
import FileManager from './fileManager.js';

process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection at: ', error);
});

global.client = ["http://127.0.0.1:5500", "http://127.0.0.1:5500/client", "http://localhost", "http://localhost/client"];

//maybe remove from global
let logger = new Logger();
global.logger = logger;
let games = new Games();
global.games = games;
let gameDistributor  = new GameDistributor();
global.gameDistributor = gameDistributor;
let fileManager = new FileManager(); 
global.fileManager = fileManager;

let server = new App(3000);
server.run();

