/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('transactions', function (table){
    table.increments('id').primary()
    table.integer('user_id').notNullable()
    table.integer('receiver_id').nullable()
    table.foreign('user_id').references('id').inTable('users').deferrable('deferred').onDelete("CASCADE")
    table.foreign('receiver_id').references('users.id').deferrable('deferred').onDelete("SET NULL")
    table.enu('type',['DEPOSIT', 'WITHDRAWAL']).notNullable
    table.decimal('amount').notNullable
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
