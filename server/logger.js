class Logger {
    constructor() {

    }
    
    printLogo() {
        const logo = `
        ________  ________  ________  ________  ________          ________  ________  _____ ______   _______   ________      
        |\   __  \|\   __  \|\   __  \|\   __  \|\   ___ \        |\   ____\|\   __  \|\   _ \  _   \|\  ___ \ |\   ____\     
        \ \  \|\ /\ \  \|\  \ \  \|\  \ \  \|\  \ \  \_|\ \       \ \  \___|\ \  \|\  \ \  \\\__\ \  \ \   __/|\ \  \___|_    
        \ \   __  \ \  \\\  \ \   __  \ \   _  _\ \  \ \\ \       \ \  \  __\ \   __  \ \  \\|__| \  \ \  \_|/_\ \_____  \   
        \ \  \|\  \ \  \\\  \ \  \ \  \ \  \\  \\ \  \_\\ \       \ \  \|\  \ \  \ \  \ \  \    \ \  \ \  \_|\ \|____|\  \  
        \ \_______\ \_______\ \__\ \__\ \__\\ _\\ \_______\       \ \_______\ \__\ \__\ \__\    \ \__\ \_______\____\_\  \ 
            \|_______|\|_______|\|__|\|__|\|__|\|__|\|_______|        \|_______|\|__|\|__|\|__|     \|__|\|_______|\_________\
                                                                                                                \|_________|                                                                                                                  
        `;
        console.log(logo);
    }

    printInfo(info){
        console.log(info);
    }
}

export default Logger;
