import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../pages/Login';

test('Renders login page', () => {
  render(<Login />);

  const loginHeading = screen.getByRole('heading', { name: /login/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByTestId('password-input');
  const enterButton = screen.getByRole('button', { name: /enter/i });

  expect(loginHeading).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(enterButton).toBeInTheDocument();
});

test('Test enter button', () => {
  render(<Login />);
  const enterButton = screen.getByRole('button', { name: /enter/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByTestId('password-input');
  expect(enterButton).toBeDisabled();

  userEvent.type(emailInput, 'test@email.com');
  userEvent.type(passwordInput, '123456');

  expect(enterButton).toBeEnabled();
});
