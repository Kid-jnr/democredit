import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsController } from './transactions/transactions.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from './knex/knex.module';
import { TransactionsService } from './transactions/transactions.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),AuthenticationModule, KnexModule],
  controllers: [AppController, TransactionsController],
  providers: [AppService, TransactionsService],
})
export class AppModule {}
