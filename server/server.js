import express from 'express';
import c from 'chalk';
import Router from './router.js';

class Server {
    constructor(port) {
        this.server = express();
        this.port = port;
    }
    
    run() {
        const router = new Router();

        this.server.get('/hi',   (req, res) => router.onHi(req, res));
                
        this.server.listen(this.port, this.onListen());
    }

    onListen() {
        global.logger.printInfo(`${c.cyan('BoardGames Server')} ${c.green(`is running on port ${this.port}`)}`);
    }
}

export default Server;
