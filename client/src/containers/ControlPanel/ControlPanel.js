import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentWallet } from "../../Action/walletActions";

import Aux from "../../hoc/Aux/Aux";
//import Graph from "../../components/Graph/Graph";

class ControlPanel extends Component {
  componentDidMount() {
    this.props.getCurrentWallet();
  }

  render() {
    const { user } = this.props.auth;
    const { wallets, loading } = this.props.wallet;

    let panelContent;

    if (wallets === null || loading) {
      panelContent = <h4>Loading...</h4>;
    } else {
      panelContent = (
        <div>
          <p>Graph</p>
          <p>Info</p>
          <p>Achat</p>
          <p>+/-</p>
        </div>
      );
    }

    return <Aux>{panelContent}</Aux>;
  }
}

ControlPanel.propTypes = {
  getCurrentWallet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  wallets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  wallet: state.wallet,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentWallet }
)(ControlPanel);
