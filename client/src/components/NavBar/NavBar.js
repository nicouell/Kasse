import React, { Component } from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Action/authAction";
import { clearCurrentWallet } from "../../Action/walletActions";

import classe from "./NavBar.css";

class NavBar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentWallet();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className={classe.Ul}>
        <li className={classe.Liste}>
          <Link className={classe.Link} to="/wallet">
            Home
          </Link>
        </li>
        <li className={classe.ListeLogout}>
          <a
            className={classe.Link}
            href=""
            onClick={this.onLogoutClick.bind(this)}
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const logoutLinks = (
      <ul className={classe.Ul}>
        <li className={classe.Liste}>
          <Link className={classe.Link} to="/">
            Home
          </Link>
        </li>
        <li className={classe.ListeLogout}>
          <Link className={classe.Link} to="/login">
            Login
          </Link>
        </li>
        <li className={classe.ListeLogout}>
          <Link className={classe.Link} to="/register">
            Sign Up
          </Link>
        </li>
      </ul>
    );

    return (
      <div className={classe.Navbar}>
        {isAuthenticated ? authLinks : logoutLinks}
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentWallet }
)(NavBar);
