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
const thisYear = new Date().getFullYear();

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
    <div className="expenses">
      <div className="expense_list">
        <h2 className="month">{months[thisMonth]}</h2>
        {expensesList.map((a, i) => {
          const expenseMonth = new Date(a.expenseDate).getMonth();

          if (expenseMonth === thisMonth) {
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
        <Summary expensesList={expensesList} categoryList={categoryList} />
      </div>
    </div>
  );
};

export default Expenses;
