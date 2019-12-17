import React, { useState } from "react";
import "./singleExpense.css";

import getDate from "./HelperFunctions/getDate";
import getExpenseCategory from "./HelperFunctions/getExpenseCategory";
import Axios from "axios";

const SingleExpense = ({
  expense,
  categoryList,
  handleDeleteExpense,
  userID,
  updateApp,
  setUpdateApp
}) => {
  const expenseCategoryColor = getExpenseCategory(expense, categoryList);
  const [editExpense, setEditExpense] = useState(false);
  const [expenseDate, setExpenseDate] = useState(expense.expenseDate);
  const [expenseCategory, setExpenseCategory] = useState(expense.category);
  const [expenseValue, setExpenseValue] = useState(expense.expenseValue);
  const [expenseComment, setExpenseComment] = useState(expense.expenseComment);

  const handleEditExpense = () => {
    Axios.post("http://localhost:3000/api/expenses/editExpense", {
      userID,
      expense,
      editedExpense: {
        category: expenseCategory,
        expenseComment,
        expenseDate,
        expenseValue
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  if (!editExpense) {
    return (
      <div className="single_expense__container">
        <div className="single_expense_date">
          <h6>{getDate(expense.expenseDate)}</h6>
        </div>
        <div
          className="single_expense_category"
          style={{ color: expenseCategoryColor }}
        >
          <h6>{expense.category}</h6>
        </div>
        <div className="single_expense_value">
          <h6>{expense.expenseValue}</h6>
        </div>
        <div className="single_expense_comment">
          <h6>{expense.expenseComment}</h6>
        </div>
        <div className="single_expense_control__container">
          <button
            className="expense_manager"
            onClick={() => setEditExpense(true)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="expense_manager"
            onClick={() => handleDeleteExpense(expense)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="add_expense__container">
        <form
          className="add_expense_form"
          onSubmit={e => {
            e.preventDefault();
            handleEditExpense();
            setEditExpense(false);
            setTimeout(() => setUpdateApp(!updateApp), 500);
          }}
        >
          <input
            type="date"
            value={expenseDate}
            onChange={e => {
              setExpenseDate(e.target.value);
            }}
            className="add_expense_date_input"
            required
          ></input>
          <select
            className="add_expense_dropdown_menu"
            onChange={e => {
              setExpenseCategory(e.target.value);
            }}
            value={expenseCategory}
          >
            {categoryList.map((category, i) => {
              return (
                <option
                  className="add_expense_dropdown_value"
                  value={category.categoryName}
                  key={i}
                >
                  {category.categoryName}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            value={expenseValue}
            onChange={e => {
              setExpenseValue(e.target.value);
            }}
            className="add_expense_value_input"
            required
          ></input>
          <input
            type="text"
            value={expenseComment}
            onChange={e => {
              setExpenseComment(e.target.value);
            }}
            className="add_expense_comment_input"
            required
          ></input>
          <div className="button__container">
            <button
              className="expense_manager confirm_new"
              onClick={e => {
                e.preventDefault();
                handleEditExpense();
                setEditExpense(false);
                setTimeout(() => setUpdateApp(!updateApp), 500);
              }}
            >
              <i className="fas fa-check"></i>
            </button>
            <button
              className="expense_manager add_new"
              onClick={e => {
                e.preventDefault();
                setEditExpense(false);
              }}
            >
              <i className="far fa-window-close"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default SingleExpense;
