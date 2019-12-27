import React from "react";
import getDate from "./HelperFunctions/getDate";
import getExpenseCategory from "./HelperFunctions/getExpenseCategory";
import "./singleExpenseHistory.css";

const SingleExpenseHistory = ({ expense, categoryList }) => {
  const expenseCategoryColor = getExpenseCategory(expense, categoryList);
  return (
    <div className="single_expense_history__container">
      <div className="single_expense_history_date">
        <h6>{getDate(expense.expenseDate)}</h6>
      </div>
      <div
        className="single_expense_history_category"
        style={{ color: expenseCategoryColor }}
      >
        <h6>{expense.category}</h6>
      </div>
      <div className="single_expense_history_value">
        <h6>{expense.expenseValue}</h6>
      </div>
      <div className="single_expense_history_comment">
        <h6>{expense.expenseComment}</h6>
      </div>
    </div>
  );
};

export default SingleExpenseHistory;
