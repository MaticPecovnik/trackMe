import React from "react";
import { useState } from "react";
import "./App.css";
import Login from "./login";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  if (loggedIn) {
    return <div className="app_container">{username}</div>;
  } else {
    return <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />;
  }
};

export default App;
