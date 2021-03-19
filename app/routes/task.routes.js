module.exports = app => {
    const tasks = require("../controllers/task.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/createTask", tasks.create);
  
    // Retrieve all Tutorials
    router.get("/getAllTask", tasks.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/getTaskById/:id", tasks.findOne);
  
    // Update a Tutorial with id
    router.put("updateTask/:id", tasks.update);
    router.put("reassignTask/:id", tasks.reassign);

    // Delete a Tutorial with id
    router.delete("deleteTask/:id", tasks.delete);
  
    app.use('/api/tasks', router);
  };