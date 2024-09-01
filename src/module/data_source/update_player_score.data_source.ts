import { ObjectId } from "mongodb";
import MongoDbClient from "../../mongodb/database_connection.monggodb";
import PlayerModel from "../model/player.model";

export default async function UpdatePlayer1ScoreDataSource({
    gameId,
    winnerPlayerIdentifier,
    score
}: {
    gameId: string,
    winnerPlayerIdentifier: string,
    score: number,

}) {

    const client = await MongoDbClient()

    const result = await client.db("tictactoe").collection("game").updateOne(
        {
            _id: ObjectId.createFromHexString(gameId),
        },
        {
            $set: {
                [`${winnerPlayerIdentifier}.score`]: score,
            }
        }
    );

    return result;
}
