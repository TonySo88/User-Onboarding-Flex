import React from "react";

const Users = (props) => {
  return (
    <div>
      {props.users.map((user) => {
        return (
          <div className="user" key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.password}</p>
            <p>{user.type}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
