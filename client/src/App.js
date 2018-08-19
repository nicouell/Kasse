import React, { Component } from "react";

import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Layout from "./components/Layout/Layout";

class App extends Component {
  render() {
    return (
      <div height="100%">
        <Layout />
      </div>
    );
  }
}

export default App;
