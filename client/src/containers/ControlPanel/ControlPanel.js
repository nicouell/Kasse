import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Graph from "../../components/Graph/Graph";

class ControlPanel extends Component {
  render() {
    return (
      <Aux>
        <Graph data={{}} />
        <p>Achat</p>
        <p>Info</p>
        <p>+ / -</p>
      </Aux>
    );
  }
}

export default ControlPanel;
