module.exports = app => {
    const groups = require("../controllers/group.controller");
  
    var router = require("express").Router();
  
    // Create a new Group
    router.post("/createGroup/", groups.create);
  
    // Retrieve all Groups
    router.get("/getAllGroups/", groups.findAll);
  
  
    // Retrieve a single Group with id
    router.get("/getGroupById/:id", groups.findOne);
  
    // Update a Group with id
    router.put("/UpdateGroup/:id", groups.update);
  
    // Delete a Group with id
    router.delete("/deleteGroup/:id", groups.delete);
    
  
  
    app.use('/api/groups', router);
  };