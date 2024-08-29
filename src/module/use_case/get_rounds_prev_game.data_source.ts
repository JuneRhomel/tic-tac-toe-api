import { Response } from "express";
import ApiGatewayHelperParams from "../../application/interface/api_gateway_helper.params";
import GetRoundsPrevGameDataSource from "../data_source/get_rounds_prev_game.data_source";

export default async function GetRoundsPrevGameUseCase({ req, res }: ApiGatewayHelperParams): Promise<Response> {
    try {
        const gameId = req.params.id as string
        const rounds = await GetRoundsPrevGameDataSource({
            gameId
        })
        return res.status(200).json(rounds)
    } catch (error) {
        return res.status(500).json(error);
    }
}   
