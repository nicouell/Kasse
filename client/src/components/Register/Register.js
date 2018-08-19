import React from "react";

import classe from "./Register.css";

const register = () => {
  return (
    <div className={classe.Register}>
      <form>
        <label for="name"> Name: </label>
        <input type="text" id="name" name="name" placeholder="Name..." />
        <br />
        Email: <input type="text" name="email" placeholder="Email..." />
        <br />
        Password:{" "}
        <input type="text" name="password1" placeholder="Password..." />
        <br />
        Retype Password:{" "}
        <input type="text" name="password2" placeholder="Password..." />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default register;
