import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';

class ControlPanel extends Component {
  render() {
    return(
      <Aux>
        <p>Graph</p>
        <p>Achat</p>
        <p>Info</p>
        <p>+ / -</p>
      </Aux>
    )
  }
}

export default ControlPanel;