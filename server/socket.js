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
                const game = global.games.getGameByPlayerId(this.socketsToEmailsDict[socket.id]);
                socket.emit('send-game', game, this.socketsToEmailsDict[socket.id]);
            });
            socket.on('send-move', (positionFrom, positionTo) => {
                try{
                    let game = global.games.getGameByPlayerId(this.socketsToEmailsDict[socket.id]);
                    if(!game.move(positionFrom, positionTo, this.socketsToEmailsDict[socket.id])){
                        socket.emit('send-error');
                        return;
                    }
                    socket.emit('send-game', game);
                    socket.to(game.idWhite).emit('send-game', game);
                    socket.to(game.idBlack).emit('send-game', game);
                }
                catch(err){
                    console.log('Error caused by: ' + this.socketsToEmailsDict[socket.id]);
                    console.log(err);
                }
            });
            socket.on('check-game-in-progress', () => {
                if(global.games.getGameByPlayerId(this.socketsToEmailsDict[socket.id])){
                    socket.emit('game-ready');
                    return;
                }
            });
            socket.on('create-game', () => {
                const gd = global.gameDistributor;
                if(global.games.getGameByPlayerId(this.socketsToEmailsDict[socket.id]) 
                    || gd.inQueue(this.socketsToEmailsDict[socket.id])){
                    socket.emit('send-alert', 'You have game in progress');
                    return;
                }
                const players = gd.onCreateGame(this.socketsToEmailsDict[socket.id]); 
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

export default Socket;
