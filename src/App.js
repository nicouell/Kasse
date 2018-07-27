import React, { Component } from 'react';

import ControlPanel from './containers/ControlPanel/ControlPanel';
import Layout from './components/Layout/Layout'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <ControlPanel />
          <h1>Test github ssh</h1>
        </Layout>
      </div>
    );
  }
}

export default App;
