require('dotenv').config()
module.exports =  {
  development: {
    username: "kcbzqqtolbfptd",
    password: "707b2581fc88f5210e6275838c65dff599f2f1afcb9f729efc3bcb3429184a03",
    database: "d705jb8c4b6bg5",
    host: 'ec2-54-155-254-112.eu-west-1.compute.amazonaws.com',
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
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    ssl: true,
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
        }
  }
}
