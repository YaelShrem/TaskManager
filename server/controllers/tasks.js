const db = require("../models");
const downloadImage=require("../utils/imageDownloader");
const Task = db.tasks;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  try {   
    // Get the first word from the title
    const firstWord = req.body.title.split(' ')[0];

    // Generate the image URL
    const imageUrl = `https://robohash.org/${firstWord}`;

    // Generate a unique filename for the image
    const imageName = `${Date.now()}_${firstWord}.png`;

    // Download and save the image
    await downloadImage(imageUrl, imageName);


    // Create a task
    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status ? req.body.status : 0,
      userId: req.body.userId,
      imagePath: `/images/${imageName}`  // Store the relative path to the image
    };
    // Save task in the database
    Task.create(task)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the task.",
        });
      });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Failed to create task.', message: error.message });
  }
};
// Retrieve all task from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Task.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      });
};

// Find a single task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Task.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find task with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving task with id=" + id
        });
      });
};

// Update a task by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Task.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Task was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Task with id=" + id
        });
      });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Task.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Task was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete task with id=${id}. Maybe task was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete task with id=" + id
        });
      });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
    Task.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tasks were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tasks."
        });
      });
};

// Get the number of total tasks we have in each status
exports.getTaskStatusCounts = async (req, res) => {
  try {
    const statusCounts = await db.tasks.count({
      attributes: ['status'],
      group: ['status'],
    });

    // Process the counts and format them as an object
    const countsObject = {};
    statusCounts.forEach((count) => {
      countsObject[count.status] = count.count;
    });

    res.json(countsObject);
  } catch (error) {
    console.error('Error fetching task status counts:', error);
    res.status(500).json({ error: 'Failed to fetch task status counts.' });
  }
};