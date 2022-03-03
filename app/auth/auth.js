const bcrypt = require('bcrypt');
const db = require("../models");
const User = db.users;

module.exports = (req, res, next) => {
  var authHeader = req.headers.authorization;

  if (!authHeader) {
    var err = new Error("Unauthenticated! Please authenticate yourself");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    err.message="Unauthenticated User! Please authenticate yourself";
    res.status(401).send(err.message);
  }

  console.log("authHeader", authHeader);
  var auth = new Buffer(authHeader.split(" ")[1], "base64").toString().split(":");

  var username = auth[0];
  var password = auth[1];

User.findOne({
  where: {
    username
  }
}).then(result => {
  const verified = bcrypt.compareSync(password, result.password);
  console.log(verified);
  if (!verified) {
    var err = new Error("You are not authenticated");

    res.setHeader("WWW-Authenticate", "Basic");

    err.status = 401;
    err.message = "User is not authenticated";
    res.status(401).send(err.message);
  }
  else {
    console.log(req.method);
    if (req.method === 'GET') {
      res.status(200).send({
        id:result.id,
        first_name :result.first_name,
        last_name:result.last_name,
        username:result.username,
        account_created: result.account_created,
        account_updated: result.account_updated
    })
    }
    else if (req.method === 'PUT') {
        console.log(req.body);
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
          console.log("error", err)
          res.status(400).send();
        }
        else{
          const id = result.id;
          console.log("id", id)

      if (req.body.username) {
        res.status(400).send("username cannot be updated");
        return;
      }
      if (req.body.account_created) {
        res.status(400).send("account_created field cannot be updated");
        return;
      }
      if (req.body.account_updated) {
        res.status(400).send("account_updated field cannot be updated");
        return;
      }
      const userUpdate = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hash
    }
      User.update(userUpdate,{
        where:{
          id: result.id
        } 
      }).then(data => {
          console.log("data", data);
          res.status(204).json({
            message: "User was updated successfully!"
         });      
        })
        }
      })
    }
    }
})
}