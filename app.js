const express = require('express');
const port = process.env.port || 8000;
const app = express();

app.get("/healthz", (req, res) => {
    res.json({ message: "Hello World" });
  });

app.listen(port,()=> {
console.log('listening on port 8000');
})
module.exports = app

