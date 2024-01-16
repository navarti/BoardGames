import express from 'express';
import Games from './games.js';
import GameDistributor from './GameDistributor.js';

class Router {
    constructor() {
        this.gameDistributor = new GameDistributor();
    }

    async onCreateGame(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        const playerId = parseInt(req.body.playerId);
        if(typeof playerId !== 'number'){
            this.badRequest(res);
            return;
        }
        if(global.games.getGameByPlayerId(playerId)){
            this.badRequest(res);
            return;
        }
        const players = this.gameDistributor.onCreateGame(playerId); 
        if(!players){
            this.ok(res);
            return;
        }
        global.games.addGame(players.player1, players.player2);
        this.ok(res);
    }

    // async onCreateGameWithFriend(req, res) {
    //     res.set('Access-Control-Allow-Origin', '*');
    //     const player1Id = req.id2;        
    //     const player2Id = req.id2;
    //     global.games.addGame(player1Id, player2Id);
    //     res.json({});
    // }

    async onGetGame(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        const playerId = parseInt(req.query.playerId);
        const game = global.games.getGameByPlayerId(playerId);
        if(!game){
            this.badRequest(res);
            return;
        }
        res.json(game);
    }

    // async onGetStatus(req, res) {
    //     res.set('Access-Control-Allow-Origin', '*');
    //     const playerId = parseInt(req.query.playerId);
    //     if(!this.gameDistributor.onCanCreateGame(playerId)){
    //         res.json({status: 'waiting'});
    //         return;
    //     }
    //     if(global.games.getGameByPlayerId(playerId)){
    //         res.json({status: 'playing'});
    //         return;
    //     }
    //     res.json({status: 'free'});
    // }

    async onMove(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        const playerId = parseInt(req.body.playerId);
        const game = global.games.getGameByPlayerId(playerId);
        if(!game){
            this.badRequest(res);
            return;
        }
        const positionFrom = req.body.positionFrom.split(',').map(Number);
        const positionTo = req.body.positionTo.split(',').map(Number);
        if(!game.move(positionFrom, positionTo, playerId)){
            this.badRequest(res);
            return;
        }
        this.ok(res);
    }

    ok(res){
        res.status(200).send();
    }
    
    badRequest(res) {
        res.status(400).send();
    }
}

export default Router;
