const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

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

app.get("/", (req, res) => {
  
});

app.get("/login", (req, res) => {
  res.send("login");
});

app.get("/register", (req, res) => {
  res.send("register");
});
//Set the port that you want the server to run on
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

