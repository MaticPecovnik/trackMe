import React from "react";
import "./loginAbout.css";

const LoginAbout = props => {
  return (
    <React.Fragment>
      <div className="top_text__container about">
        Expense tracking is your first step to financial liberty!
      </div>
      <div className="image__container">
        <img
          src="https://i.imgur.com/XHgkXpZ.png"
          alt="expense tracking cartoon"
          className="about_img"
        ></img>
      </div>
    </React.Fragment>
  );
};

export default LoginAbout;
