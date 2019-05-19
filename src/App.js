import React from 'react';
import './App.css';
import withRoot from './hoc/withRoot';

import AppRoutes from './routes/App';

function App() {
  return <AppRoutes />;
}

export default withRoot(App);
