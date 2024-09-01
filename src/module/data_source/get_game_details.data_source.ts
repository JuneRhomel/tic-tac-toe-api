import { ObjectId } from "mongodb";
import MongoDbClient from "../../mongodb/database_connection.monggodb";
import GameModel from "../model/game.model";

export default async function GetGameDetailsDataSource({ gameId }: { gameId: string }): Promise<GameModel> {

    const client = await MongoDbClient()
    const result = await client.db("tictactoe").collection("game").findOne(
        {
            _id: ObjectId.createFromHexString(gameId)
        }
    );

    return result;

}