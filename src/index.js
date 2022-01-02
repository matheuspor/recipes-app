import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import theme from './theme';
import client from './services/reactQueryClient';
import Provider from './context/provider';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={ theme }>
      <QueryClientProvider client={ client }>
        <Provider>
          <CssBaseline />
          <App />
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
