import React, { useState } from "react";
import Axios from "axios";
import "./login.css";

import LoginAbout from "./loginAbout";

const Login = ({
  setUsername,
  setLoggedIn,
  setUserID,
  setStartScreenFocus
}) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [userMessage, setUserMessage] = useState("Welcome to the Track Me!");

  const checkAuthentication = () => {
    Axios.get("http://localhost:3000/api/user/getData", {
      params: {
        username: usernameInput,
        password: passwordInput
      }
    })
      .then(response => {
        if (response.data.data.length === 0) {
          setError(true);
          setUserMessage("Incorrect username or password");
        } else if (response.data.data.length > 1) {
          setError(true);
          setUserMessage("Something went wrong");
        } else {
          setUsername(usernameInput);
          setUserID(response.data.data[0].userID);
          setLoggedIn(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChangeUsernameInput = e => {
    setUsernameInput(e.target.value);
  };
  const handleChangePasswordInput = e => {
    setPasswordInput(e.target.value);
  };

  return (
    <div className="login_main__container">
      <div className="login_about__container">
        <LoginAbout />
      </div>
      <div className="login_form__container">
        <form
          className="login_form"
          onSubmit={e => {
            e.preventDefault();
            checkAuthentication();
          }}
        >
          <label htmlFor="username" className="login_label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="login_input"
            placeholder="Your username"
            value={usernameInput}
            onChange={handleChangeUsernameInput}
            onFocus={() =>
              setUserMessage(
                "Provide us with your username. Remember... It is case sensetive."
              )
            }
            onBlur={() => setUserMessage("Welcome to the Track Me!")}
            required
          ></input>
          <label htmlFor="password" className="login_label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="login_input"
            placeholder="Your password"
            value={passwordInput}
            onChange={handleChangePasswordInput}
            onFocus={() =>
              setUserMessage(
                "Provide us with your password. It is also case sensitive."
              )
            }
            onBlur={() => setUserMessage("Welcome to the Track Me!")}
            required
          ></input>
          <button
            className="login_button btn"
            onClick={e => {
              e.preventDefault();
              checkAuthentication();
            }}
          >
            Login
          </button>
          <div className="registration_switch__container">
            Don`t have an account yet. Set it up{" "}
            <button
              className="go_register_button"
              onClick={e => {
                e.preventDefault();
                setStartScreenFocus({
                  login: false,
                  register: true
                });
              }}
            >
              HERE!
            </button>
          </div>
        </form>
      </div>
      <div className="message__container">
        {error ? (
          <div className="message error">{userMessage}</div>
        ) : (
          <div className="message">{userMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
