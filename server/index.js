import Logger from './logger.js';
import App from './app.js';
import Games from './games.js';
import GameDistributor from './gameDistributor.js';

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


let server = new App(3000);
server.run();

