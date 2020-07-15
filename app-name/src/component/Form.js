import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup.string().email().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
  type: yup.string().required("Type is a required field"),
  terms: yup.boolean().oneOf([true], "Please agree to terms of use"),
});

// name, email, password, terms of service (checkbox), submit button
const Form = (props) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
    terms: false,
  });

  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
    terms: "",
  });

  const [users, setUsers] = useState([]);

  // onSubmit function:
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => {
        props.addUsers(response.data);
        console.log(response);
      })

      .catch((error) => console.log(error));
  };

  const validate = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((error) => {
        console.log(error.errors);
        setErrorState({
          ...errorState,
          [e.target.name]: error.errors[0],
        });
      });
  };

  // onChange function:
  const inputChange = (e) => {
    e.persist();
    console.log("input changed!", e.target.name, e.target.checked);
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          id="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errorState.email.length > 0 ? (
          <p className="error">{errorState.email}</p>
        ) : null}
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          value={formState.password}
          onChange={inputChange}
        />
        <label htmlFor="type">
          What type of user are you?
          <select
            value={formState.type}
            name="type"
            id="type"
            onChange={inputChange}
          >
            <option value="This">This</option>
            <option value="That">That</option>
            <option value="The">The Other</option>
          </select>
        </label>
        <label htmlFor="terms">
          Terms and Conditions
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formState.terms}
            onChange={inputChange}
          />
        </label>
      </label>
      <button>Submit</button>
    </form>
  );
};

export default Form;
