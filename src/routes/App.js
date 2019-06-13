import React from 'react';
import { connect } from 'react-redux';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Header from '../components/Header/Header';
import NewGoal from '../containers/Goal/NewGoal';

import { logout } from '../store/actions/auth';

const App = ({ onLogout, history }) => {
  return (
    <Switch>
      <Route
        path="/"
        render={() => (
          <React.Fragment>
            <Header
              onLogout={() => {
                onLogout().then(() => history.push('/login'));
              }}
            />
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

const mapDispatchToProps = dispatch => ({
  onLogout: (code, password) => dispatch(logout(code, password)),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
