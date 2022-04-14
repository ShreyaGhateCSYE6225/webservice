const bcrypt = require('bcrypt');
const db = require("../models");
const multer = require('multer');
const User = db.users;
const Image = db.images;
const logger = require('../config/logger');

module.exports = (req, res, next) => {
  var authHeader = req.headers.authorization;

  if (!authHeader) {
    var err = new Error("Unauthenticated! Please authenticate yourself");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    err.message = "Unauthenticated User! Please authenticate yourself";
    res.status(401).send(err.message);
  }

  console.log("authHeader", authHeader);
  var auth = new Buffer(authHeader.split(" ")[1], "base64").toString().split(":");

  var username = auth[0];
  var password = auth[1];

  console.log('username, password', username, password);
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
    } else {
      console.log(global.username);
      console.log(result.username);
      if (req.method === 'GET') {
        global.username=result.username;
        next();
      }
      else if(req.method === 'POST'){
        global.username=result.username;
        next();
      }
      else if(req.method === 'DELETE'){
        global.username=result.username;
        next();
      }
      else if (req.method === 'PUT') {
        console.log(req.body);
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log("error", err)
            res.status(400).send();
          } else {
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
            User.update(userUpdate, {
              where: {
                id: result.id
              }
            }).then(data => {
              console.log("first data", data);
              logger.warn('Unverified user accessing update user details');
              logger.warn(JSON.stringify(data));
              logger.warn(JSON.stringify(data.user));
                if (data.user.verified == false) {
                  logger.warn('entering verify user when update user details');
                  return res.status(401).json({
                    message: 'Please verify yourself first!'
                  });
                }
                logger.warn('Unverified user access denied');
              console.log("second data", data);
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