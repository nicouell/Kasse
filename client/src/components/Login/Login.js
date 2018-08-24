import React, { Component } from "react";
import { connect } from "react-redux";
import { logUser } from "../../Action/authAction";
import PropTypes from "prop-types";

import classe from "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/wallet");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const logUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.logUser(logUser);
  }

  render() {
    return (
      <div className={classe.Login}>
        <div>
          <h1 className={classe.Title}>Login</h1>
        </div>
        <div className={classe.Form}>
          <form onSubmit={this.onSubmit}>
            Email:{" "}
            <input
              type="text"
              name="email"
              placeholder="Email..."
              value={this.state.email}
              onChange={this.onChange}
            />
            <br />
            Password:{" "}
            <input
              type="password"
              name="password"
              placeholder="Password..."
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  logUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logUser }
)(Login);
