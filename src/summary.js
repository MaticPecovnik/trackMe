import React, { useEffect, useState } from "react";
import summarizeExpenses from "./HelperFunctions/summarizeExpenses";

const thisMonth = new Date().getMonth();
const thisYear = new Date().getFullYear();

const Summary = ({ expensesList, categoryList }) => {
  const [summarizedExpenses, setSummarizedExpenses] = useState({
    expense: [],
    income: []
  });

  useEffect(() => {
    setSummarizedExpenses(
      summarizeExpenses(expensesList, categoryList, {
        year: thisYear,
        month: thisMonth
      })
    );
  }, [categoryList, expensesList]);
  return (
    <React.Fragment>
      <div className="income__container">
        <h4>Income sources</h4>
        {summarizedExpenses.income.map((a, i) => {
          return (
            <div className="summary_category__container">
              <div className="summary_category__name">
                <h6>{a.category}</h6>
              </div>
              <div className="summary_category__value">
                <h6>{a.categorySummary}</h6>
              </div>
            </div>
          );
        })}
      </div>
      <div className="expense__container">
        <h4>Expensess</h4>
        {summarizedExpenses.expense.map((a, i) => {
          return (
            <div className="summary_category__container">
              <div className="summary_category__name">
                <h6>{a.category}</h6>
              </div>
              <div className="summary_category__value">
                <h6>{a.categorySummary}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Summary;
