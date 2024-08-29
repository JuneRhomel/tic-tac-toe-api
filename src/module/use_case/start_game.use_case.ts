import { plainToInstance } from "class-transformer";
import ApiGatewayHelperParams from "../../application/interface/api_gateway_helper.params";
import { Response } from "express";
import RoundsModel from "../model/rounds.model";
import RoundsDto from "../../application/dto/rounds.dto";
import { validate } from "class-validator";
import ValidationFailure from "../../application/failure/common/validation";
import StartGameDataSource from "../data_source/start_game.data_source";
import UpdatePlayer1ScoreDataSource from "../data_source/update_player_score.data_source";
import GetGameDetailsDataSource from "../data_source/get_game_details.data_source";
import DrawGameDataSource from "../data_source/draw_game.data_source";


export default async function StartGameUseCase({ req, res }: ApiGatewayHelperParams): Promise<Response> {
    try {
        const gameId = req.params.id as string

        const roundsModel = plainToInstance(RoundsModel, req.body as RoundsDto, {
            excludeExtraneousValues: true
        })

        const validateError = await validate(roundsModel)

        if (validateError.length > 0) {
            return res.status(400).json(new ValidationFailure({ extra: validateError }))
        }
        const gameDetails = await GetGameDetailsDataSource({ gameId })

        if (!gameDetails) {
            return res.status(404).json("Game not found")
        }

        const incrementRounds = gameDetails.rounds === undefined ? 1 : gameDetails.rounds.length + 1
        roundsModel.round = incrementRounds

        if (roundsModel.isDraw === true) {
            const [startGame, drawScore] = await Promise.all([
                StartGameDataSource({
                    roundsModel,
                    gameId
                }),
                DrawGameDataSource({
                    gameId,
                    drawScore: gameDetails.drawScore === undefined ? 1 : gameDetails.drawScore + 1
                })
            ])

            return res.status(200).json({ startGame, drawScore })
        }

        const whoIsWinner = roundsModel.winner === gameDetails.player1.name ? gameDetails.player1 : gameDetails.player2

        let winnerPlayerIdentifier = "unknown";

        if (whoIsWinner.name === gameDetails.player1.name) {
            winnerPlayerIdentifier = "player1"
        }

        if (whoIsWinner.name === gameDetails.player2.name) {
            winnerPlayerIdentifier = "player2"
        }

        if (winnerPlayerIdentifier === "unknown") {
            return res.status(401).json("Unknown winner")
        }

        const [startGame, updateScore] = await Promise.all([
            StartGameDataSource({
                roundsModel,
                gameId
            }),

            UpdatePlayer1ScoreDataSource({
                gameId,
                winnerPlayerIdentifier,
                score: whoIsWinner.score + 1
            })
        ])

        return res.status(200).json({
            startGame,
            updateScore
        });

    } catch (error) {
        return res.status(500).json(error);
    }

}