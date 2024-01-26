export default class BoardTheme{
    constructor(){
        if(!localStorage.boardThemeNum){
            localStorage.boardThemeNum = 0;
        }
        this.boardThemeNum = parseInt(localStorage.boardThemeNum);
        
        this.boardThemes = [
            {
                light: getComputedStyle(document.documentElement)
                    .getPropertyValue('--theme1Light-color'),
                dark: getComputedStyle(document.documentElement)
                .getPropertyValue('--theme1Dark-color'),
            },
            {
                light: getComputedStyle(document.documentElement)
                    .getPropertyValue('--theme2Light-color'),
                dark: getComputedStyle(document.documentElement)
                .getPropertyValue('--theme2Dark-color'),
            },
            {
                light: getComputedStyle(document.documentElement)
                    .getPropertyValue('--theme3Light-color'),
                dark: getComputedStyle(document.documentElement)
                .getPropertyValue('--theme3Dark-color'),
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