// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      database: 'democredit',
      user:     'root',
      password: ''
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations/users'
    },
  },

 
  production: {
    client: 'mysql',
    connection: process.env.CLEARDB_BLUE_URL,
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: './migrations/users'
    }
  }

};
