import Logger from './logger.js';
import Server from './server.js';

process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection at: ', error);
});

let logger = new Logger();
global.logger = logger;
let server = new Server(3000);

logger.printLogo();

server.run();