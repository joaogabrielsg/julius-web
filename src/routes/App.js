import React from 'react';
import { connect } from 'react-redux';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Header from '../components/Header/Header';
import NewGoal from '../containers/Goal/NewGoal';
import NewFinance from '../containers/Finance/NewFinance';
import FinancesList from '../containers/Finance/FinancesList';
import Dashboard from '../containers/Dashboard/Dashboard';

import { logout, checkAuth } from '../store/actions/auth';

class App extends React.Component {
  componentWillMount() {
    const { onCheckAuth } = this.props;
    onCheckAuth();
  }

  render() {
    const { onLogout, history } = this.props;
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
                onFinances={() => history.push('/financas/listar')}
                onDash={() => history.push('/dashboard')}
              />
              <Switch>
                <Route path="/metas/adicionar" exact component={NewGoal} />
                <Route path="/financas/adicionar" exact component={NewFinance} />
                <Route path="/financas/listar" exact component={FinancesList} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Redirect to="/login" />
              </Switch>
            </React.Fragment>
          )}
        />
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: (code, password) => dispatch(logout(code, password)),
  onCheckAuth: () => dispatch(checkAuth()),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
