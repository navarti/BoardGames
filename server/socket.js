import { Server } from 'socket.io';

class Socket {
    constructor(httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: global.client,
                methods: ["GET", "POST"]
            }
        });
        this.idsToSocketsDict = {};
        this.socketsToIdsDict = {};
        this.manageRequests();
    }

    manageRequests(){
        this.io.on('connection', async socket => {
            // Auth
            const key = socket.handshake.query['key'];
            if(!global.auth.checkKey(key)){
                socket.emit('send-alert', 'Log in to your account!');
                socket.disconnect(0);
            }
            const email = global.auth.getEmail(key);

            //DB
            let user = await global.db.getUserByEmail(email);
            if(!user){
                user = await global.db.createUser(email);
            }

            this.socketsToIdsDict[socket.id] = user.user_id;
            if(this.idsToSocketsDict[user.user_id]){
                delete this.socketsToIdsDict[this.idsToSocketsDict[user.user_id].id];
                this.idsToSocketsDict[user.user_id].disconnect(0);
            }
            this.idsToSocketsDict[user.user_id] = socket;

            // socket requests
            socket.join(this.socketsToIdsDict[socket.id]);
            socket.emit('send-userInfo-from-server', user);
            
            socket.on('get-game', () => {
                const game = global.gameDistributor.getGameByPlayerId(this.socketsToIdsDict[socket.id]);

                //Rename to get-game-response
                socket.emit('send-game', game, this.socketsToIdsDict[socket.id]);
            });
            socket.on('send-move', (source, target) => {
                try{
                    const game = global.gameDistributor.getGameByPlayerId(this.socketsToIdsDict[socket.id]);
                    if(!game.move(source, target, this.socketsToIdsDict[socket.id])){

                        //rename to alert-response
                        socket.emit('send-alert', "Illegal move");
                        return;
                    }
                    if(game.isGameOver()){
                        global.gameDistributor.onDisposeGame(this.socketsToIdsDict[socket.id]);
                        
                        socket.emit('gameOver-notify');
                        socket.to(game.idWhite).emit('gameOver-notify');
                        socket.to(game.idBlack).emit('gameOver-notify');
                    }

                    //rename to get move from server
                    socket.to(game.engine.turn() === 'w' ? game.idWhite : game.idBlack).
                        emit('send-move-from-server', source, target);
                }
                catch(err){
                    console.log('Error caused by: ' + this.socketsToIdsDict[socket.id]);
                    console.log(err);
                }
            });
            socket.on('check-game-in-progress', () => {
                if(global.gameDistributor.getGameByPlayerId(this.socketsToIdsDict[socket.id])){
                    socket.emit('game-ready');
                    return;
                }
            });
            socket.on('can-create-game', () => {
                const canCreate = global.gameDistributor.onCanCreateGame(this.socketsToIdsDict[socket.id]);
                socket.emit('can-create-game-response', canCreate);
            });
            socket.on('create-game', gameType => {
                if(!global.gameDistributor.onCanCreateGame(this.socketsToIdsDict[socket.id])){
                    socket.emit('send-alert', 'You have game in progress');
                    return;
                }
                const players = global.gameDistributor.onCreate(this.socketsToIdsDict[socket.id], gameType); 
                if(!players){
                    return;
                }
                socket.emit('game-ready');
                socket.to(players.player1).emit('game-ready');
                socket.to(players.player2).emit('game-ready');
            });
            socket.on('remove-from-queue', () => {
                global.gameDistributor.onRemoveFromQueue(this.socketsToIdsDict[socket.id]);
            });
            socket.on('surrender', async () => {
                const game = global.gameDistributor.getGameByPlayerId(this.socketsToIdsDict[socket.id]);
                if(!game){
                    return;
                }
                await global.gameDistributor.onSurrended(this.socketsToIdsDict[socket.id]);
                socket.emit('surrender-notify', this.socketsToIdsDict[socket.id]);
                socket.to(game.idWhite).emit('surrender-notify', this.socketsToIdsDict[socket.id]);
                socket.to(game.idBlack).emit('surrender-notify', this.socketsToIdsDict[socket.id]);
            });
        });
    }
}

export default Socket;
