/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('transactions', function (table){
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable()
    table.integer('receiver_id').unsigned().nullable()
    table.foreign('user_id').references('id').inTable('users').onDelete("CASCADE")
    table.foreign('receiver_id').references('id').inTable('users').onDelete("SET NULL")
    table.enu('type',['DEPOSIT', 'WITHDRAWAL']).notNullable
    table.decimal('amount').notNullable
    table.string('ref').notNullable
    table.timestamps(false, true)
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
