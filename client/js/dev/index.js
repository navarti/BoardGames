import App from './app.js'
import API from './API.js';

(window).global = window;
global.playerId = 1;
const api = new API();
global.api = api;

const app = new App();

