const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.port || 8080;
const cors = require("cors");
const auth = require("./app/auth/auth")
const app = express();

var corsOptions = {
    origin : "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));
const db = require("./app/models");
//create db if it does not exist
// const connection = mysql.createConnection({ host: `${dbConfig.HOST}`, user: `${dbConfig.USER}`, password: `${dbConfig.PASSWORD}` });
// connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\`;`);
db.sequelize.sync();

app.get("/healthz", (req, res) => {
    res.json({ message: "Hello from Healthz" });
  });

app.get("/v1", (req, res) => {
    res.json({message: "Hello, this is users database"});
})

require("./app/routes/routes")(app);

app.listen(port,()=> {
console.log('listening on port 8080');
})
module.exports = app