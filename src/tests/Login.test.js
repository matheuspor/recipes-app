import { render, screen } from '@testing-library/react';
import React from 'react';
import Login from '../pages/Login';

test('renders login page', () => {
  render(<Login />);
  const linkElement = screen.getByRole('heading', { name: /login/i });
  expect(linkElement).toBeInTheDocument();
});
