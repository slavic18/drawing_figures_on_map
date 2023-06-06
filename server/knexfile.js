// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'adwaiseo',
      user: 'myuser',
      password: 'mypassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'database_migrations'
    }
  }

};
