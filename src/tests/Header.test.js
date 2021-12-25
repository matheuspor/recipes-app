import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import renderWithRouter from './renderWithRouter';

const datatestIds = {
  profileIcon: 'profile-top-btn',
  pageTitle: 'page-title',
  searchIcon: 'search-top-btn',
};
const mocks = {
  location: '/recipes-app/meals',
};

test('Renders meals page and tests header elements', async () => {
  renderWithRouter(<Meals />, { route: mocks.location });

  await waitFor(() => {
    const profileIcon = screen.getByTestId(datatestIds.profileIcon);
    const pageTitle = screen.getByTestId(datatestIds.pageTitle);
    const searchIcon = screen.getByTestId(datatestIds.searchIcon);
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle.innerHTML).toStrictEqual('meals');
  });
});
test('Tests profileIcon redirection', async () => {
  renderWithRouter(<Meals />, { route: mocks.location });

  await waitFor(() => {
    const profileIcon = screen.getByTestId(datatestIds.profileIcon);

    userEvent.click(profileIcon);
  });
  screen.findByText('Profile');
});
