// /backend/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
// Mongoose schema for a category document used for categorizing expenses
const categorySchema = new Schema({
  userID: { type: Number, index: true },
  categories: Array
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model(
  "Categories",
  categorySchema,
  "categoriesDatabase"
);
