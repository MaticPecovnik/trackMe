import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Login from "./login";
import Register from "./Register";
import Header from "./header";
import Expenses from "./expenses";
import Categories from "./categories";
import ExpenseHistory from "./ExpenseHistory";

const App = () => {
  const [startScreenFocus, setStartScreenFocus] = useState({
    login: false,
    register: true
  });
  const [updateApp, setUpdateApp] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [inFocus, setInFocus] = useState({
    expenses: true,
    categories: false,
    previous: false
  });

  /* On load get the categories of a user from the database */
  useEffect(() => {
    if (userID !== null) {
      Axios.get("http://localhost:3000/api/categories/getUserCategories", {
        params: {
          userID: userID
        }
      })
        .then(response => {
          setCategoryList(response.data.data[0].categories);
        })
        .catch(err => {
          console.log(err);
        });

      Axios.get("http://localhost:3000/api/expenses/getUserExpenses", {
        params: {
          userID: userID
        }
      })
        .then(response => {
          const sortedExpenses = response.data.data[0].expenses.sort((a, b) => {
            return new Date(a.expenseDate) - new Date(b.expenseDate);
          });
          setExpensesList(sortedExpenses);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [updateApp, userID]);

  if (loggedIn) {
    return (
      <div className="app__container">
        <Header
          username={username}
          setLoggedIn={setLoggedIn}
          inFocus={inFocus}
          setInFocus={setInFocus}
        />
        {inFocus.expenses ? (
          <Expenses
            userID={userID}
            categoryList={categoryList}
            setExpensesList={setExpensesList}
            expensesList={expensesList}
            updateApp={updateApp}
            setUpdateApp={setUpdateApp}
          />
        ) : null}
        {inFocus.categories ? (
          <Categories
            userID={userID}
            categoryList={categoryList}
            updateApp={updateApp}
            setUpdateApp={setUpdateApp}
          />
        ) : null}
        {inFocus.previous ? (
          <ExpenseHistory
            userID={userID}
            categoryList={categoryList}
            expensesList={expensesList}
          />
        ) : null}
      </div>
    );
  } else {
    return startScreenFocus.login ? (
      <Login
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
        setUserID={setUserID}
        setStartScreenFocus={setStartScreenFocus}
      />
    ) : (
      <Register
        setStartScreenFocus={setStartScreenFocus}
        setUserID={setUserID}
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
      />
    );
  }
};

export default App;
