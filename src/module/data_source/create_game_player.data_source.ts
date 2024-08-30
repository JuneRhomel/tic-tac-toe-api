import MongoDbClient from '../../mongodb/database_connection.monggodb';
import PlayerModel from '../model/player.model';
import { instanceToPlain } from 'class-transformer';
export default async function CreateGamePlayersDataSource(
    {
        playerModel1,
        playerModel2
    }: {
        playerModel1: PlayerModel,
        playerModel2: PlayerModel
    }
) {

    const result = await MongoDbClient.db("tictactoe").collection("game").insertOne({
        player1: instanceToPlain(playerModel1),
        player2: instanceToPlain(playerModel2),
        createdAt: new Date()
    });

    return result
}  