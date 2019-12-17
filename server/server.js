const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./user");
const Categories = require("./categories");
const Expenses = require("./expenses");

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
  useFindAndModify: false,
  useCreateIndex: true
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

/*************************************************************************************************************/
/* API that registers a new user, registers their category collection and registers their expense collection */

router.post("/registration/newUser", (req, res) => {
  let category = new Categories();
  let user = new User();
  let expenses = new Expenses();

  const { userID } = req.body;
  category.userID = userID;
  category.categories = [];

  expenses.userID = userID;
  expenses.expenses = [];

  category.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });

  expenses.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

/*************************************************************************************************************/

// we define the API for interacting with the userInfo database

// GET request that returns the entire userInfo database or returns a queried user

router.get("/user/getData", (req, res) => {
  if (req.query.length === 0) {
    User.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  } else {
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

  user._id = _id;
  user.username = username;
  user.password = password;
  user.email = email;
  user.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//**********************************************************************************************************//

// we define the API for interacting with the categories database

router.get("/categories/getUserCategories", (req, res) => {
  Categories.find(req.query, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// POST request that updates the categories list of a user with userID with a new category

router.post("/categories/addCategory", (req, res) => {
  const { userID, categoryName, categoryColor } = req.body;

  let update = { $addToSet: { categories: { categoryName, categoryColor } } };
  Categories.findOneAndUpdate({ userID }, update).then(res => console.log(res));
});

// POST request that edits an existing category

router.post("/categories/editCategory", (req, res) => {
  console.log("Processing edit request @/editCategory");
  const {
    userID,
    categoryName,
    categoryColor,
    categoryIndex,
    oldCategoryName
  } = req.body;

  /* First we update the categories database with the new name and color */

  Categories.findOneAndUpdate(
    { userID },
    {
      $set: {
        ["categories." + categoryIndex + ".categoryName"]: categoryName,
        ["categories." + categoryIndex + ".categoryColor"]: categoryColor
      }
    }
  ).then(res => {
    console.log("Succesfully edit category!");
  });

  console.log(
    "Old category name to be edited in the Expenses database: ",
    oldCategoryName
  );

  /* Now we find all expenses with the changed category and change the
  expense database accordingly to the new category */

  Expenses.find({ userID }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    else {
      for (let i = 0; i < data[0].expenses.length; i++) {
        if (data[0].expenses[i].category === oldCategoryName) {
          Expenses.findOneAndUpdate(
            { userID },
            {
              $set: {
                ["expenses." + i + ".category"]: categoryName
              }
            }
          ).then(res =>
            console.log("Succesfully edited the category names in the expenses")
          );
        }
      }
    }
  });
});

// DELETE request that deletes a category based on a {categoryName, categoryColor} query

router.delete("/categories/delCategory", (req, res) => {
  console.log("Processing delete request @/delCategory");
  const { userID, categoryName, categoryColor } = req.body;

  /* Delete the category that was sent by the API call */

  let update = { $pull: { categories: { categoryName, categoryColor } } };
  Categories.findOneAndUpdate({ userID }, update).then(res => console.log(res));

  /* All of the expenses that had the category are now changed so as to have no category.
  In this way they can be manually added a new category. Expenses from a previous month 
  do not lose their category */

  const today = new Date();

  Expenses.find({ userID }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    else {
      for (let i = 0; i < data[0].expenses.length; i++) {
        const expDate = new Date(data[0].expenses[i].expenseDate);
        if (
          data[0].expenses[i].category === categoryName &&
          expDate.getMonth() === today.getMonth()
        ) {
          Expenses.findOneAndUpdate(
            { userID },
            {
              $set: {
                ["expenses." + i + ".category"]: ""
              }
            }
          ).then(res => console.log("Succesfully edited expenses"));
        }
      }
    }
  });
});

//**********************************************************************************************************//

// we define the API for interacting with the expenses database

// GET request to retrieve the expense list associated with a user

router.get("/expenses/getUserExpenses", (req, res) => {
  Expenses.find(req.query, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// POST request to append a new expense for a specific user

router.post("/expenses/addExpense", (req, res) => {
  console.log("Processing POST request @/addExpense");
  const { userID, submitedExpense } = req.body;

  let update = { $addToSet: { expenses: submitedExpense } };
  Expenses.findOneAndUpdate({ userID }, update).then(res => console.log(res));
});

// DELETE request that deletes a category based on a {categoryName, categoryColor} query

// !!!! Must still implement what happenses to Expenses if a category name is changed !!!!

router.delete("/expenses/delExpense", (req, res) => {
  console.log("Processing DELETE request @/delExpense");
  const { userID, deletedExpense } = req.body;

  let update = { $pull: { expenses: deletedExpense } };
  Expenses.findOneAndUpdate({ userID }, update).then(res => console.log(res));
});

// POST request that edits an existing category

router.post("/expenses/editExpense", (req, res) => {
  console.log("Processing edit request @/editExpense");
  const { userID, expense, editedExpense } = req.body;

  Expenses.find({ userID }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    else {
      for (let i = 0; i < data[0].expenses.length; i++) {
        if (JSON.stringify(data[0].expenses[i]) === JSON.stringify(expense)) {
          Expenses.findOneAndUpdate(
            { userID },
            {
              $set: {
                ["expenses." + i]: editedExpense
              }
            }
          ).then(res => console.log("Succesfully edited a category"));
        }
      }
    }
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
