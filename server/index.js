import Logger from './logger.js';
import App from './app.js';
import Games from './games.js';
import GameDistributor from './gameDistributor.js';
import FileManager from './fileManager.js';

process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection at: ', error);
});

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

