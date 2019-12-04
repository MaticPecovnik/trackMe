const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./user");

const API_PORT = 3000;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  "mongodb+srv://maticpeco:Mp.1503207@financetracker-a9spt.mongodb.net/expenseTracker?retryWrites=true&w=majority";

// connects our back end code with the database
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// we define the API for interacting with the userInfo database

// GET request that returns the entire userInfo database or returns a queried user

router.get("/user/getData", (req, res) => {
  if (req.query.length === 0) {
    User.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  } else {
    const query = req.query;
    console.log(query);
    User.find(req.query, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
});

// POST request that registers a new user

router.post("/user/putData", (req, res) => {
  let user = new User();

  // get the number of existing users

  const { _id, username, password, email } = req.body;
  console.log(req.body);

  user._id = _id;
  user.username = username;
  user.password = password;
  user.email = email;
  user.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
