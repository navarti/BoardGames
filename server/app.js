import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';

import c from 'chalk';
import Router from './router.js';

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
        this.io = new Server(httpServer, {
            cors: {
                origin: "http://127.0.0.1:5500",
                methods: ["GET", "POST"]
            }
        });

        this.io.on('connection', socket => {
            socket.on('get-game', playerId => {
                const game = global.games.getGameByPlayerId(playerId);
                socket.join(playerId);
                socket.emit('send-game', game);
            });
            socket.on('send-move', (positionFrom, positionTo, playerId) => {
                let game = global.games.getGameByPlayerId(playerId);
                if(!game.move(positionFrom, positionTo, playerId)){
                    socket.emit('send-error');
                    return;
                }
                socket.emit('send-game', game);
                socket.to(game.idWhite).emit('send-game', game);
                socket.to(game.idBlack).emit('send-game', game);
            });
            socket.on('check-game-in-progress', playerId => {
                if(global.games.getGameByPlayerId(playerId)){
                    socket.emit('game-ready');
                    return;
                }
                socket.emit('send-alert', 'You dont have game in progress');
            });
            socket.on('create-game', playerId => {
                socket.join(playerId);
                const gd = global.gameDistributor;
                if(global.games.getGameByPlayerId(playerId) || gd.inQueue(playerId)){
                    socket.emit('send-alert', 'You have game in progress');
                    return;
                }
                const players = gd.onCreateGame(playerId); 
                if(!players){
                    return;
                }
                global.games.addGame(players.player1, players.player2);
                socket.emit('game-ready');
                socket.to(players.player1).emit('game-ready');
                socket.to(players.player2).emit('game-ready');
            });
        });
    }

    onListen() {
        global.logger.printInfo(`${c.cyan('BoardGames Server')} ${c.green(`is running on port ${this.port}`)}`);
    }
}

export default App;
