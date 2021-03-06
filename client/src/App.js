import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Action/authAction";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Landing from "./components/Landing/Landing";
import Layout from "./hoc/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CreatWallet from "./components/CreateWallet/CreatWallet";
import { clearCurrentWallet } from "./Action/walletActions";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentWallet());
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
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/wallet" component={ControlPanel} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-wallet"
                component={CreatWallet}
              />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
