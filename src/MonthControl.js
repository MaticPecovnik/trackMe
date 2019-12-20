import React from "react";

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
    <div className="month_control__container">
      <div className="month_control_button__container back_btn">
        <button className="btn month_btn" onClick={handlePreviousMonth}>
          Previous
        </button>
      </div>
      <div className="month_history">
        <h1 className="history_month">
          {months[expensesMonth]}, {expensesYear}
        </h1>
        <div className="month_control_button__container forward_btn">
          {expensesMonth === currentMonth && expensesYear === currentYear ? (
            <button className="btn month_btn" disabled>
              Next
            </button>
          ) : (
            <button className="btn month_btn" onClick={handleNextMonth}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthControl;
