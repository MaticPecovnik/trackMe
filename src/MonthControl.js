import React from "react";
import "./MonthControl.css";

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

const currentMonth = new Date().getMonth();
const currentYear = new Date().getUTCFullYear();

const MonthControl = ({
  expensesYear,
  setExpensesYear,
  expensesMonth,
  setExpensesMonth
}) => {
  const handleNextMonth = () => {
    if (expensesMonth === 11) {
      setExpensesMonth(0);
      setExpensesYear(expensesYear + 1);
    } else {
      setExpensesMonth(expensesMonth + 1);
    }
  };

  const handlePreviousMonth = () => {
    if (expensesMonth === 0) {
      setExpensesMonth(11);
      setExpensesYear(expensesYear - 1);
    } else {
      setExpensesMonth(expensesMonth - 1);
    }
  };

  return (
    <React.Fragment>
      <div className="month_control_button__container">
        <button className="btn month_btn" onClick={handlePreviousMonth}>
          <h4>Previous</h4>
        </button>
      </div>
      <div className="month_history">
        <h1 className="history_month">
          {months[expensesMonth]}, {expensesYear}
        </h1>
      </div>
      <div className="month_control_button__container">
        {expensesMonth === currentMonth && expensesYear === currentYear ? (
          <button className="btn month_btn" disabled>
            <h4>Next</h4>
          </button>
        ) : (
          <button className="btn month_btn" onClick={handleNextMonth}>
            <h4>Next</h4>
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default MonthControl;
