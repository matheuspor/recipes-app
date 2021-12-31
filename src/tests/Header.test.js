import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header/Index';

const datatestIds = {
  profileIcon: 'profile-top-btn',
  pageTitle: 'page-title',
  searchIcon: 'search-top-btn',
};

test('Renders Header component', async () => {
  renderWithRouter(<Header />);
  await waitFor(() => {
    const profileIcon = screen.getByTestId(datatestIds.profileIcon);
    const pageTitle = screen.getByTestId(datatestIds.pageTitle);
    const searchIcon = screen.getByTestId(datatestIds.searchIcon);
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
});
test('Tests profileIcon redirection', async () => {
  renderWithRouter(<Header />);

  const profileIcon = screen.getByTestId(datatestIds.profileIcon);
  userEvent.click(profileIcon);
  expect(window.location.pathname).toStrictEqual('/recipes-app/profile');
});
