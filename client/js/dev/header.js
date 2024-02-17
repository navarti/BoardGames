// Bind Header Buttons
export default class Header{
    constructor(){
        this.bindButtons();
        this.bindText();
    }

    bindButtons(){
        document.querySelector('#chessButton').onclick = () => {
            if(window.storage.chessName === window.storage.getTypeOfGame()){
                return;
            }
            if(window.storage.getAuth()){
                window.storage.socket.socket.on('can-create-game-response', canCreate => {
                    if(!canCreate){
                        alert("You can not switch game because you have game in progress!");
                        return;
                    }
                    window.storage.setTypeOfGame(window.storage.chessName);
                    window.location.reload();
                });

                window.storage.socket.socket.emit('can-create-game');
            }
            else{
                window.storage.setTypeOfGame(window.storage.chessName);
                window.location.reload();
            }
        }
        document.querySelector('#rwButton').onclick = () => {
            if(window.storage.rwName === window.storage.getTypeOfGame()){
                return;
            }
            if(window.storage.getAuth()){
                window.storage.socket.socket.on('can-create-game-response', canCreate => {
                    if(!canCreate){
                        alert("You can not switch game because you have game in progress!");
                        return;
                    }
                    window.storage.setTypeOfGame(window.storage.rwName);
                    window.location.reload();
                });

                window.storage.socket.socket.emit('can-create-game');
            }
            else{
                window.storage.setTypeOfGame(window.storage.rwName);
                window.location.reload();
            }
        }
    }

    bindText(){
        document.querySelector('#gameName').innerHTML = window.storage.getTypeOfGame();
    }
}