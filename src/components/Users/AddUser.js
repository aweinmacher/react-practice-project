import React, { Fragment, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState();

  const usernameChangeHandler = (e) => setUserName(e.target.value);
  const ageChangeHandler = (e) => setAge(e.target.value);
  const errorHandler = () => setError(null);

  const addUserHandler = (e) => {
    e.preventDefault();

    // validate
    if (userName.trim().length === 0 || age.trim().lenght === 0) {
      setError({
        title: "Invalid input",
        message: "Please, enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid age",
        message: "Please, enter a valid age (> 0).",
      });
      return;
    }

    // do main stuff
    props.onAddUser(userName, age);

    // reset form
    setUserName("");
    setAge("");
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={userName}
            onChange={usernameChangeHandler}
          />

          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={ageChangeHandler}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
