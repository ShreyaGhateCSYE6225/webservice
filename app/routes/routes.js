module.exports = app => {
    const user = require("../controllers/user.js");
    const auth = require("../auth/auth")
    var router = require("express").Router();

    // Retrieve an Authenticated User
    router.get("/self", auth, user.findOne);

    // Update an Authenticated User
    router.put("/self", auth, user.update);

    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all Users
    router.get("/all", user.findAll);
  
    app.use("/v1/user", router);
  };