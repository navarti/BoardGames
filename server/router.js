class Router {
    constructor() {
        
    }

    async onClient(req, res){
        res.set('Access-Control-Allow-Origin', '*');
        res.json({client: global.auth.getClient(), redirect: global.auth.getRedirect()});
        return;
    }

    async onAuth(req, res){
        res.set('Access-Control-Allow-Origin', req.headers.origin);
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Credentials', 'true');
        
        const redirect = global.auth.getMainLink();

        if(!req.query.code) {
            res.location(redirect);
            res.sendStatus(302);
            return;
        }

        let userData = await global.auth.getToken(req.query.code);
        let result = await global.auth.parse(userData.id_token);

        if(global.auth.checkAuth(result)) {
            result = {
                email: result.email,
                email_verified: result.email_verified
            };

            let jwt = global.auth.sign(result);
            res.cookie('key', jwt, { httpOnly: false, secure: true, sameSite: 'None', maxAge: 3600000, path:'/' });
            
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
