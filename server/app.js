import express from 'express';
import bodyParser from 'body-parser';
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

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
          }));
          this.app.post('/createGame',   (req, res) => router.onCreateGame(req, res));
        this.app.get('/getGame',   (req, res) => router.onGetGame(req, res));
        //this.app.get('/getStatus',   (req, res) => router.onGetStatus(req, res));
        this.app.post('/move',   (req, res) => router.onMove(req, res));
                
        const httpServer = this.app.listen(this.port, this.onListen());
        this.socket = new SocketConfig(httpServer);
    }

    onListen() {
        global.logger.printLogo();
        global.logger.printInfo(`${c.cyan('BoardGames Server')} ${c.green(`is running on port ${this.port}`)}`);
    }
}

export default App;
