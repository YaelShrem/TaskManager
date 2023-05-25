require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database connection
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

//routes
require("./routes/tasks")(app);
require("./routes/users")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});