import knex from 'knex';
import uuid from 'uuid';

class DB {
    constructor(){
        this.knex = knex({
            client: 'better-sqlite3',
            useNullAsDefault: true,
            connection: {
                filename: "../db/database.sqlite",
            }
        });
    }

    async initDatabase(a=[]) {
        try{
            let sql = global.fileManager.getInitSql();
            sql = sql.split('---');

            for(let i = 0; i < sql.length; i++){
                await this.knex.raw(sql[i]);
            }
        } catch (err){
            console.log(`Error in initDatabase: ${err}`);
        }
    }

    async createUser(email){
        try {
            let user = {
                user_id: uuid.v4(),
                nickname: email,
                email: email,
                lastactive_date: this.knex.fn.now(),
                registration_date: this.knex.fn.now()
            }

            result = await this.knex('users').insert(user);
            console.log(`New user ${user.email} registered.`);
            return result;
        }
        catch (err) {
            console.log(`Error in createOrUpdateUser: ${err}`);
        }
    }

    async getUserByEmail(email) {
        try {
            let user = await this.knex('users').select('*')
                .where('email', email)
                .first();

            if(!user) return false;
            return user;
        } catch (err) {
            console.log(`Error in getUserByEmail: ${err}`);
            return false;
        }
    }

    async updateUserNickname(email, nickname) {
        try {
            let result = await this.knex('users')
                .where('email', email)
                .update({nickname: nickname});

            console.log(`User ${email} was updated.`);
            return result;
        } catch (err) {
            console.log(`Error in createOrUpdateUser: ${err}`);
        }
    }

    async updateUserLastActive(email) {
        try {
            let result = await this.knex('users')
                .where('email', email)
                .update({lastactive_date: this.knex.fn.now()});

            return result;
        } catch (err) {
            console.log(`Error in updateUserLastActive: ${err}`);
            return false;
        }
    }

    async createGame(game_type, fen_string, player1, player2){
        try{
            let game = {
                game_id: uuid.v4(),
                game_type: game_type,
                fen_string: fen_string,
                player1: player1,
                player2: player2,
                game_time: this.knex.fn.now(),
            }

            const result = await this.knex('games').insert(game);
            console.log(`New game created.`);

            return result;
        } catch (err) {
            console.log(`Error in createGame: ${err}`);
            return false;
        }
    }

    async getGamesByPlayerId(playerId, skip, take){
        try {
            const result = await this.knex('games')
                .select('*')
                .where('player1', playerId)
                .orWhere('player2', playerId)
                .limit(take)
                .offset(skip);
            return result;
        } catch (err) {
            console.log(`Error in getGamesByPlayerId: ${err}`);
            return false;
        }
    }
}

export default DB;