import React from 'react';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Header from '../components/Header/Header';
import NewGoal from '../containers/Goal/NewGoal';

const App = () => {
  return (
    <Switch>
      <Route
        path="/"
        render={() => (
          <React.Fragment>
            <Header />
            <Switch>
              <Route path="/metas/adicionar" exact component={NewGoal} />
              <Redirect to="/login" />
            </Switch>
          </React.Fragment>
        )}
      />
    </Switch>
  );
};

export default withRouter(App);
