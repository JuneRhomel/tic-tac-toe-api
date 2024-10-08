import { ObjectId } from "mongodb";
import MongoDbClient from "../../mongodb/database_connection.monggodb";

export default async function EndGameDataSource(
    { gameId, winnerPlayer, isDraw }
        :
        { gameId: string, winnerPlayer: string, isDraw: boolean }) {

    const client = await MongoDbClient()

    const result = await client.db("tictactoe").collection("game").updateOne(
        {
            _id: ObjectId.createFromHexString(gameId)
        },
        {
            $set: {
                "overallWinner": winnerPlayer,
                "isDraw": isDraw
            }
        }
    );

    return result;
}