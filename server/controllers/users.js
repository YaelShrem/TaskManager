const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a User
    const user = {
      username: req.body.username,
      password: req.body.password,
    };
  
    // Save User in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};

// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find user with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id=" + id
        });
      });
};

// Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Users."
        });
      });
};

// Find tasks that related to a user by user id
exports.getTasksByUserId = (req, res) => {
    const userId = req.params.id;
  
    db.users.findByPk(userId, { include: ['tasks'] })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user.tasks);
      })
      .catch((error) => {
        console.log(">> Error while finding user: ", error);
        return res.status(500).json({ error: 'Failed to fetch tasks for the user' });
      });
  };

// Get the number of tasks we have in each status by user id
exports.getTaskStatusCountsByUserId = async (req, res) => {
  const userId = req.params.id; // Extract the user ID from the request parameters
  try {
    const statusCounts = await db.tasks.count({
      attributes: ['status'],
      where: { userId },
      group: ['status'],
    });
    res.json(statusCounts);
  } catch (error) {
    console.error('Error fetching task status counts for the user:', error);
    res.status(500).json({ error: 'Failed to fetch task status counts for the user.' });
  }
};

// Get only users that have tasks in "in progress" status
exports.getUsersWithInProgressTasks = async (req, res) => {
  try {
    const users = await db.users.findAll({
      include: [
        {
          model: db.tasks,
          as: 'tasks',
          where: { status: 1 },
        },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users with in progress tasks:', error);
    res.status(500).json({ error: 'Failed to fetch users with in progress tasks.' });
  }
};