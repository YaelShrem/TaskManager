module.exports = app => {
    const users = require("../controllers/users.js");
  
    let router = require("express").Router();
  
    // Get only users that have tasks in "in progress" status
    router.get("/in-progress", users.getUsersWithInProgressTasks);

    // Create a new user
    router.post("/", users.create);
  
    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve a single user with id
    router.get("/:id", users.findOne);
  
    // Update a user with id
    router.put("/:id", users.update);
  
    // Delete a user with id
    router.delete("/:id", users.delete);
  
    // Delete all users
    router.delete("/", users.deleteAll);

    // Get all tasks related to a user by user id
    router.get("/:id/tasks", users.getTasksByUserId);
  
    // Get the number of tasks we have in each status by user id
    router.get("/:id/task-status-counts", users.getTaskStatusCountsByUserId);

    app.use('/api/users', router);
};