import ApiGatewayHelperParams from "../../application/interface/api_gateway_helper.params";
import { Response } from "express";
import EndGameDataSource from "../data_source/end_game.data_source";
import GetGameDetailsDataSource from "../data_source/get_game_details.data_source";

export default async function EndGameUseCase({ req, res }: ApiGatewayHelperParams): Promise<Response> {
    try {
        const gameId = req.params.id as string

        const gameDetails = await GetGameDetailsDataSource({ gameId })

        if (!gameDetails) {
            return res.status(404).json("Game not found")
        }

        let winnerPlayer = gameDetails.player2.name

        if (gameDetails.player1.score > gameDetails.player2.score) {
            winnerPlayer = gameDetails.player1.name
        }

        if (gameDetails.player1.score === gameDetails.player2.score) {
            winnerPlayer = "draw"
        }

        const isDraw = winnerPlayer === "draw"

        const endGame = await EndGameDataSource({ gameId, winnerPlayer, isDraw })

        return res.status(200).json(endGame)

    } catch (error) {
        return res.status(500).json(error);
    }
}