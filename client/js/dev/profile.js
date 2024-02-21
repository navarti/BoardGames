export default class Profile{
    constructor(){
        
        if(!window.storage.getAuth()){
            this.bindButtonsWithoutLogIn();
            return;
        }

        this.bindButtons();
        this.bindText();
    }

    bindButtonsWithoutLogIn(){
        alert('Log in to see profile');
    }

    bindButtons(){
        
    }

    bindText(){
        
    }
}