import React, { useEffect, useState } from "react";
import summarizeExpenses from "./HelperFunctions/summarizeExpenses";
import ColumnGraph from "./columnGraph";
import "./summary.css";

const Summary = ({ expensesList, categoryList, summaryMonth, summaryYear }) => {
  const [summarizedExpenses, setSummarizedExpenses] = useState({
    expense: [],
    income: []
  });

  useEffect(() => {
    setSummarizedExpenses(
      summarizeExpenses({
        expenses: expensesList,
        categories: categoryList,
        timeframe: {
          year: summaryYear,
          month: summaryMonth
        }
      })
    );
  }, [categoryList, expensesList, summaryMonth, summaryYear]);
  return (
    <React.Fragment>
      <div className="income__container">
        <h3>Income sources</h3>
        {summarizedExpenses.income.length > 0 ? (
          <ColumnGraph
            list={summarizedExpenses.income}
            categoryList={categoryList}
          />
        ) : null}
      </div>
      <div className="expense__container">
        <h3>Expenses</h3>
        {summarizedExpenses.expense.length > 0 ? (
          <ColumnGraph
            list={summarizedExpenses.expense}
            categoryList={categoryList}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default Summary;
