import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { auth } from '../../store/actions/auth';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = field => event => {
    this.setState({ [field]: event.target.value });
  };

  onConfirm = async () => {
    const { onAuth, history } = this.props;
    const { email, password } = this.state;

    try {
      await onAuth(email, password);
      history.push('/dashboard');
    } catch (error) {}
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography align="center" variant="h3" color="inherit" className={classes.title}>
              JULIUS
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.inputFields}>
                <TextField
                  className={classes.input}
                  id="standard-name"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                />
              </div>
              <div className={classes.inputFields}>
                <TextField
                  className={classes.input}
                  id="standard-name"
                  label="Senha"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  margin="normal"
                />
              </div>
            </CardContent>
            <CardActions>
              <div className={classes.buttons}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.onConfirm}
                >
                  Entrar
                </Button>
              </div>
            </CardActions>
            <CardActions>
              <div className={classes.buttons}>
                <Button color="primary" className={classes.button}>
                  Cadastrar
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

Login.propTypes = {
  onAuth: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onAuth: (code, password) => dispatch(auth(code, password)),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(Login))
);
