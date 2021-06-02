require('dotenv').config()
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "user",
    database: "db_todos",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "user",
    database: "db_todos",
    host: "127.0.0.1",
    dialect: "postgres"
  }
}
module.exports = config;