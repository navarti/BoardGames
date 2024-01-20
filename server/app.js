import express from 'express';
//useless
//import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import c from 'chalk';
import Router from './router.js';
import SocketConfig from './socketConfig.js';

class App {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.io = null;
    }
    
    run() {
        const router = new Router();

        //now is useless 
        // this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({
        //     extended: true
        // }));

        this.app.use(cookieParser());

        this.app.get('/authorize',   (req, res) => router.authorize(req, res));
                
        const httpServer = this.app.listen(this.port, this.onListen());
        this.socket = new SocketConfig(httpServer);
    }

    onListen() {
        global.logger.printLogo();
        global.logger.printInfo(`${c.cyan('BoardGames Server')} ${c.green(`is running on port ${this.port}`)}`);
    }
}

export default App;
