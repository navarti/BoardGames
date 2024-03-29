import API from './API.js';

export default class Storage{
    constructor(){
        this.chessName = "chess";
        this.rwName = "rw";
        this.profileName = "profile";
        this.historyName = "history";

        this.playerId = parseInt(localStorage.playerId);
        this.api = new API();
    }

    setSocket(socket){
        this.socket = socket;
    }

    getSkipHistory(){
        if(!localStorage.skipHistory){
            localStorage.skipHistory = 0;
        }
        return localStorage.skipHistory;
    }

    setSkipHistory(skip){
        localStorage.skipHistory = skip;
    }

    getTypeOfGame(){
        if(!localStorage.gameType 
            || (localStorage.gameType !== this.chessName
                && localStorage.gameType !== this.rwName
                && localStorage.gameType !== this.profileName
                && localStorage.gameType !== this.historyName)
            ){
            localStorage.gameType = this.chessName;
        }
        return localStorage.gameType;
    }

    setTypeOfGame(type){
        localStorage.gameType = type;
    }

    getUserInfo(){
        if(!localStorage.userInfo){
            window.location.reload();
        }
        return JSON.parse(localStorage.userInfo);
    }

    setUserInfo(userInfo){
        localStorage.userInfo = JSON.stringify(userInfo);

        //bind everything
        document.querySelector('#playerId').innerHTML = userInfo.email;
    }

    setNickname(nickname){
        const userInfo = this.getUserInfo();
        userInfo.nickname = nickname;
        this.setUserInfo(userInfo);
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