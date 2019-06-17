import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { getFinances } from '../../store/actions/finance';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';

class FinancesList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { onGetFinances } = this.props;
    onGetFinances();
  }

  render() {
    const { financesList, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          <GridList cellHeight={90} className={classes.gridList} cols={1}>
            {financesList.map(finance => (
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div className={classes.row}>
                    <Typography variant="h4" gutterBottom>
                      {finance.title}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      {`R$ ${finance.value},00`}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))}
          </GridList>
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
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  card: {
    width: '50%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridList: {
    flexDirection: 'column',
    width: '70%',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

FinancesList.propTypes = {
  onGetFinances: PropTypes.func.isRequired,
  financesList: PropTypes.shape.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  financesList: state.finance.financesList,
});

const mapDispatchToProps = dispatch => ({
  onGetFinances: () => dispatch(getFinances()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(FinancesList))
);
