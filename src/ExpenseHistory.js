import React, { useState, useEffect } from "react";
import summarizeExpenses from "./HelperFunctions/summarizeExpenses";
import MonthControl from "./MonthControl";
import SingleExpenseHistory from "./singleExpenseHistory";
import HistoryMonthSummary from "./HistoryMonthSummary";

const today = new Date();

const ExpenseHistory = ({ userID, categoryList, expensesList }) => {
  const [expensesMonth, setExpensesMonth] = useState(today.getMonth() - 1);
  const [expensesYear, setExpensesYear] = useState(today.getUTCFullYear());
  const [monthSummary, setMonthSummary] = useState([]);
  const [yearSummary, setYearSummary] = useState([]);

  // Calculate the summary for the current month
  useEffect(() => {
    if (expensesList.length > 0) {
      setMonthSummary(
        summarizeExpenses({
          expenses: expensesList,
          categories: [],
          timeframe: { month: expensesMonth, year: expensesYear }
        })
      );
    }
  }, [expensesList, expensesMonth, expensesYear]);

  // Calculate the summary for the current year
  useEffect(() => {
    if (expensesList.length > 0) {
      setYearSummary(
        summarizeExpenses({
          expenses: expensesList,
          categories: [],
          timeframe: { month: undefined, year: expensesYear }
        })
      );
    }
  }, [expensesList, expensesYear]);

  return (
    <div className="history__container">
      <div className="history_list__container">
        <MonthControl
          expensesYear={expensesYear}
          setExpensesYear={setExpensesYear}
          expensesMonth={expensesMonth}
          setExpensesMonth={setExpensesMonth}
        />
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
        <HistoryMonthSummary monthSummary={monthSummary} />
      </div>
      <div className="year_summary__container">
        <HistoryMonthSummary yearSummary={yearSummary} />
      </div>
    </div>
  );
};

export default ExpenseHistory;
