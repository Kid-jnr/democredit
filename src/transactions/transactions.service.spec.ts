import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let controller: TransactionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide:  TransactionsService,
          useValue: {
            handleTransactions: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    controller = module.get<TransactionsController>(TransactionsController)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
