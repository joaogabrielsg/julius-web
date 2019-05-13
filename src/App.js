import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}

export default App;
