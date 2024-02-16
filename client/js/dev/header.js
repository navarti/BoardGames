// Bind Header Buttons
export default class Header{
    constructor(){
        this.bindButtons();
    }

    bindButtons(){
        document.querySelector('#chessButton').onclick = () => {
            window.storage.setTypeOfGame("chess");
            window.location.reload();
        }
        document.querySelector('#rwButton').onclick = () => {
            window.storage.setTypeOfGame("rw");
            window.location.reload();
        }
    }
}