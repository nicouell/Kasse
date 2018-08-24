import React from "react";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import classe from "./Layout.css";

const layout = props => {
  return (
    <div className={classe.Layout}>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default layout;
