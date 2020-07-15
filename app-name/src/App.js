import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./component/Form";
import Users from "./component/Users";

function App() {
  const [users, setUsers] = useState([]);

  const addUsers = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <h1>New User Form</h1>
      <Form addUsers={addUsers} />
      <Users users={users} />
    </div>
  );
}

export default App;
