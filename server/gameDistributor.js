class GameDistributor {
    constructor() {
        this.playersInQueue = [];
    }

    onCreateGame(playerId) {
        if(this.playersInQueue.length === 0){
            this.playersInQueue.push(playerId);
            return null;
        }
        const opponentId = this.playersInQueue[0];
        this.playersInQueue.splice(0, 1);
        return {
            player1: playerId, 
            player2: opponentId
        }; 
    }

    onCanCreateGame(playerId){
        const a = this.playersInQueue.includes(playerId); 
        return !this.playersInQueue.includes(playerId);
    }
}

export default GameDistributor;