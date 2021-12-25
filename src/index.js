import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import theme from './theme';

const client = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={ theme }>
      <QueryClientProvider client={ client }>
        <CssBaseline />
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
