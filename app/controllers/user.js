const bcrypt = require('bcrypt');
const { users } = require("../models");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const multer = require('multer');
const path = require('path');
const Image = db.images;
const uploadFile = require("../auth/imageupload");
const {uploadFileToS3} = require("../../S3Config");
const {deleteFileFromS3} = require("../../S3Config");
const fs = require("fs");
const util = require('util');
const baseUrl = "http://localhost:8080/v1/self/pic";
const bodyParser = require('body-parser');
const SDCClient = require("statsd-client");
const logger = require('../config/logger');
const sdcclient = new SDCClient({ host: 'localhost', port: 8125, prefix: 'csye6225webapp'});

sdcclient.increment('GET /healthz');

//Create user if not there already
exports.create = (req, res) => {
    // Check request 
    logger.info("Create User Call");
    sdcclient.increment("Create User");
    let startTime = new Date();

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
              console.log("data!!!!!", data);  
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
              console.log(err.message)
                // res.status(400).send();
                if (err.message == "Validation error: Username should be a valid email address!") {
                res.status(400).send({
                  message : "Enter a valid email address for username"
              });
            } else {
              console.log(err.message)
              res.status(400).send({
                message : "User already exists or some other error occurred"
            });
            }
         });
        }
    } )
    let endTime = new Date();
    sdcclient.timing(
      "User creation time",
      endTime - startTime
    );
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
  // console.log('Finding one', res.locals);
  logger.info("Find User Call");
  sdcclient.increment("Find User");
  let startTime = new Date();

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
        error: err,
        message: "Error retrieving user with id=" + id
      });
    });
    sdcclient.timing(
      "Specific User Get time",
      endTime - startTime
    );
};

// Update a User by the id in the request
exports.update = (req, res) => {  
  logger.info("Update User Call");
  sdcclient.increment("Update User");
  let startTime = new Date();

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

  let endTime = new Date();
  sdcclient.timing(
    "User Update time",
    endTime - startTime
  );
  
};

//Creating Image DB
exports.createImage = async (req, res, location) => {
  // console.log(req.body)
  logger.info("Create Image Call");
  sdcclient.increment("Create Image");
  let startTime = new Date();
  const user = await this.findUser(global.username)
  const imageData = ({
    file_name: req.file_name,
    id: user.id,
    url: location,
    upload_date: new Date(),
    user_id: user.id,
  })
  // console.log(imageData)
  const ifImage = await this.findImageByUserID(user.id)
  if(ifImage){
    await Image.update(imageData,{
      where:{
        id:ifImage.id
      }
    })
  }else{
    await Image.create(imageData)
  }
  let endTime = new Date();
  sdcclient.timing(
    "Create Image time",
    endTime - startTime
  );
  return imageData
  
}


// Uploading user profile picture
exports.upload = async (req, res) => {
  logger.info("Upload Image Call");
  sdcclient.increment("Upload Image");
  let startTime = new Date();
    bodyParser.raw({type: ["image/jpeg", "image/png", "image/jpg"], limit: "3mb"}),
    console.log(req.body)
    if(!req.body){
      return res.status(400).send({
        message: "Request body not found",
      });
    }
  try {
    // const file = req.file
    // var file_name=req.files.upload.name;
    console.log("file name", req);
    const userData = await this.findUser(global.username)
    
    const result = await uploadFileToS3(req, res,userData);
    const imageObj = {
      file_name: result.Key,
      url: result.Location
    }
    console.log("inside upload",req.body)
    console.log("filename", result);
    req.file_name = result.Key
    const location = result.Location
    const id = JSON.parse(result.ETag)
    const imageOutput = await this.createImage(req, res, location)
    
    res.status(201).send(
      // message: "Profile picture added",
      imageOutput
    )
  } catch (err) {
    console.log("errrr",err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(400).send({
        message: "File size exceeds 2MB, please upload another file!",
      });
    }
    return res.status(400).send({
      message: "Error",
    });
    
  }
  let endTime = new Date();
  sdcclient.timing(
    "Image Upload time",
    endTime - startTime
  );
};

exports.getListFiles = (req, res) => {
  logger.info("Fetching List Call");
  sdcclient.increment("Fetching List");
  let startTime = new Date();

  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    sdcclient.timing(
      "Get List time",
      endTime - startTime
    );
    res.status(200).send(fileInfos);
  });
};

//find user by username
exports.findUser = async(username)=>{
  let result = await User.findOne({
    where: {
        username: username
    }
  });
return result;
}

//find image by user
exports.findImageByUserID = async(userId)=>{
  let result = await Image.findOne({
    where: {
        user_id: userId
    }
  });
return result;
}

//Get all user data
exports.getUser = async(req, res)=>{
  logger.info("Fetch User Data Call");
  sdcclient.increment("Fetch User Data");
  let startTime = new Date();
  let result = await User.findOne({
    where: {
      username:global.username
    }
  });
  let endTime = new Date();
  sdcclient.timing(
    "Get User Data time",
    endTime - startTime
  );
  res.status(200).send({
    id:result.id,
    first_name :result.first_name,
    last_name:result.last_name,
    username:result.username,
    account_created: result.account_created,
    account_updated: result.account_updated
  })
}

//Get profile picture of Authenticated user
exports.getProfilePicture = async (req, res)=>{
  logger.info("Get User Profile Picture Call");
  sdcclient.increment("Get User Profile Picture");
  let startTime = new Date();
  let result = await User.findOne({
    where: {
      username:global.username
    }
  });
  // console.log("UserData", req)
  const result1 = await Image.findOne({
    where: {
      user_id: result.id
    }
  })
  .then(data => {
    const imageData = {
      file_name: data.file_name,
      id: data.id,
      url: data.url,
      upload_date: data.upload_date,
      user_id: data.user_id
    }  
    let endTime = new Date();
      sdcclient.timing(
        "Get User Profile Pic time",
        endTime - startTime
      );
    res.status(200).send(imageData);
  }
  )
  .catch(err => {
    console.log(err)
    res.status(404).send({
      message: "This user does not have a profile picture set!"
    })
  })
}

//delete the user profile picture
exports.deleteProfilePic = async(req, res)=>{
  logger.info("Delete User Profile Picture Call");
  sdcclient.increment("Delete User Profile Picture");
  let startTime = new Date();
  let result = await User.findOne({
    where: {
      username:global.username
    }
  });
  console.log("Request Body", req.body)
  let result1 = await Image.destroy({
    where: {
        user_id:result.id
    }
  });
  console.log("Inside delete",result1)
  await deleteFileFromS3(req, res, result)
  .then(data => {
    let endTime = new Date();
    sdcclient.timing(
      "Delete Profile Picture time",
      endTime - startTime);
    res.status(204).send()
  })
  .catch(err => {
    res.status(404).send()
  })
  
}
