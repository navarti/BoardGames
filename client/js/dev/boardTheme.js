export default class boardTheme{
    constructor(){
        if(!localStorage.boardThemeNum){
            localStorage.boardThemeNum = 0;
        }
        this.boardThemeNum = parseInt(localStorage.boardThemeNum);
        
        this.boardThemes = [
            {
                light: 'theme1Light',
                dark: 'theme1Dark',
            },
            {
                light: 'theme2Light',
                dark: 'theme2Dark',
            },
        ];

        localStorage.darkSquares = this.boardThemes[this.boardThemeNum].dark;
        localStorage.lightSquares = this.boardThemes[this.boardThemeNum].light;

        document.querySelector('#changeThemeButton').onclick = () => {
            this.changeBoardTheme(null);
        }
    }

    changeBoardTheme(num){
        if(num === null){
            num = this.boardThemeNum + 1;
        }
        num %= this.boardThemes.length;

        this.boardThemeNum = num;
        localStorage.boardThemeNum = num;
        localStorage.darkSquares = this.boardThemes[this.boardThemeNum].dark;
        localStorage.lightSquares = this.boardThemes[this.boardThemeNum].light;
    }
}