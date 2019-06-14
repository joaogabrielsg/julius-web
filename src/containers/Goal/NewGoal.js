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
      await onCreateNewGoal(title, date, value);
      history.push('/dashboard');
    } catch (error) {}
  };

  render() {
    const { classes } = this.props;
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
                  label="Data de inicio do objetivo"
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
  onCreateNewGoal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCreateNewGoal: (finishDate, title, totalValue) =>
    dispatch(createNewGoal(finishDate, title, totalValue)),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(NewGoal))
);
