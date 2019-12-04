import React from "react";
import { useState } from "react";
import "./App.css";
import Login from "./login";
import Header from "./header";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState("maticpeco");
  const [userID, setUserID] = useState("");

  if (loggedIn) {
    return (
      <div className="app__container">
        <Header username={username} setLoggedIn={setLoggedIn} />
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
