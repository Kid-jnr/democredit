import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto/create-deposit.dto';
import { CreateTransferDto } from './dto/create-transfer.dto/create-transfer.dto';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto/create-withdrawal.dto';

@Injectable()
export class TransactionsService {
  constructor(@Inject('KnexConnection') private readonly knex) {}

  async createDeposit(
    createDepositDto: CreateDepositDto,
    user,
    receiverId: number | null,
  ) {
    const trx = await this.knex.transaction();
    try {
      const data = await trx
        .insert({
          user_id: user.id,
          type: 'DEPOSIT',
          amount: createDepositDto.amount,
          ref: this.generateRef(),
          receiver_id: receiverId,
        })
        .into('transactions');

      await trx
        .table('users')
        .where('id', receiverId ? receiverId : user.id)
        .increment('balance', createDepositDto.amount);

      const deposit = await trx
        .table('transactions')
        .where('id', data[0])
        .first();

      await trx.commit();
      return {
        deposit: deposit,
        message: 'Deposit transaction created successfully',
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      await trx.rollback(error);
      throw new HttpException(
        {
          message: `Transaction failed, reversed - ${error}`,
          code: HttpStatus.NOT_IMPLEMENTED,
        },
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
      const data = await trx
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

        const withdrawal = await trx
        .table('transactions')
        .where('id', data[0])
        .first();

      await trx.commit();
      return {
        withdrawal: withdrawal,
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

  async createTransfer(createTransferDto: CreateTransferDto, user) {
    await this.createWithdrawal(createTransferDto, user);
    await this.createDeposit(
      createTransferDto,
      user,
      createTransferDto.receiver_id,
    );

    return {
      message: 'Transfer transaction created successfully',
      code: HttpStatus.CREATED,
    };
  }

  private generateRef(): string {
    return `Refno-${
      Date.now().toString(36) + Math.random().toString(36).substr(2)
    }`;
  }
}
