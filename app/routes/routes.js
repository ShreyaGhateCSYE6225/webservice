const user = require("../controllers/user.js");

module.exports = app => {
    const auth = require("../auth/auth")
    const bodyParser = require('body-parser')
    const uploadFileToS3 = require("../../S3Config")
    var router = require("express").Router();
    var verifyRoute = require("express").Router();

    console.log("entering getuser", auth, user, user.getUser, user.update)
    // Retrieve an Authenticated User
    router.get("/self", auth, user.getUser);

    console.log("entering putuser")
    // Update an Authenticated User
    router.put("/self", auth, user.update);

    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all Users
    router.get("/all", user.findAll);

    // Add or Update Profile Picture of an Authenticated User
    router.post("/self/pic", auth, user.upload);
   
    // Retrieve Profile Picture of an Authenticated User
    router.get("/self/pic", auth, user.getProfilePicture);

    //Delete Profile Picture of an Authenticated User
    router.delete("/self/pic",auth,user.deleteProfilePic);

    // router.get("/healthcheck", (req,res) => {
    //   res.send(200);
    // })
    
    router.delete("/", user.deleteAll);

    verifyRoute.get("/", user.verifyUser);

    app.use("/v1/user", router);
    app.use("/v1/verifyUserEmail", verifyRoute)
  };