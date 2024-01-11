import express from 'express';
import Games from './games.js';


class Router {
    constructor() {

    }

    async onCreateGame(req, res) {
        const player1Id = req.id1;
        const player2Id = req.id2;
        const gameId = global.games.addGame(player1Id, player2Id);
        //res.status(200).send(gameId);
        res.json(gameId);
    }

    async onGetGame(req, res) {
        const gameId = req.params.gameId;
        const game = global.games.getGameByGameId(gameId);
        if(!game){
            this.badRequest();
        }
        res.json(game);
    }

    badRequest(res) {
        res.status(400).send('Invalid request!');
    }
}

export default Router;
