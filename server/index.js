const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const path = require("path");
const app = express();


// var corsOptions = {
//   origin: "http://localhost:3000"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

db.mongoose
  .connect("mongodb+srv://zachdev:Q1jxa12qrIARFgqJ@bridge.u0zja.mongodb.net/bridge?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// a test route to make sure we can reach the backend
//this would normally go in a routes file
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bridge. The trillion dollar company." });
});

//Set the port that you want the server to run on
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

