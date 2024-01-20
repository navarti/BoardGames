import Auth from './auth.js';

class Router {
    constructor() {
        this.auth = new Auth();
    }

    async authorize(req, res){
        res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
        res.set('Access-Control-Allow-Credentials', 'true');
        
        const data = `${this.auth.getClient()};${this.auth.getRedirect()}`;
        res.cookie('client', data, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 3600000, path:'/' });
        res.send('Cookie sent');
        return;
    }

    

    ok(res){
        res.status(200).send();
    }
    
    badRequest(res) {
        res.status(400).send();
    }
}

export default Router;
