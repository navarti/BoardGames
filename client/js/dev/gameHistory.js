export default class GameHistory{
    constructor(){
        this.load = true;

        console.log(localStorage.skipHistory);
        if(!window.storage.getAuth()){
            this.bindButtonsWithoutLogIn();
            return;
        }

        this.skip = parseInt(window.storage.getSkipHistory());
        this.take = 3;
        this.maxMatches = 100;

        this.bindButtons();
    }

    bindButtonsWithoutLogIn(){
        document.querySelector('#gameHistoryButton').onclick = () => {
            alert('Log in to see profile');
        }
    }

    bindButtons(){
        document.querySelector('#gameHistoryButton').onclick = async () => {
            if(!this.load){
                return;
            }
            this.load = false;

            document.querySelector('.history-section').classList.remove('d-none');
            window.storage.setTypeOfGame(window.storage.historyName);
            document.querySelector('.game-section').classList.add('d-none');
            document.querySelector('.profile-section').classList.add('d-none');

            await this.drawTable();
        }
        
        document.querySelector('#historyPreviousButton').onclick = async () => {
            if(this.skip - this.take < 0){
                alert('No more matches to show');
                return;
            }
            this.skip -= this.take;
            window.storage.setSkipHistory(this.skip);

            window.location.reload();
        }

        document.querySelector('#historyNextButton').onclick = async () => {
            if(this.skip + this.take > this.maxMatches){
                alert('No more matches to show');
                return;
            }
            this.skip += this.take;
            window.storage.setSkipHistory(this.skip);
            
            window.location.reload();
        }
    }

    async drawTable(){
        const section = document.querySelector('#history-list'); 
        const history = await window.storage.api.getHistory(this.skip, this.take);
        history.forEach(game => {
            const gameDiv = this.makeOneGame(game);
            gameDiv.onclick = () => {
                this.drawBoard(game);
            }
            section.appendChild(gameDiv);
        });
        
        if(history.length > 0){
            this.drawBoard(history[0]);
        }
    }

    makeOneGame(game){
        const userInfo = window.storage.getUserInfo();
        const playFor = game.idWhite === userInfo.user_id ? 'white' : 'black'; 

        const res = document.createElement('div');
        res.classList.add('history-game-div');

        let gameResText = document.createElement('p');
        gameResText.textContent = game.winner === playFor[0] ? 'Win' : 'Lose';
        let gameTypeText = document.createElement('p');
        gameTypeText.textContent = `${game.game_type}`;
        let playForText = document.createElement('p');
        playForText.textContent = 'You played for ' +  playFor;

        res.appendChild(gameResText);
        res.appendChild(gameTypeText);
        res.appendChild(playForText);

        return res;
    }

    drawBoard(game){
        this.gameBoardName = 'history-gameboard';

        if(game.game_type === 'chess'){
            this.drawChessBoard(game);
            return;
        }
        if(game.game_type === 'rw'){
            this.drawRwBoard(game);
        }
    }

    drawChessBoard(game){
        const config = {
            draggable: false,
            position: game.fen_string,
            pieceTheme: chessPieceTheme,
        }
        
        this.gameBoard = Chessboard(this.gameBoardName, config);
    }
    
    drawRwBoard(game){
        const config = {
            draggable: false,
            position: game.fen_string,
            pieceTheme: rwPieceTheme,
        }
        
        this.gameBoard = Chessboard(this.gameBoardName, config);
    }
}


function rwPieceTheme (piece) {
    if (piece.search(/w/) !== -1) {
      return 'img/chesspieces/' + piece + '.png';
    }
  
    return 'img/chesspieces/' + piece + '.png';
}

function chessPieceTheme (piece) {
    if (piece.search(/w/) !== -1) {
      return 'img/chesspieces/' + piece + '.png';
    }
  
    return 'img/chesspieces/' + piece + '.png';
}