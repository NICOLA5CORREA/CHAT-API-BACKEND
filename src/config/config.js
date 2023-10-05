require('dotenv').config()

module.exports= 
{
  "development": {
    "username": "postgres",
    "password": "root",
    "database": "chat_db_27",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    username: "proces.env.DB_USER",
    password: "proces.env.DB_PASSWORD",
    database: "proces.env.DB_NAME",
    host: "proces.env.DB_HOST",
    dialect: "postgres",
    logging: false,
    dialectOptions: { ssl: { required: true, rejectUnauthorized: false } },
  }
};
