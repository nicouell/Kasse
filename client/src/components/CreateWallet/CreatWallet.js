import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createWallet } from "../../Action/walletActions";

import classe from "./CreatWallet.css";

class CreateWallet extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      solde: 0
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const walletData = {
      name: this.state.name,
      solde: this.state.solde
    };

    this.props.createWallet(walletData, this.props.history);
  }

  render() {
    return (
      <div className={classe.CreatWallet}>
        <div>
          <h1 className={classe.Title}>Créer un nouveau compte</h1>
        </div>
        <div className={classe.Form}>
          <form onSubmit={this.onSubmit}>
            Nom:{" "}
            <input
              type="text"
              name="name"
              placeholder="Nom..."
              value={this.state.email}
              onChange={this.onChange}
            />
            <br />
            Solde:{" "}
            <input
              type="text"
              name="solde"
              placeholder="1800..."
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <input type="submit" value="OK" />
          </form>
        </div>
      </div>
    );
  }
}

CreateWallet.propTypes = {
  wallet: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  wallet: state.wallet,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createWallet }
)(withRouter(CreateWallet));
