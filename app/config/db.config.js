require('dotenv').config()
const Sequelize = require("sequelize");

module.exports = {
    HOST: process.env.DB_CONNECTION,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,

    dialect: "postgres",
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 20000
    },
    dialectOptions: {
        useUTC: false, 
        dateStrings: true,
        typeCast: true
    },
    timezone: '-05:00'
    }

