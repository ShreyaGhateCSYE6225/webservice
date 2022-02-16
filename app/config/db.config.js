module.exports = {
    host : "localhost",
    user: "shreya",
    password: "password",
    db: "webapp",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        useUTC: false, 
        dateStrings: true,
        typeCast: true
    },
    timezone: '-05:00'
    }