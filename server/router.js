import * as express from 'express';

class Router {
    constructor() {

    }

    async onHi(req, res) {
        global.logger.printInfo('hi')
        res.status(200).send();
    }

    badRequest(res) {
        res.status(400).send('Invalid request!');
    }
}

export default Router;
