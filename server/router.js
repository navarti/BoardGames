import Auth from './auth.js';

class Router {
    constructor() {
        this.auth = new Auth();
    }

    async onClientCookies(req, res){
        res.set('Access-Control-Allow-Origin', req.headers.origin);
        res.set('Access-Control-Allow-Credentials', 'true');
        
        const data = `${this.auth.getClient()};${this.auth.getRedirect()}`;
        res.cookie('client', data, { httpOnly: false, secure: true, sameSite: 'None', maxAge: 3600000, path:'/' });
        res.send('Cookie sent');
        return;
    }

    async onAuth(req, res){
        res.set('Access-Control-Allow-Origin', req.headers.origin);
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Credentials', 'true');
        
        const redirect = this.auth.getMainLink();

        if(!req.query.code) {
            res.location(redirect);
            res.sendStatus(302);
            return;
        }

        let userData = await this.auth.getToken(req.query.code);
        let result = await this.auth.parse(userData.id_token);

        if(this.auth.checkAuth(result)) {
            result = {
                email: result.email,
                email_verified: result.email_verified
            };

            let jwt = this.auth.sign(result);
            res.cookie('key', jwt, { httpOnly: false, secure: true, sameSite: 'None', maxAge: 3600000, path:'/' });
            res.clearCookie('client');

            res.location(redirect);
            res.sendStatus(302);
        } else {
            res.location(`${redirect}/?auth=error`);
            res.sendStatus(302);
        }
    }

    ok(res){
        res.status(200).send();
    }
    
    badRequest(res) {
        res.status(400).send();
    }
}

export default Router;
