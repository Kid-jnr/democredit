import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  const mockTransactionsService = {
    createDeposit: jest.fn((dto, user) => {
      return {
        deposit: {
          id: expect.any(Number),
          user_id: expect.any(Number),
          type: "DEPOSIT",
          amount: expect.any(Number),
          ref:expect.any(String),
          created_at:expect.any(String),
          updated_at:expect.any(String)
        },
        message: expect.any(String),
        code: 201
      };
    }),


    createWithdrawal: jest.fn((dto, user) => {
      return {
        deposit: {
          id: expect.any(Number),
          user_id: expect.any(Number),
          type: "WITHDRAWAL",
          amount: expect.any(Number),
          ref:expect.any(String),
          created_at:expect.any(String),
          updated_at:expect.any(String)
        },
        message: expect.any(String),
        code: 201
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService],
    })
      .overrideProvider(TransactionsService)
      .useValue(mockTransactionsService)
      .compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process deposit', () => {
    const dto = {
      amount: 200,
    };

    const user: any = {
      id: 1,
      name: 'king',
      email: 'king@gmail.com',
    };

    expect(controller.deposit(dto, user)).toEqual({
      deposit: {
        id: 1,
        user_id: 2,
        type: "DEPOSIT",
        amount: 100,
        ref: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String)
      },
      message: expect.any(String),
      code: 201
    });
    
  });


  it('should process withdrawal', () => {
    const dto = {
      amount: 200,
    };

    const user: any = {
      id: 1,
      name: 'king',
      email: 'king@gmail.com',
    };

    expect(controller.withdrawal(dto, user)).toEqual({
      deposit: {
        id: 1,
        user_id: 2,
        type: "WITHDRAWAL",
        amount: 100,
        ref: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String)
      },
      message: expect.any(String),
      code: 201
    });
    
  });
});
