import React from "react";

import classe from "./Login.css";

const login = () => {
  return (
    <div className={classe.Login}>
      <form>
        Email: <input type="text" name="email" placeholder="Email..." />
        <br />
        Password:{" "}
        <input type="text" name="password1" placeholder="Password..." />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default login;
