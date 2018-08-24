import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentWallet } from "../../Action/walletActions";

import Aux from "../../hoc/Aux/Aux";
//import Graph from "../../components/Graph/Graph";

class ControlPanel extends Component {
  render() {
    const { user } = this.props.auth;
    const { wallets, loading } = this.props.wallets;

    return (
      <Aux>
        <h4>Hello</h4>
      </Aux>
    );
  }
}

ControlPanel.propTypes = {
  getCurrentWallet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  wallets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  wallets: state.wallets,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentWallet }
)(ControlPanel);
