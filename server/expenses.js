// /backend/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
// Mongoose schema for an expense document used for tracking the expenses
const expensesSchema = new Schema({
  userID: { type: Number, index: true },
  expenses: Array
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Expenses", expensesSchema, "expensesDatabase");
