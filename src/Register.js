import React, { useState } from "react";
import Axios from "axios";
import "./Register.css";

const Register = ({ setStartScreenFocus }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    Axios.post("http://localhost:3000/api/registration/newUser", {
      inputUsername,
      inputEmail,
      inputPassword
    })
      .then(res => {
        if (res.data.success === false) {
          setErrorMessage(res.data.data);
        } else {
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="register__container">
      <div className="register_form__container">
        <form className="register_form">
          <div className="user_input__container">
            <label htmlFor="username" className="register_label">
              <h1>Username</h1>
            </label>
            <input
              type="text"
              name="username"
              className="register_input"
              value={inputUsername}
              onChange={e => {
                setInputUsername(e.target.value);
              }}
              required
            ></input>
          </div>
          <div className="user_input__container">
            <label htmlFor="email" className="register_label">
              <h1>Mail</h1>
            </label>
            <input
              type="email"
              name="email"
              className="register_input"
              value={inputEmail}
              onChange={e => {
                setInputEmail(e.target.value);
              }}
              required
            ></input>
          </div>
          <div className="user_input__container">
            <label htmlFor="password" className="register_label">
              <h1>Password</h1>
            </label>
            <input
              type="password"
              name="password"
              className="register_input"
              value={inputPassword}
              onChange={e => {
                setInputPassword(e.target.value);
              }}
              required
            ></input>{" "}
          </div>
          <button className="register_button" onClick={() => handleRegister()}>
            Register
          </button>
          <div className="registration_error__container">{errorMessage}</div>
          <div className="login_switch__container">
            <button
              className="register_button"
              onClick={e => {
                e.preventDefault();
                setStartScreenFocus({
                  login: true,
                  register: false
                });
              }}
            >
              Already have an account!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
