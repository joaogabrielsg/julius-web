import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { getGoals, getUserProgress } from '../../store/actions/goal';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import GridListTileBar from '@material-ui/core/GridListTileBar';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { onGetGoals, onGetUserProgress } = this.props;
    onGetGoals();
    onGetUserProgress();
  }

  addFinanceOnGoal = id => {
    const { history } = this.props;

    history.push({
      pathname: '/financas/adicionar',
      state: { id: id },
    });
  };

  render() {
    const { goalsList, userProgress, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardContent>
              {Object.keys(goalsList).map(goalsMonth => (
                <div className={{ height: '100%' }}>
                  <div>
                    <Typography variant="h3" gutterBottom>
                      {goalsMonth}
                    </Typography>
                  </div>
                  {goalsList[goalsMonth] ? (
                    <GridList className={classes.gridList} cols={3.5}>
                      {goalsList[goalsMonth].map(goal => (
                        <GridListTile key={goal.id}>
                          <div style={styles.goal}>
                            <Typography variant="h5" gutterBottom>
                              {goal.title}
                            </Typography>
                            <CircularProgress
                              className={classes.progress}
                              variant="static"
                              size={50}
                              thickness={4}
                              value={(goal.currentValue / goal.totalValue) * 100}
                            />
                            <Typography variant="h5" gutterBottom>
                              {`${goal.currentValue}/${goal.totalValue}`}
                            </Typography>
                            {goal.closed ? (
                              <Button color="secondary" />
                            ) : (
                              <Button
                                color="secondary"
                                onClick={() => this.addFinanceOnGoal(goal.id)}
                              >
                                Adicionar Finança
                              </Button>
                            )}
                          </div>
                        </GridListTile>
                      ))}
                    </GridList>
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className={classes.cardInfo}>
            <CardContent>
              <div className={classes.userProgress}>
                <Typography variant="h3" gutterBottom>
                  Progresso
                </Typography>
                <div className={classes.userProgressContent}>
                  <CircularProgress
                    className={classes.progress}
                    variant="static"
                    size={100}
                    thickness={6}
                    value={(userProgress.completeGoals / userProgress.totalGoals) * 100} //Calcular a porcentagem
                  />
                  <Typography variant="h5" gutterBottom>
                    {`${userProgress.completeGoals}/${userProgress.totalGoals}`}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    colorPrimary: '#993399',
    height: '100%',
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Montserrat, sans-serif',
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  card: {
    width: '50%',
    paddingTop: 30,
    paddingBottom: 30,
  },
  cardInfo: {
    width: '30%',
    marginLeft: 20,
    paddingTop: 30,
    paddingBottom: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarRow: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goal: {
    height: '100%',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: '80%',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridList: {
    height: '100%',
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  userProgress: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userProgressContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

Dashboard.propTypes = {
  onGetGoals: PropTypes.func.isRequired,
  goalsList: PropTypes.shape.isRequired,
  onGetUserProgress: PropTypes.func.isRequired,
  userProgress: PropTypes.shape.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  goalsList: state.goal.goalsList,
  userProgress: state.goal.userProgress,
});

const mapDispatchToProps = dispatch => ({
  onGetGoals: () => dispatch(getGoals()),
  onGetUserProgress: () => dispatch(getUserProgress()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Dashboard))
);
