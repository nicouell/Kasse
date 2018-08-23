import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { registerUser } from "../../Action/authAction";

import classe from "./Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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

    this.props.registerUser(newUser);
  }

  render() {
    return (
      <div className={classe.Register}>
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
    );
  }
}

export default connect(
  null,
  { registerUser }
)(Register);
