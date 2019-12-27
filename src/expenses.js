import React from "react";
import "./expenses.css";
import Axios from "axios";
import AddExpense from "./addExpense";
import SingleExpense from "./singleExpense";
import Summary from "./summary";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const thisMonth = new Date().getMonth();
const thisYear = new Date().getUTCFullYear();

const Expenses = ({
  userID,
  categoryList,
  expensesList,
  updateApp,
  setUpdateApp
}) => {
  const handleDeleteExpense = deletedExpense => {
    Axios.delete("http://localhost:3000/api//expenses/delExpense", {
      data: {
        userID,
        deletedExpense
      }
    });
    setTimeout(() => setUpdateApp(!updateApp), 500);
  };

  return (
    <div className="expenses__container">
      <div className="expense_list__container">
        <h1 className="title_expenses">{months[thisMonth]}</h1>
        {expensesList.map((a, i) => {
          const expenseMonth = new Date(a.expenseDate).getMonth();
          const expenseYear = new Date(a.expenseDate).getUTCFullYear();

          if (expenseMonth === thisMonth && expenseYear === thisYear) {
            return (
              <SingleExpense
                expense={a}
                categoryList={categoryList}
                userID={userID}
                handleDeleteExpense={handleDeleteExpense}
                updateApp={updateApp}
                setUpdateApp={setUpdateApp}
                key={i}
              />
            );
          } else {
            return null;
          }
        })}
        {categoryList.length > 0 ? (
          <AddExpense
            userID={userID}
            setUpdateApp={setUpdateApp}
            updateApp={updateApp}
            categoryList={categoryList}
          />
        ) : null}
      </div>
      <div className="summary__container">
        <h1 className="title_expenses">Summary</h1>
        <Summary
          expensesList={expensesList}
          categoryList={categoryList}
          summaryMonth={thisMonth}
          summaryYear={thisYear}
        />
      </div>
    </div>
  );
};

export default Expenses;
