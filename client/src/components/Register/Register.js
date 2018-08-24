import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../Action/authAction";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import classe from "./Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/wallet");
    }
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    return (
      <div className={classe.Register}>
        <div>
          <h1 className={classe.Title}>Sing Up</h1>
        </div>
        <div className={classe.Form}>
          <form onSubmit={this.onSubmit}>
            Name:
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name..."
              value={this.state.name}
              onChange={this.onChange}
            />
            <br />
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
            Retype Password:{" "}
            <input
              type="password"
              name="password2"
              placeholder="Password..."
              value={this.state.password2}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
