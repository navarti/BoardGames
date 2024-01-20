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
}

export default FileManager;
