import { IsNumber, Min } from "class-validator";

export class CreateDepositDto {

    @IsNumber()
    @Min(100)
    readonly amount: number
}
