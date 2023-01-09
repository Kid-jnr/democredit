import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TransactionsController } from './transactions/transactions.controller';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, TransactionsController, AuthenticationController],
  providers: [AppService],
})
export class AppModule {}
