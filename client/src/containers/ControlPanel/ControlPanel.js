import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentWallet } from "../../Action/walletActions";

import Aux from "../../hoc/Aux/Aux";
//import Graph from "../../components/Graph/Graph";

import classe from "./ContorlPanel.css";

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
      if (Object.keys(wallets).length > 0) {
        panelContent = (
          <div>
            <p>Graph</p>
            <p>Info</p>
            <p>Achat</p>
            <p>+/-</p>
          </div>
        );
      } else {
        panelContent = (
          <div>
            <h4>Bienvenue {user.name}</h4>
            <p>Il est maintenant temp de créer votre premier compte</p>
            <Link className={classe.Button} to="/create-wallet">
              Créer un Compte
            </Link>
          </div>
        );
      }
    }

    return <Aux>{panelContent}</Aux>;
  }
}

ControlPanel.propTypes = {
  getCurrentWallet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  wallet: state.wallet,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentWallet }
)(ControlPanel);
