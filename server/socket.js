import { Server } from 'socket.io';

class Socket {
    constructor(httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: global.client,
                methods: ["GET", "POST"]
            }
        });
        this.socketsToEmailsDict = {};
        this.manageRequests();
    }

    manageRequests(){
        this.io.on('connection', socket => {
            const key = socket.handshake.query['key'];
            if(!global.auth.checkKey(key)){
                socket.emit('send-alert', 'Log in to your account!');
                socket.disconnect(0);
            }
            this.socketsToEmailsDict[socket.id] = global.auth.getEmail(key);
            socket.join(this.socketsToEmailsDict[socket.id]);
            socket.emit('send-userID', this.socketsToEmailsDict[socket.id]);

            socket.on('get-game', () => {
                const game = global.gameDistributor.getGameByPlayerId(this.socketsToEmailsDict[socket.id]);
                socket.emit('send-game', game, this.socketsToEmailsDict[socket.id]);
            });
            socket.on('stop-seeking', () => {
                global.gameDistributor.onDisposeGame(this.socketsToEmailsDict[socket.id]);
            });
            socket.on('send-move', (source, target) => {
                try{
                    const game = global.gameDistributor.getGameByPlayerId(this.socketsToEmailsDict[socket.id]);
                    if(!game.move(source, target, this.socketsToEmailsDict[socket.id])){
                        socket.emit('send-error');
                        return;
                    }
                    if(game.isGameOver()){
                        global.gameDistributor.onDisposeGame(this.socketsToEmailsDict[socket.id]);
                    }
                    socket.to(game.engine.turn() === 'w' ? game.idWhite : game.idBlack).
                        emit('send-move-from-server', source, target);
                }
                catch(err){
                    console.log('Error caused by: ' + this.socketsToEmailsDict[socket.id]);
                    console.log(err);
                }
            });
            socket.on('check-game-in-progress', () => {
                if(global.gameDistributor.getGameByPlayerId(this.socketsToEmailsDict[socket.id])){
                    socket.emit('game-ready');
                    return;
                }
            });
            socket.on('can-create-game', () => {
                const canCreate = global.gameDistributor.onCanCreateGame(this.socketsToEmailsDict[socket.id]);
                socket.emit('can-create-game-response', canCreate);
            });
            socket.on('create-game', gameType => {
                socket.emit('can-create-game-response', false);
                if(!global.gameDistributor.onCanCreateGame(this.socketsToEmailsDict[socket.id])){
                    socket.emit('send-alert', 'You have game in progress');
                    socket.prependListener('')
                    return;
                }
                const players = global.gameDistributor.onCreate(this.socketsToEmailsDict[socket.id], gameType); 
                if(!players){
                    return;
                }
                socket.emit('game-ready');
                socket.to(players.player1).emit('game-ready');
                socket.to(players.player2).emit('game-ready');
            });
            socket.on('surrend', () => {
                const game = global.gameDistributor.getGameByPlayerId(this.socketsToEmailsDict[socket.id]);
                if(!game){
                    return;
                }
                global.gameDistributor.onSurrended(this.socketsToEmailsDict[socket.id]);
                socket.emit('surrend-notify', this.socketsToEmailsDict[socket.id]);
            });
        });
    }
}

export default Socket;
