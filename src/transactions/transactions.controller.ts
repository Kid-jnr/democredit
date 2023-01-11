import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { Request } from 'express';
import { CreateDepositDto } from './dto/create-deposit.dto/create-deposit.dto';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto/create-withdrawal.dto';
import { TransactionsService } from './transactions.service';

@UseGuards( AuthGuard('jwt'))
@Controller('transaction')
export class TransactionsController {
    constructor( private transactionService: TransactionsService ){}

    @Post('deposit')
    deposit(@Body() createDepositDto: CreateDepositDto,@Req() req: Request ){
        return this.transactionService.createDeposit(createDepositDto,req.user)
    }

    @Post('withdrawal')
    withdrawal(@Body() createWithdrawalDto: CreateWithdrawalDto,@Req() req: Request){
        return this.transactionService.createWithdrawal(createWithdrawalDto,req.user)
    }

    @Post('transfer')
    transfer(){
        return "transfer"
    }
}
