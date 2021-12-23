import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

const datatestIds = {
  emailInput: 'email-input',
  passwordInput: 'password-input',
  loginBtn: 'login-submit-btn',
};

test('Renders login page', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  const loginHeading = screen.getByRole('heading', { name: /login/i });
  const emailInput = screen.getByTestId(datatestIds.emailInput);
  const passwordInput = screen.getByTestId(datatestIds.passwordInput);
  const loginBtn = screen.getByTestId(datatestIds.loginBtn);

  expect(loginHeading).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginBtn).toBeInTheDocument();
});
test('Test enter button', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const emailInput = screen.getByTestId(datatestIds.emailInput);
  const passwordInput = screen.getByTestId(datatestIds.passwordInput);
  const loginBtn = screen.getByTestId(datatestIds.loginBtn);

  expect(loginBtn).toBeDisabled();
  userEvent.type(emailInput, 'test@email.com');
  userEvent.type(passwordInput, '123456');

  expect(loginBtn).toBeEnabled();
});
test('Check if local storage set tokens', async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  await waitFor(() => {
    expect(localStorage.getItem('mealsToken')).toBeTruthy();
    expect(localStorage.getItem('cocktailsToken')).toBeTruthy();
  });
});
test('Check if local storage set email and redirects', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const emailInput = screen.getByTestId(datatestIds.emailInput);
  const passwordInput = screen.getByTestId(datatestIds.passwordInput);
  const loginBtn = screen.getByTestId(datatestIds.loginBtn);
  const mockEmail = 'test@email.com';

  userEvent.type(emailInput, mockEmail);
  userEvent.type(passwordInput, '123456');
  userEvent.click(loginBtn);

  const email = JSON.parse(localStorage.getItem('user'));
  expect(email).toStrictEqual({ email: mockEmail });
});
