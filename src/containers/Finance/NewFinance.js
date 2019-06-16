import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { createNewFinance } from '../../store/actions/finance';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class NewFinance extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      value: '',
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const id = location.state.id;
    console.log(id);
  }

  handleChange = field => event => {
    this.setState({ [field]: event.target.value });
  };

  onConfirm = async () => {
    const { onCreateNewFinance, location, history } = this.props;
    const { title, value } = this.state;

    const id = location.state.id;
    try {
      await onCreateNewFinance(id, title, value);
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
                  label="Título"
                  value={this.state.title}
                  onChange={this.handleChange('title')}
                  margin="normal"
                />
              </div>
              <div className={classes.inputFields}>
                <TextField
                  className={classes.input}
                  id="standard-name"
                  label="Valor"
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

NewFinance.propTypes = {
  onCreateNewFinance: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCreateNewFinance: (id, title, value) => dispatch(createNewFinance(id, title, value)),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(NewFinance))
);
