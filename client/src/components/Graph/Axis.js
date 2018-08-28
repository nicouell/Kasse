import React, { Component } from "react";
import { select } from "d3";

class Axis extends Component {
  componentDidMount() {
    const node = this.refs[this.props.axis];
    select(node).call(this.props.scale);
  }

  render() {
    return (
      <g
        className="main axis date"
        transform={this.props.transform}
        ref={this.props.axis}
      />
    );
  }
}

export default Axis;
