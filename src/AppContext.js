import React from 'react';

import App from './App';
import { ThemeProvider } from './utils/ThemeContext';

const AppContext = () => {

  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default AppContext;