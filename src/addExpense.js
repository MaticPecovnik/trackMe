import React, { useState } from "react";
import Axios from "axios";
import "./addExpense.css";
import getDate from "./HelperFunctions/getDate";

// NEEDS TO BE REWRITTEN. ITS JUST A PLACEHOLDER

const AddExpense = ({ userID, setUpdateApp, updateApp, categoryList }) => {
  const [addExpense, setaddExpense] = useState(false);
  const [expenseDate, setExpenseDate] = useState(getDate(new Date()));
  const [expenseCategory, setExpenseCategory] = useState(
    categoryList[0].categoryName
  );
  const [expenseValue, setExpenseValue] = useState(0);
  const [expenseComment, setExpenseComment] = useState("");

  const handleAddExpense = () => {
    const submitedExpense = {
      category: expenseCategory,
      expenseComment,
      expenseDate,
      expenseValue
    };
    Axios.post("http://localhost:3000/api/expenses/addExpense", {
      userID,
      submitedExpense
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  if (addExpense) {
    return (
      <div className="add_expense__container">
        <form
          className="add_expense_form"
          onSubmit={e => {
            e.preventDefault();
            handleAddExpense();
            setaddExpense(false);
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
                handleAddExpense();
                setaddExpense(false);
                setTimeout(() => setUpdateApp(!updateApp), 500);
              }}
            >
              <i className="fas fa-check"></i>
            </button>
            <button
              className="expense_manager add_new"
              onClick={e => {
                e.preventDefault();
                setaddExpense(false);
              }}
            >
              <i className="far fa-window-close"></i>
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="add_expense__container">
        <form
          className="add_expense_form"
          onSubmit={e => {
            e.preventDefault();
            setaddExpense(true);
          }}
        >
          <button
            className="expense_manager add_new"
            onClick={e => {
              e.preventDefault();
              setaddExpense(true);
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </form>
      </div>
    );
  }
};

export default AddExpense;
