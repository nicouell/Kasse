import React, { Component } from "react";
import { connect } from "react-redux";
import { logUser } from "../../Action/logAction";

import classe from "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
    );
  }
}

export default connect(
  null,
  { logUser }
)(Login);
