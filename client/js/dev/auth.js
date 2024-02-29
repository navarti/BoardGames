export default class Auth {
    constructor() {
        if(!window.storage.getAuth()) {
            this.setVisibility('deauthed');
        } else {
            this.setVisibility('authed');
        }

        if(this.authError()) {
            // history.pushState(null, null, '/');
            alert('Auth error');
        }
    }

    async onAuth() {
        const url = await this.getAuthURL();
        window.location.href = url;
    }

    onLogout() {
        window.storage.deleteAuth();
        window.location.reload();
    }

    setVisibility(visibility) {
        const logButton = document.querySelector('#logButton'); 
        if(visibility === "deauthed"){
            logButton.innerHTML = 'Log in';
            logButton.onclick = (e) => {
                e.preventDefault();
                this.onAuth();
            }
            return;
        }
        logButton.innerHTML = 'Log out';
        logButton.onclick = () => {
            this.onLogout();
        }
    }

    authError() {
        const search = window.location.search;
        if(search && search.includes('auth') && search.includes('error')) return true;
        return false;
    }

    async getAuthURL() {
        const data = await window.storage.api.getClient();
        const client = data.client; 
        const redirect = data.redirect;
        const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const options = 
            `redirect_uri=${redirect}` +
            `&client_id=${client}` +
            '&access_type=offline' +
            '&response_type=code' + 
            '&prompt=consent' +
            '&scope=' + 'https://www.googleapis.com/auth/userinfo.profile' +
            ' https://www.googleapis.com/auth/userinfo.email';
      
        return `${rootUrl}?${options}`;
    }
}