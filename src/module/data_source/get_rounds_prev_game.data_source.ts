import { ObjectId } from "mongodb";
import MongoDbClient from "../../mongodb/database_connection.monggodb";

export default async function GetRoundsPrevGameDataSource({ gameId }: { gameId: string }) {

    const client = await MongoDbClient()

    const result = await client.db("tictactoe").collection("game")
        .findOne(
            {
                _id: ObjectId.createFromHexString(gameId)
            },
            {
                projection: {
                    rounds: 1
                }
            }
        )
    return result
}