import React from "react";

import Footer from "../../components/Footer/Footer";
import classe from "./Layout.css";

const layout = props => {
  return (
    <div className={classe.Layout}>
      {props.children}
      <Footer />
    </div>
  );
};

export default layout;
