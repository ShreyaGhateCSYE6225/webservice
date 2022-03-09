const dbconfigCreds = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbconfigCreds.DB, dbconfigCreds.USER, dbconfigCreds.PASSWORD, {
    host: dbconfigCreds.HOST,
    port: 5432,
    dialect: dbconfigCreds.dialect,
    operatorAliases: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user")(sequelize, Sequelize);
db.images = require("./image")(sequelize, Sequelize);

module.exports = db;