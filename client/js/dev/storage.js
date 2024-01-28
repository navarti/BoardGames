import Socket from './socket.js';
import API from './API.js';

export default class Storage{
    constructor(){
        this.playerId = parseInt(localStorage.playerId);
        this.api = new API();
        if(this.getAuth()){
            this.socket = new Socket(this.getAuth());
        }
    }

    getAuth() {
        let auth = this.getCookie('key');
        if(auth) return auth;
        return null;
    }

    deleteAuth() {
        this.deleteCookie('key');
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };
      
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
      
        document.cookie = updatedCookie;
    }

    deleteCookie(name) {
        this.setCookie(name, "", {
          'max-age': -1
        });
    }

    deleteAllCookies() {
        let cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }
}