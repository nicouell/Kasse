import React from "react";
import { Link } from "react-router-dom";

import classe from "./Landing.css";

const landing = props => {
  return (
    <div className={classe.Landing}>
      <h1 className={classe.h1}>
        Si vous êtes kassé vous êtes à la bonne place
      </h1>
      <div className={classe.ButtonBlock}>
        <Link to="/register" className={classe.Button}>
          Register
        </Link>
        <Link to="/login" className={classe.Button}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default landing;
