import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { getGoals } from '../../store/actions/goal';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { onGetGoals } = this.props;
    onGetGoals();
  }

  render() {
    const { goalsList, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardContent>
              {Object.keys(goalsList).map(goalsMonth => (
                <div>
                  <div>
                    <Typography variant="h2" gutterBottom>
                      {goalsMonth}
                    </Typography>
                  </div>
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
                            value={Math.round(goal.currentValue / goal.totalValue)} //Calcular a porcentagem
                          />
                          <Typography variant="h5" gutterBottom>
                            {`${goal.currentValue}/${goal.totalValue}`}
                          </Typography>
                        </div>
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className={classes.cardInfo}>
            <CardContent />
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
  },
  progressBarRow: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goal: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  pos: {
    marginBottom: 12,
  },
};

Dashboard.propTypes = {
  onGetGoals: PropTypes.func.isRequired,
  goalsList: PropTypes.shape.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  goalsList: state.goal.goalsList,
});

const mapDispatchToProps = dispatch => ({
  onGetGoals: () => dispatch(getGoals()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Dashboard))
);
