import { Server } from 'socket.io';

class SocketConfig {
    constructor(httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: global.client,
                methods: ["GET", "POST"]
            }
        });
        this.configRequests();
    }

    configRequests(){
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
}

export default SocketConfig;
