const bcrypt = require('bcrypt');
const { users } = require("../models");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

//Create user if not there already
exports.create = (req, res) => {
    // Check request 
    if (!req.body.first_name) {
      res.status(400).send();
      return;
    }
    else if(!req.body.last_name){
        res.status(400).send();
          return; 
    }
    else if(!req.body.username){
        res.status(400).send();
          return; 
    }
    else if(!req.body.password){
        res.status(400).send();
          return; 
    }

    bcrypt.hash(req.body.password, 10, (err,hash) => {
        if(err){
            res.status(500).json({
                message : "Oops! User could not be created. Please try again"
            });
        }
        else{
            const userObject = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hash
            }
            User.create(userObject)
            .then(data => {
              var auth = 'Basic ' + Buffer.from(req.body.username + ':' + req.body.password).toString('base64');
              console.log(auth);  
              const token = ({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                }
                )
                console.log("data:", data);
                const dataNew = {
                  id : data.id,
                  first_name : req.body.first_name,
                  last_name : req.body.last_name,
                  username : req.body.username,
                  account_created: data.account_created,
                  account_updated: data.account_updated
                }
                res.status(201).send(dataNew);
            })
            .catch(err => {
              console.log(err)
                // res.status(400).send();
                res.status(400).send({
                  message : "User already exists!"
              });
         });
        }
    } )
  };

// Find all users
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred, please try again"
      });
    });
};

// Find the specific user by id
exports.findOne = (req, res) => {
  console.log('Finding one', res.locals);
  User.findByPk(req.params.id)
    .then(data => {
      res.status(200).send({
        id: data.id,
        first_name : data.first_name,
        last_name: data.last_name,
        username: data.username
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id:" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {  
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    console.log("request", req)
    if(err){
      console.log(err);
      res.status(400).json({
        message : "Provide the user ID to update"
      });
    }
    else if(req.params.id == null){
      res.status(400).json({
        message: "Provide the user ID to update"
      })
    }
    else{
      const id = req.params.id;
      console.log("id", id)
      if (req.body.username) {
        res.status(400).send({
          message: "Oops! Username cannot be updated"
        });
        return;
      }
      if (req.body.account_created) {
        res.status(400).send({
          message: "account_created cannot be updated"
        });
        return;
      }
      if (req.body.account_updated) {
        res.status(400).send({
          message: "account_updated cannot be updated"
        });
        return;
      }
      const userUpdate = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hash
    }
      User.update(userUpdate, {
        where: { id: id}
       })
      .then(num => {
        console.log("num", num)
        if (num == 1) {
          res.status(200).send({
            message: "User was updated successfully!"
         });
        } else {
          res.status(400).send({
            message: "Cannot update User with id=${id}. Maybe User was not found"
          });
        }
      })
     .catch(err => {
       res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
    }
  })
  
};

