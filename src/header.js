import React from "react";
import "./header.css";

const Header = ({ username, setLoggedIn, inFocus, setInFocus }) => {
  return (
    <div
      className="header__container"
      style={{ backgroundColor: "#0f2043", color: "white" }}
    >
      <div className="username__container">
        <h5>Welcome back, {username}!</h5>
      </div>
      <div className="control__container">
        <button
          className="header_button btn"
          style={{ backgroundColor: "#0f2043", color: "white" }}
          onClick={() =>
            setInFocus({ expenses: true, categories: false, previous: false })
          }
        >
          <h6>Expenses</h6>
        </button>
        <button
          className="header_button btn"
          style={{ backgroundColor: "#0f2043", color: "white" }}
          onClick={() =>
            setInFocus({ expenses: false, categories: true, previous: false })
          }
        >
          <h6>Categories</h6>
        </button>
        <button
          className="header_button btn"
          style={{ backgroundColor: "#0f2043", color: "white" }}
          onClick={() =>
            setInFocus({ expenses: false, categories: false, previous: true })
          }
        >
          <h6>History</h6>
        </button>
        <button
          className="header_button btn"
          style={{ backgroundColor: "#0f2043", color: "white" }}
          onClick={() => setLoggedIn(false)}
        >
          <h6>Log Out</h6>
        </button>
      </div>
    </div>
  );
};

export default Header;
