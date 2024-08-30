import { ObjectId } from "mongodb";
import MongoDbClient from "../../mongodb/database_connection.monggodb";

export default async function DrawGameDataSource({ gameId, drawScore }: { gameId: string, drawScore: number }) {

    const result = await MongoDbClient.db("tictactoe").collection("game").updateOne(
        {
            _id: ObjectId.createFromHexString(gameId)
        },
        {
            $set: {
                "drawScore": drawScore
            }
        }
    );

    return result;

}