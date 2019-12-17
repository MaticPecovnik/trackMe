import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Login from "./login";
import Header from "./header";
import Expenses from "./expenses";
import Categories from "./categories";

const App = () => {
  const [updateApp, setUpdateApp] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState("guest");
  const [userID, setUserID] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [inFocus, setInFocus] = useState({
    expenses: true,
    categories: false,
    previous: false
  });

  /* On load get the categories of a user from the database */
  useEffect(() => {
    Axios.get("http://localhost:3000/api/categories/getUserCategories", {
      params: {
        userID
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
        userID
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
    // eslint-disable-next
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateApp]);

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
      </div>
    );
  } else {
    return (
      <Login
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
        setUserID={setUserID}
      />
    );
  }
};

export default App;
