import React from "react";

import classe from "./Landing.css";

const landing = props => {
  return (
    <div className={classe.Landing}>
      <h1 className={classe.h1}>
        Si vous êtes kassé vous êtes à la bonne place
      </h1>
      <div className={classe.ButtonBlock}>
        <button className={classe.Button}>Register</button>
        <button className={classe.Button}>Login</button>
      </div>
    </div>
  );
};

export default landing;
