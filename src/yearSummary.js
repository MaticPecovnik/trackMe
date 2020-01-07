import React, { useEffect, useState } from "react";
import summarizeExpenses from "./HelperFunctions/summarizeExpenses";
import calculateVariation from "./HelperFunctions/calculateVariation";
import ColumnGraph from "./columnGraph";
import "./yearSummary.css";
import VariationGraph from "./variationGraph";

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
  const [variationExpenses, setVariationExpenses] = useState([]);
  const [variationCategories, setVariationCategories] = useState([]);

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

  useEffect(() => {
    if (expensesList.length > 0) {
      setVariationExpenses(calculateVariation(expensesList, summaryYear)[0]);
      setVariationCategories(calculateVariation(expensesList, summaryYear)[1]);
    }
  }, [expensesList, summaryYear]);

  return (
    <div className="year_summary_history__container">
      <div className="transaction_history__container">
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
      <div className="variation_history__container">
        <div className="varing_expense_1__container">
          {// issue if the amount of categories is less than 3
          variationExpenses.length > 0 ? (
            <VariationGraph
              variationList={variationExpenses[0]}
              categoryName={variationCategories[0]}
            />
          ) : null}
        </div>
        <div className="varing_expense_2__container">
          {variationExpenses.length > 0 ? (
            <VariationGraph
              variationList={variationExpenses[1]}
              categoryName={variationCategories[1]}
            />
          ) : null}
        </div>
        <div className="varing_expense_3__container">
          {variationExpenses.length > 0 ? (
            <VariationGraph
              variationList={variationExpenses[2]}
              categoryName={variationCategories[2]}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default YearSummary;
