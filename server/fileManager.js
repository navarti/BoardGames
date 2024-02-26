import fs from 'fs';

class FileManager {
    constructor() {
        
    }

    getIndex(){
        return fs.readFileSync('../client/index.html');  
    }

    getConfig(){
        return fs.readFileSync('config.json');
    }

    getInitSql(){
        return fs.readFileSync(`../db/initialization.sql`).toString();
    }

    getServerKey(){
        return fs.readFileSync(`./certificates/example.com+5-key.pem`).toString();
    }

    getServerCrt(){
        return fs.readFileSync(`./certificates/example.com+5.pem`).toString();
    }
}

export default FileManager;
