import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Header = ({ onLogout, onDash, onFinances, classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="primary" className={classes.grow}>
            Julius
          </Typography>
          <IconButton className={classes.menuButton} color="primary" aria-label="Menu">
            <Button color="primary" className={classes.button} onClick={onFinances}>
              FINANCEIRO
            </Button>
          </IconButton>
          <IconButton className={classes.menuButton} color="primary" aria-label="Menu">
            <Button color="primary" className={classes.button} onClick={onDash}>
              INICIO
            </Button>
          </IconButton>
          <Button color="primary" variant="contained" onClick={onLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
