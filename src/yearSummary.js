import React, { useEffect, useState } from "react";
import summarizeExpenses from "./HelperFunctions/summarizeExpenses";
import ColumnGraph from "./columnGraph";
import "./yearSummary.css";

const YearSummary = ({
  expensesList,
  categoryList,
  summaryMonth,
  summaryYear
}) => {
  const [summarizedExpenses, setSummarizedExpenses] = useState({
    expense: [],
    income: []
  });

  useEffect(() => {
    if (expensesList.length > 0) {
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
    }
  }, [categoryList, expensesList, summaryMonth, summaryYear]);

  return (
    <div className="year_summary_history__container">
      <div className="income_year__container">
        <h3>Income sources</h3>
        {summarizedExpenses.income.length > 0 ? (
          <ColumnGraph
            list={summarizedExpenses.income}
            categoryList={categoryList}
          />
        ) : null}
      </div>
      <div className="expense_year__container">
        <h3>Expenses</h3>
        {summarizedExpenses.expense.length > 0 ? (
          <ColumnGraph
            list={summarizedExpenses.expense}
            categoryList={categoryList}
          />
        ) : null}
      </div>
    </div>
  );
};

export default YearSummary;
