import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import PlayerModel from "./player.model";
import RoundsModel from "./rounds.model";
import { Expose } from "class-transformer";


export default class GameModel {
    @Expose()
    @IsString()
    _id: string;

    @IsDate()
    createdAt: Date;

    @Expose()
    player1: PlayerModel;

    @Expose()
    player2: PlayerModel;

    @Expose()
    rounds: RoundsModel[];

    @IsNumber()
    totalRounds: number;

    @IsString()
    overallWinner: string;

    @IsNumber()
    drawScore: number;

    @IsBoolean()
    isDraw: boolean;

    constructor(_id: string, createdAt: Date, player1: PlayerModel, player2: PlayerModel, rounds: RoundsModel[], totalRounds: number, overallWinner: string, drawScore: number, isDraw: boolean) {
        this._id = _id;
        this.createdAt = createdAt;
        this.player1 = player1;
        this.player2 = player2;
        this.rounds = rounds;
        this.totalRounds = totalRounds;
        this.overallWinner = overallWinner;
        this.drawScore = drawScore;
        this.isDraw = isDraw;
    }

}