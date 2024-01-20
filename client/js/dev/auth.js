

export default class Auth {
    constructor() {
        this.storage = window.storage;
        this.storage.api.authorize();

        if(!this.check()) {
            this.setVisibility('deauthed');
        } else {
            this.setVisibility('authed');
        }

        if(this.authError()) {
            // history.pushState(null, null, '/');
            // let lAuthError = document.querySelector('#l-authError');
            // if(lAuthError == null) return;
            // alert(lAuthError.innerHTML);
            alert('AAAAAAAAAAAAAAAAAA');
        }

        document.querySelector('#log-in-button').onclick = () => {
            this.onAuth();
        }
    }

    check() {
        if(this.storage.getAuth() == null) return false;
        return true;
    }

    onAuth() {
        const url = this.getAuthURL();
        window.location.href = url;
    }

    onLogout() {
        this.storage.deleteAuth();
        window.location.reload();
    }

    setVisibility(visibility) {
        if(visibility == 'authed') {
            Array.from(document.querySelector('body').children).forEach(element => {
                element.classList.remove('d-none');
            });
            document.querySelector('.log-in-section').classList.add('d-none');
            return;
        }
    }

    authError() {
        const search = window.location.search;
        if(search && search.includes('auth') && search.includes('error')) return true;
        return false;
    }

    getAuthURL() {
        const data = this.storage.getClient();
        const client = data[0]; 
        const redirect = data[1];
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