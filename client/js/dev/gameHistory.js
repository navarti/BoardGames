export default class GameHistory{
    constructor(){
        
        if(!window.storage.getAuth()){
            this.bindButtonsWithoutLogIn();
            return;
        }

        this.bindButtons();
    }

    bindButtonsWithoutLogIn(){
        document.querySelector('#game-history').onclick = () => {
            alert('Log in to see profile');
        }
    }

    bindButtons(){
        document.querySelector('#gameHistoryButton').onclick = () => {
            document.querySelector('.history-section').classList.remove('d-none');
            window.storage.setTypeOfGame(window.storage.historyName);
            document.querySelector('.game-section').classList.add('d-none');
            document.querySelector('.profile-section').classList.add('d-none');
        }
    }
}