import React from "react";
import { Link } from "react-router-dom";

import classe from "./NavBar.css";

const navBar = props => {
  return (
    <ul className={classe.Navbar}>
      <li className={classe.Liste}>
        <Link className={classe.Link} to="/wallet">
          Home
        </Link>
      </li>
      <li className={classe.ListeLogout}>
        <Link className={classe.Link} to="/login">
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default navBar;
