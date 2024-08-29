import { IsNumber, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";

export default class PlayerDto {

    @Expose()
    name: string;

    @Expose()
    symbol: "X" | "O";

    @Expose()
    score: number;

    constructor( name: string, symbol: "X" | "O") {
        this.name = name;
        this.symbol = symbol;
        this.score = 0;
    }
}
