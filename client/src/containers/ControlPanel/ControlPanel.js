import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentWallet, getWallet } from "../../Action/walletActions";

import Aux from "../../hoc/Aux/Aux";
import Graph from "../../components/Graph/Graph";

import classe from "./ContorlPanel.css";

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentWallet();
    this.props.getWallet();
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { user } = this.props.auth;
    const { wallets, loading, wallet } = this.props.wallet;

    let panelContent;

    if (
      wallets === null ||
      wallet === null ||
      loading ||
      Object.keys(wallets).length === 0
    ) {
      panelContent = <h4>Loading...</h4>;
    } else {
      if (Object.keys(wallets).length > 0) {
        panelContent = (
          <div className={classe.Panel}>
            <Graph
              data={wallet.log}
              width={(this.state.width * 90) / 100}
              height={(this.state.height * 50) / 100}
            />
            <p>Info</p>
            <p>Achat</p>
            <p>+/-</p>
            <Link className={classe.Button} to="/create-wallet">
              Créer un Compte
            </Link>
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
  getWallet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  wallet: state.wallet,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentWallet, getWallet }
)(ControlPanel);
