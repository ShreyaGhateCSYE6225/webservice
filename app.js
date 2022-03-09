const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.port || 8080;
const cors = require("cors");
const auth = require("./app/auth/auth")
const app = express();

global.__basedir = __dirname;

var corsOptions = {
    origin : "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(
    bodyParser.raw({ limit: '50mb', type: ['image/*'] })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));
const db = require("./app/models");

db.sequelize.sync();

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

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