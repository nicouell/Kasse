import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Action/authAction";

import { Provider } from "react-redux";
import store from "./store";

import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Landing from "./components/Landing/Landing";
import Layout from "./hoc/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Route exact path="/" component={Landing} />
            <Route exact path="/wallet" component={ControlPanel} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
