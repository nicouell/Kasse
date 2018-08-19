import React from "react";

import classe from "./Footer.css";

const footer = props => {
  return (
    <footer className={classe.Footer}>
      Copyright &copy; {new Date().getFullYear()} Kasse
    </footer>
  );
};

export default footer;
