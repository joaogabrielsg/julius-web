import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { getFinances, deleteFinances } from '../../store/actions/finance';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    const { financesList, onDeleteFinances, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          <GridList cellHeight={70} className={classes.gridList} cols={1}>
            {financesList.map(finance => (
              <Card key={finance.id} className={classes.card}>
                <CardContent className={classes.cardContent}>
                  {/* <div className={classes.row}> */}
                  <Typography variant="h5" gutterBottom>
                    {finance.title}
                  </Typography>
                  <Typography style={{ color: '#666666' }} variant="h6" gutterBottom>
                    {`R$ ${finance.value},00`}
                  </Typography>
                  <div>
                    <Button
                      style={{ color: '#DE5246' }}
                      className={classes.button}
                      onClick={() => onDeleteFinances(finance.goalId, finance.id)}
                    >
                      Apagar
                    </Button>
                    <Button color="secondary" className={classes.button} onClick={this.onConfirm}>
                      Editar
                    </Button>
                    {/* </div> */}
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
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  onDeleteFinances: (goalId, financeId) => dispatch(deleteFinances(goalId, financeId)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(FinancesList))
);
