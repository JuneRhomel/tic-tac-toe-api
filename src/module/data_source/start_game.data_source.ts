import { ObjectId } from "mongodb";
import MongoDbClient from "../../mongodb/database_connection.monggodb";
import RoundsModel from "../model/rounds.model";

export default async function StartGameDataSource({
    roundsModel,
    gameId
}: {
    roundsModel: RoundsModel,
    gameId: string
}) {
    await MongoDbClient.connect();
    await MongoDbClient.db("admin").command({ ping: 1 });

    const result = await MongoDbClient.db("tictactoe").collection("game").updateOne(
        {
            _id: ObjectId.createFromHexString(gameId)
        },
        {
            $push: {
                rounds: roundsModel,
            }
        }
    );

    return result;
}
