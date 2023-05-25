module.exports = app => {
    const tasks = require("../controllers/tasks.js");
  
    let router = require("express").Router();
  
    // Create a new Task
    router.post("/", tasks.create);
  
    // Retrieve all Tasks
    router.get("/", tasks.findAll);
  
    // Get the number of total tasks we have in each status
    router.get("/task-status-counts", tasks.getTaskStatusCounts);

    // Retrieve a single Task with id
    router.get("/:id", tasks.findOne);
  
    // Update a Task with id
    router.put("/:id", tasks.update);
  
    // Delete a Task with id
    router.delete("/:id", tasks.delete);
  
    // Delete all Tasks
    router.delete("/", tasks.deleteAll);
  
    app.use('/api/tasks', router);
  };