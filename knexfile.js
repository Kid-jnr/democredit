// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'democredit',
      user:     'postgres',
      password: 'password'
    },
    migrations: {
      directory: './migrations/users'
    },
  },

 
  production: {
    client: 'postgresql',
    connection: {
      database: 'democredit',
      user:     'pass',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations/users'
    }
  }

};
