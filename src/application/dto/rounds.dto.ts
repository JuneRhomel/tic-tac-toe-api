import { Expose } from "class-transformer";

export default class RoundsDto {
    @Expose()
    round: number;

    @Expose()
    winner: string;

    @Expose()
    board: string[];

    constructor(round: number, winner: string, board: string[]) {
        this.round = round;
        this.winner = winner;
        this.board = board;
    }
}