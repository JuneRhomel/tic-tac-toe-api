import { Response } from "express"
import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"
import CreateGamePlayersDataSource from "../data_source/create_game_player.data_source"
import PlayerModel from "../model/player.model"
import ValidationFailure from "../../application/failure/common/validation"
import ApiGatewayHelperParams from "../../application/interface/api_gateway_helper.params"
import PlayerDto from "../../application/dto/player.dto"

export default async function CreateGamePlayersUseCase({ req, res }: ApiGatewayHelperParams): Promise<Response> {
    try {
        const playerModel1 = plainToInstance(PlayerModel, req.body.player1 as PlayerDto, {
            excludeExtraneousValues: true
        })
        const playerModel2 = plainToInstance(PlayerModel, req.body.player2 as PlayerDto, {
            excludeExtraneousValues: true
        })

        const player1ValidationErrors = await validate(playerModel1)
        const player2ValidationErrors = await validate(playerModel2)

        if (player1ValidationErrors.length > 0 || player2ValidationErrors.length > 0) {
            return res.status(400).json(new ValidationFailure({ extra: player1ValidationErrors.concat(player2ValidationErrors) }))
        }
        playerModel1.score = 0
        playerModel2.score = 0

        const result = await CreateGamePlayersDataSource({
            playerModel1,
            playerModel2
        })

        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json(error);
    }
}