require("dotenv").config();
const sequelize = require('sequelize');
const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// database connection
const db = require("./models");
db.sequelize.sync(
    //In development mode use this line if needed to drop and re-sync db:
    { force: true }
)
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

require("./routes/tasks")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// // routes
// app.use('/', indexRouter)
// app.use('/authors', authorRouter)
// app.use('/books', bookRouter);
// app.use('/users', UsersController);
// app.use('/tasks', TasksController);

