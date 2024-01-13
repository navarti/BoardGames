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
        if(playerId === 'Nan'){
            this.badRequest();
        }
        const players = this.gameDistributor.onCreateGame(playerId); 
        if(!players){
            res.json({status: 'waiting'});
            return;
        }
        global.games.addGame(players.player1, players.player2);
        res.json({status: 'created'});
    }

    async onCreateGameWithFriend(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        const player1Id = req.id2;        
        const player2Id = req.id2;
        global.games.addGame(player1Id, player2Id);
        res.json({});
    }

    async onGetGame(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        const playerId = parseInt(req.query.playerId);
        const game = global.games.getGameByPlayerId(playerId);
        if(!game){
            this.badRequest(res);
        }
        res.json(game);
    }

    async onCanCreateGame(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        const playerId = parseInt(req.query.playerId);
        if(!this.gameDistributor.onCanCreateGame(playerId)){
            res.json({status: 'waiting'});
            return;
        }
        if(global.games.getGameByPlayerId(playerId)){
            res.json({status: 'playing'});
            return;
        }
        res.json({status: 'free'});
    }

    badRequest(res) {
        res.status(400);
    }
}

export default Router;
