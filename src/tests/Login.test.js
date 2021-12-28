import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';

const datatestIds = {
  emailInput: 'email-input',
  passwordInput: 'password-input',
  loginBtn: 'login-submit-btn',
};
const mocks = {
  email: 'test@email.com',
  password: '123456',
};

test('Renders login page', () => {
  renderWithRouter(<Login />);

  const emailInput = screen.getByTestId(datatestIds.emailInput);
  const passwordInput = screen.getByTestId(datatestIds.passwordInput);
  const loginBtn = screen.getByTestId(datatestIds.loginBtn);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginBtn).toBeInTheDocument();
});
test('Test enter button', () => {
  renderWithRouter(<Login />);

  const emailInput = screen.getByTestId(datatestIds.emailInput);
  const passwordInput = screen.getByTestId(datatestIds.passwordInput);
  const loginBtn = screen.getByTestId(datatestIds.loginBtn);

  expect(loginBtn).toBeDisabled();
  userEvent.type(emailInput, mocks.email);
  userEvent.type(passwordInput, mocks.password);

  expect(loginBtn).toBeEnabled();
});
test('Check if local storage set tokens', async () => {
  renderWithRouter(<Login />);

  await waitFor(() => {
    expect(localStorage.getItem('mealsToken')).toBeTruthy();
    expect(localStorage.getItem('cocktailsToken')).toBeTruthy();
  });
});
test('Check if button sets local storage and redirects page', async () => {
  renderWithRouter(
    <Login />,
  );
  const emailInput = screen.getByTestId(datatestIds.emailInput);
  const passwordInput = screen.getByTestId(datatestIds.passwordInput);
  const loginBtn = screen.getByTestId(datatestIds.loginBtn);

  userEvent.type(emailInput, mocks.email);
  userEvent.type(passwordInput, mocks.password);
  userEvent.click(loginBtn);

  const email = JSON.parse(localStorage.getItem('user'));
  expect(email).toStrictEqual({ email: mocks.email });
  expect(window.location.pathname).toStrictEqual('/recipes-app/foods');
});
