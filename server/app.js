import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import c from 'chalk';
import Router from './router.js';
import Socket from './socket.js';

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

        this.app.use(cookieParser());

        this.app.get('/client',   (req, res) => router.onClient(req, res));
        this.app.get('/auth',   (req, res) => router.onAuth(req, res));
        this.app.post('/upd_nickname',   (req, res) => router.onChangeNickName(req, res));

        //old

        // const httpServer = this.app.listen(this.port, this.onListen());

        // new
        const options = {
            key: global.fileManager.getServerKey(),
            cert: global.fileManager.getServerCrt(),
        };

        const httpsServer = https.createServer(options, this.app);
        httpsServer.listen(this.port, this.onListen());

        //same
        this.socket = new Socket(httpsServer);
    }

    onListen() {
        global.logger.printLogo();
        global.logger.printInfo(`${c.cyan('BoardGames Server')} ${c.green(`is running on port ${this.port}`)}`);
    }
}

export default App;
