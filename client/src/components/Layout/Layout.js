import React from "react";

import Landing from "./Landing/Landing";

const layout = props => {
  return (
    <main>
      <Landing />
      {props.children}
    </main>
  );
};

export default layout;
