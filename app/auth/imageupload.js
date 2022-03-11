require('dotenv').config()
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const bodyParser = require("body-parser");

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

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
      console.log("uploadfileparsedata", JSON.parse(data))
    }
  })
}

module.exports = uploadFile;