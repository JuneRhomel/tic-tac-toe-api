import ApiGatewayHelperParams from "../../application/interface/api_gateway_helper.params"
import GetGameDetailsDataSource from "../data_source/get_game_details.data_source"
import { Response } from "express"


export default async function GetGameDetailsUseCase({ req, res }: ApiGatewayHelperParams): Promise<Response> {
    try {
        const gameId = req.params.id as string
        const game = await GetGameDetailsDataSource({ gameId })
        return res.status(200).json(game)
    } catch (error) {
        return res.status(500).json(error)
    }
}