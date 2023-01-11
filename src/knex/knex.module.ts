import { Module,Global } from '@nestjs/common';
import  * as Knex from 'knex';

@Global()
@Module({
  providers: [{
    provide: 'KnexConnection',
    useFactory:async () => {
      const knex = process.env.PRODUCTION ? Knex.default(require('../../knexfile').production) :Knex.default(require('../../knexfile').development)
      return knex
    }
  }],
  exports: [{
    provide: 'KnexConnection',
    useFactory:async () => {
      const knex = process.env.PRODUCTION ? Knex.default(require('../../knexfile').production) :Knex.default(require('../../knexfile').development)
      return knex
    }
  }]
})
export class KnexModule {}
