import React from "react";

import Landing from "./Landing/Landing";
import classe from "./Layout.css";

const layout = props => {
  return (
    <div className={classe.Landing}>
      <Landing />
      {props.children}
    </div>
  );
};

export default layout;
