import React from 'react';
import './App.css';
import withRoot from './hoc/withRoot';

import Login from './containers/Login/Login';

function App() {
  return <Login />;
}

export default withRoot(App);
