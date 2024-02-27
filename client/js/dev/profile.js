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
            this.bindText();
            document.querySelector('.profile-section').classList.remove('d-none');
            window.storage.setTypeOfGame(null);
            document.querySelector('.game-section').classList.add('d-none');
        }

        // document.querySelector('#profileButton').addEventListener('click', () => {
        //     document.querySelector('.profile-section').classList.remove('d-none');  
        // });

        document.querySelector('#saveChangesButton').onclick = async () => {
            const res = await window.storage.api.postNickname(document.querySelector('#profile-section__nickname').value);
            if(res.status === 200){
                window.location.reload();
            }
            if(res.status === 400){
                alert('This nickname is not allowed');
                return;
            }
            if(res.status === 401){
                alert('Log in your account!');
            }
            
        }
    }

    bindText(){
        const userInfo = window.storage.getUserInfo();

        document.querySelector('#profile-section__email').innerHTML = userInfo.email;
        document.querySelector('#profile-section__nickname').value = userInfo.nickname;
        document.querySelector('#profile-section__date-registered').innerHTML = userInfo.registration_date;
    }
}