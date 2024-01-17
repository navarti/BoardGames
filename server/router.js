import express from 'express';

class Router {
    constructor() {
    }

    ok(res){
        res.status(200).send();
    }
    
    badRequest(res) {
        res.status(400).send();
    }
}

export default Router;
