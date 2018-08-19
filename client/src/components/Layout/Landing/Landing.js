import React from "react";

import classe from "./Landing.css";

const landing = props => {
  return (
    <div className={classe.Landing}>
      <button className={classe.Button}>Register</button>
      <button className={classe.Button}>Login</button>
    </div>
  );
};

export default landing;
