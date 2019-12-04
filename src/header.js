import React, { useState, useEffect } from "react";
import "./header.css";

const Header = ({ username, setLoggedIn }) => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setIsTop(window.scrollY < 200);
    });
  });

  return (
    <div
      className="header__container"
      style={
        isTop
          ? { backgroundColor: "#0f2043", color: "white" }
          : { backgroundColor: "white", color: "#0f2043" }
      }
    >
      <div className="username__container">
        <h6>Welcome back, {username}!</h6>
      </div>
      <div className="control__container">
        <button
          className="header_button btn"
          style={
            isTop
              ? { backgroundColor: "#0f2043", color: "white" }
              : { backgroundColor: "white", color: "#0f2043" }
          }
        >
          <h6>Settings</h6>
        </button>
        <button
          className="header_button btn"
          style={
            isTop
              ? { backgroundColor: "#0f2043", color: "white" }
              : { backgroundColor: "white", color: "#0f2043" }
          }
        >
          <h6>About Us</h6>
        </button>
        <button
          className="header_button btn"
          style={
            isTop
              ? { backgroundColor: "#0f2043", color: "white" }
              : { backgroundColor: "white", color: "#0f2043" }
          }
          onClick={() => setLoggedIn(false)}
        >
          <h6>Log Out</h6>
        </button>
      </div>
    </div>
  );
};

export default Header;
