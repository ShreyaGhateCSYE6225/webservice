require('dotenv').config()
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const bodyParser = require("body-parser");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const uploadFile = (req, res, file) => {
  fs.readFile('binary' , function(err, data){
    if(err){
      message: err
    }
    else{
      console.log(JSON.parse(data))
    }
  })
}

module.exports = uploadFile;