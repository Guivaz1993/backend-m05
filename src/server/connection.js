const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "McC4llB@ckF3l1z",
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = knex;
