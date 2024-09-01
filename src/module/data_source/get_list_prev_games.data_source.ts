import MongoDbClient from "../../mongodb/database_connection.monggodb";
import GameModel from "../model/game.model";

export default async function GetListPrevGamesDataSource(
    { start = 1, end = 10 }: { start: number, end: number }
): Promise<GameModel[]> {
    const client = await MongoDbClient()

    const skip = (start - 1) * end;

    const result = await client.db("tictactoe").collection("game")
        .find({}, { projection: { rounds: 0 } })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(end)
        .toArray();

    return result;
}