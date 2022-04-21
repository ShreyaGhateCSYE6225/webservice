const dbconfigCreds = require("../config/db.config");
const Sequelize = require("sequelize");
const fs = require("fs");

// const __dirname = null;
console.log("PWD", process.env.PWD);
console.log("__dirname=", __dirname);
const RDSCA = fs.readFileSync(__dirname +'/us-east-1-bundle.pem');
console.log("RDSCA", RDSCA);
const sequelize = new Sequelize(dbconfigCreds.DB, dbconfigCreds.USER, dbconfigCreds.PASSWORD, {
    host: dbconfigCreds.HOST,
    port: dbconfigCreds.PORT,
    dialect: dbconfigCreds.dialect,
    dialectOptions: {
        useUTC: false, 
        dateStrings: true,
        typeCast: true,
        ssl: {
            rejectUnauthorized: true,
            ca: [RDSCA]
        },
    },
    operatorAliases: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user")(sequelize, Sequelize);
db.images = require("./image")(sequelize, Sequelize);

module.exports = db;