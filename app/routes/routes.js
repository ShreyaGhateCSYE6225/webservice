module.exports = app => {
    const user = require("../controllers/user.js");
    const auth = require("../auth/auth")
    const bodyParser = require('body-parser')
    const uploadFileToS3 = require("../../s3")
    var router = require("express").Router();

    // Retrieve an Authenticated User
    router.get("/self", auth, user.findOne);

    // Update an Authenticated User
    router.put("/self", auth, user.update);

    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all Users
    router.get("/all", user.findAll);
  
    // Add or Update Profile Picture of an Authenticated User
    router.post("/self/pic",auth, user.upload);
   
    // Retrieve Profile Picture of an Authenticated User
    router.get("/self/pic", auth, user.fetchImageByUsername);

    //Delete Profile Picture of an Authenticated User
    router.delete("/self/pic",auth,user.deleteImageByUserId);

    app.use("/v1/user", router);
  };