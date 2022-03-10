require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const util = require("util");
const bodyParser = require('body-parser');

const bucketName = process.env.S3_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION

console.log('bucket', bucketName)
const s3 = new S3({
    region,
    // accessKeyId,
    // secretAccessKey
})

exports.uploadFileToS3 =  (req, res, userData) => {
    let base64data = Buffer.from(JSON.stringify(req.body), 'binary')

    console.log("File header", req)
      const uploadParams = {
      Bucket: bucketName,
      Body: base64data,
      Key: "UserProfilePic_" + userData.id
      }
     return s3.upload(uploadParams).promise()
      
    }
    
exports.deleteFileFromS3 = (req,res,result) => {
  console.log("result", result)
  const params1 = {
      Bucket: bucketName,
      Key: "UserProfilePic_" + result.id
  }
  return s3.deleteObject(params1).promise()

} 