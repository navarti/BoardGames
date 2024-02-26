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
        document.querySelector('#profileButton').onclick = () => {
            alert('Log in to see profile');
        }
    }

    bindButtons(){
        document.querySelector('#profileButton').onclick = () => {
            document.querySelector('.profile-section').classList.remove('d-none');
            window.storage.setTypeOfGame(null);
            document.querySelector('.game-section').classList.add('d-none');
        }

        // document.querySelector('#profileButton').addEventListener('click', () => {
        //     document.querySelector('.profile-section').classList.remove('d-none');  
        // });

        document.querySelector('#saveChangesButton').onclick = () => {
            window.storage.api.putNickname(document.querySelector('#profile-section__nickname').value);
        }  
    }

    bindText(){
        const userInfo = window.storage.getUserInfo();

        document.querySelector('#profile-section__email').innerHTML = userInfo.email;
        document.querySelector('#profile-section__nickname').value = userInfo.nickname;
        document.querySelector('#profile-section__date-registered').innerHTML = userInfo.registration_date;
    }
}