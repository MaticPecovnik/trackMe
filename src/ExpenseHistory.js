import React, { useState } from "react";
import MonthControl from "./MonthControl";
import SingleExpenseHistory from "./singleExpenseHistory";
import Summary from "./summary";
import YearSummary from "./yearSummary";

import "./ExpenseHistory.css";

const today = new Date();

const ExpenseHistory = ({ userID, categoryList, expensesList }) => {
  const [expensesMonth, setExpensesMonth] = useState(today.getMonth());
  const [expensesYear, setExpensesYear] = useState(today.getUTCFullYear());

  return (
    <div className="history__container">
      <div className="month_control__container">
        <MonthControl
          expensesYear={expensesYear}
          setExpensesYear={setExpensesYear}
          expensesMonth={expensesMonth}
          setExpensesMonth={setExpensesMonth}
        />
      </div>
      <div className="history_list__container">
        <h2 className="title_history_expenses">Expense List</h2>
        {expensesList.map((a, i) => {
          const expenseMonth = new Date(a.expenseDate).getMonth();
          const expenseYear = new Date(a.expenseDate).getUTCFullYear();

          if (expenseMonth === expensesMonth && expenseYear === expensesYear) {
            return (
              <SingleExpenseHistory
                expense={a}
                categoryList={categoryList}
                key={i}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="month_summary__container">
        <h2 className="title_history_expenses">Month Summary</h2>
        <Summary
          expensesList={expensesList}
          categoryList={categoryList}
          summaryMonth={expensesMonth}
          summaryYear={expensesYear}
        />
      </div>
      <div className="year_summary__container">
        <h2 className="title_history_expenses">Year Summary</h2>
        <YearSummary
          expensesList={expensesList}
          categoryList={categoryList}
          summaryMonth={undefined}
          summaryYear={expensesYear}
        />
      </div>
    </div>
  );
};

export default ExpenseHistory;
