import { Expose } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export default class RoundsModel {
    @Expose()
    @IsOptional()
    @IsNumber()
    round: number;

    @Expose()
    @IsString()
    winner: string;

    @Expose()
    board: string[];

    @Expose()
    @IsBoolean()
    isDraw: boolean;

    constructor(round: number, winner: string, board: string[], isDraw: boolean) {
        this.round = round;
        this.winner = winner;
        this.board = board;
        this.isDraw = isDraw
    }
}