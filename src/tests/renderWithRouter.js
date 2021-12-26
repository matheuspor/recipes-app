import { render } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui, { route = '/recipes-app' } = {}) => {
  const client = new QueryClient();
  window.history.replaceState({}, '', route);

  return render(
    <QueryClientProvider client={ client }>
      {ui}
    </QueryClientProvider>,
    { wrapper: BrowserRouter },
  );
};

export default renderWithRouter;
