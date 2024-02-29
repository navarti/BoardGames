export default class GameHistory{
    constructor(){
        
        if(!window.storage.getAuth()){
            this.bindButtonsWithoutLogIn();
            return;
        }

        this.skip = 0;
        this.take = 10;

        this.bindButtons();
    }

    bindButtonsWithoutLogIn(){
        document.querySelector('#gameHistoryButton').onclick = () => {
            alert('Log in to see profile');
        }
    }

    bindButtons(){
        document.querySelector('#gameHistoryButton').onclick = async () => {
            document.querySelector('.history-section').classList.remove('d-none');
            window.storage.setTypeOfGame(window.storage.historyName);
            document.querySelector('.game-section').classList.add('d-none');
            document.querySelector('.profile-section').classList.add('d-none');

            await this.drawTable();
        }
    }

    async drawTable(){
        const section = document.querySelector('#history-list'); 
        const history = await window.storage.api.getHistory(this.skip, this.take);
        history.forEach(game => {
            let row = document.createElement('p');
            row.textContent = `Game id: ${game.game_id}`;
            section.appendChild(row);
        });
    }
}