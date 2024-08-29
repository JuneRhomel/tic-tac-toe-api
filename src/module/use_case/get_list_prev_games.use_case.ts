import ApiGatewayHelperParams from "../../application/interface/api_gateway_helper.params";
import GetListPrevGamesDataSource from "../data_source/get_list_prev_games.data_source";
import { Response } from "express";
export default async function GetListPrevGamesUseCase({ req, res }: ApiGatewayHelperParams): Promise<Response> {
    try {
        const list = await GetListPrevGamesDataSource({
            start: req.params.start ? Number(req.params.start) : 1,
            end: req.params.end ? Number(req.params.end) : 10
        })
        return res.status(200).json(list)
    } catch (error) {
        return res.status(500).json(error);
    }
}