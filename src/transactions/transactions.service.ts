import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto/create-deposit.dto';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto/create-withdrawal.dto';

@Injectable()
export class TransactionsService {
  constructor(@Inject('KnexConnection') private readonly knex) {}

  async createDeposit(createDepositDto: CreateDepositDto, user) {
    const trx = await this.knex.transaction();
    try {
      await trx
        .insert({
          user_id: user.id,
          type: 'DEPOSIT',
          amount: createDepositDto.amount,
          ref: this.generateRef(),
        })
        .into('transactions');

      await trx
        .table('users')
        .where('id', user.id)
        .increment('balance', createDepositDto.amount);

      await trx.commit();
      return {
        message: 'Deposit transaction created successfully',
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      await trx.rollback(error);
      throw new HttpException(
        { message: `Transaction failed, reversed` },
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  async createWithdrawal(createWithdrawalDto: CreateWithdrawalDto, user) {
    const trx = await this.knex.transaction();

    if (createWithdrawalDto.amount > user.balance) {
      throw new HttpException(
        { message: `Transaction not completed, insufficient balance` },
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
    try {
      await trx
        .insert({
          user_id: user.id,
          type: 'WITHDRAWAL',
          amount: createWithdrawalDto.amount,
          ref: this.generateRef(),
        })
        .into('transactions');

      await trx
        .table('users')
        .where('id', user.id)
        .decrement('balance', createWithdrawalDto.amount);

      await trx.commit();
      return {
        message: 'Withdrawal transaction created successfully',
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      await trx.rollback(error);
      throw new HttpException(
        { message: `Transaction failed, reversed` },
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  async createTransfer() {
    
  }

  generateRef(): string {
    return `Refno-${
      Date.now().toString(36) + Math.random().toString(36).substr(2)
    }`;
  }
}
