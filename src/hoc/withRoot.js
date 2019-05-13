import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '',
      main: '#993399',
      dark: '',
      contrastText: '#fff',
    },
    error: {
      main: '#e73737',
    },
  },
  typography: {
    fontFamily: '"Montserrat","Open Sans", "Helvetica", "Arial", sans-serif',
    fontWeightStrong: 600,
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
