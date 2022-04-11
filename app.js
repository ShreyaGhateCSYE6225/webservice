const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.port || 8080;
const cors = require("cors");
const auth = require("./app/auth/auth")
const app = express();
const SDCClient = require("statsd-client");
const logger = require('./app/config/logger');
const sdcclient = new SDCClient({ host: 'localhost', port: 8125, prefix: 'csye6225webapp'});

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

app.get("/healthz", (req, res) => {
    logger.info("GET /healthz Call");
    sdcclient.increment("GET /healthz");
    let startTime = new Date();
    res.json({ message: "Hello from Healthz" });
    let endTime = new Date();
    sdcclient.timing(
      "healthz endpoint executed",
      endTime - startTime
    );
  });

app.get("/v1", (req, res) => {
    res.json({message: "Hello, this is v1 users database"});
})

app.get("/health", (req, res) => {
    res.json({message: "Hello, this is a health endpoint for DEMO"});
})

require("./app/routes/routes")(app);

app.listen(port,()=> {
console.log('listening on port 8080');
})
module.exports = app
