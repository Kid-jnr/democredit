import { IsNumber } from "class-validator";
import { CreateDepositDto } from "../create-deposit.dto/create-deposit.dto";

export class CreateTransferDto extends CreateDepositDto {
    
    @IsNumber()
    readonly receiver_id: number
}
