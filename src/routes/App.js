import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Login from '../containers/Login/Login';

const App = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default App;
