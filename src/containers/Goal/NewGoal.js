import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { createNewGoal } from '../../store/actions/goal';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

class NewGoal extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      date: '',
      value: '',
    };
  }

  handleChange = field => event => {
    this.setState({ [field]: event.target.value });
  };

  onConfirm = async () => {
    const { onCreateNewGoal, history } = this.props;
    const { title, date, value } = this.state;

    try {
      const response = await onCreateNewGoal(date, title, value);
      history.push({
        pathname: '/financas/adicionar',
        state: { id: response.data.id },
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isLoading, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.inputFields}>
                <TextField
                  className={classes.input}
                  id="standard-name"
                  label="Título da meta"
                  value={this.state.title}
                  onChange={this.handleChange('title')}
                  margin="normal"
                />
              </div>
              <div className={classes.inputFields}>
                <TextField
                  className={classes.input}
                  id="standard-name"
                  label="Data de inicio do objetivo (DD/MM/YYYY)"
                  value={this.state.date}
                  onChange={this.handleChange('date')}
                  margin="normal"
                />
              </div>
              <div className={classes.inputFields}>
                <TextField
                  className={classes.input}
                  id="standard-name"
                  label="Valor total da meta"
                  value={this.state.value}
                  onChange={this.handleChange('value')}
                  margin="normal"
                />
              </div>
            </CardContent>
            <CardActions>
              {!isLoading ? (
                <React.Fragment>
                  <div className={classes.buttons}>
                    <Button style={{ color: '#DE5246' }} className={classes.button}>
                      Cancelar
                    </Button>
                  </div>
                  <div className={classes.buttons}>
                    <Button color="secondary" className={classes.button} onClick={this.onConfirm}>
                      Confirmar
                    </Button>
                  </div>
                </React.Fragment>
              ) : (
                <CircularProgress color="secondary" className={classes.progress} />
              )}
            </CardActions>
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
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 500,
    paddingTop: 30,
    paddingBottom: 30,
  },
  inputFields: {
    width: '100%',
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
  pos: {
    marginBottom: 12,
  },
};

NewGoal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onCreateNewGoal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  onCreateNewGoal: (finishDate, title, totalValue) =>
    dispatch(createNewGoal(finishDate, title, totalValue)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(NewGoal))
);
