import express from 'express';
import bodyParser from 'body-parser';
import c from 'chalk';
import Router from './router.js';

class Server {
    constructor(port) {
        this.server = express();
        this.port = port;
    }
    
    run() {
        const router = new Router();
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({
            extended: true
          }));
          this.server.post('/createGame',   (req, res) => router.onCreateGame(req, res));
        this.server.get('/getGame',   (req, res) => router.onGetGame(req, res));
        //this.server.get('/getStatus',   (req, res) => router.onGetStatus(req, res));
        this.server.post('/move',   (req, res) => router.onMove(req, res));
                
        this.server.listen(this.port, this.onListen());
    }

    onListen() {
        global.logger.printInfo(`${c.cyan('BoardGames Server')} ${c.green(`is running on port ${this.port}`)}`);
    }
}

export default Server;
