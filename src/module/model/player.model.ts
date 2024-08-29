import { IsNumber, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";

export default class PlayerModel {

    @Expose()
    @IsString()
    name: string;

    @Expose()
    symbol: "X" | "O";

    @IsNumber()
    @IsOptional()
    score: number;

    constructor(name: string, symbol: "X" | "O", score: number) {
        this.name = name;
        this.symbol = symbol;
        this.score = score;
    }
}
