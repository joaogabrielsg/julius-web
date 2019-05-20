import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Login from '../containers/Login/Login';
import Register from '../containers/Register/Register';

const App = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/cadastro" exact component={Register} />
    </Switch>
  );
};

export default App;
