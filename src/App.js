import React from 'react';
import './App.css';
import withRoot from './hoc/withRoot';

import { Switch, Route } from 'react-router-dom';

import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

import AppRoutes from './routes/App';

function App() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/cadastro" exact component={Register} />
      <AppRoutes />
    </Switch>
  );
}

export default withRoot(App);
