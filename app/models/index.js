const dbconfigCreds = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbconfigCreds.db, dbconfigCreds.user, dbconfigCreds.password, {
    host: dbconfigCreds.Host,
    dialect: dbconfigCreds.dialect,
    operatorAliases: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user")(sequelize, Sequelize);
module.exports = db;