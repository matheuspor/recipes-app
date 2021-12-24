import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

const datatestIds = {
  profileIcon: 'profile-top-btn',
  pageTitle: 'page-title',
  searchIcon: 'search-top-btn',
};
const mocks = {
  location: '/recipes-app',
};

test('Renders login page', () => {
  render(
    <BrowserRouter>
      <Header location={ mocks.location } />
    </BrowserRouter>,
  );
  const treatedLocation = mocks.location.replace('/', '');

  const profileIcon = screen.getByTestId(datatestIds.profileIcon);
  const pageTitle = screen.getByTestId(datatestIds.pageTitle);
  const searchIcon = screen.getByTestId(datatestIds.searchIcon);

  expect(profileIcon).toBeInTheDocument();
  expect(searchIcon).toBeInTheDocument();
  expect(pageTitle.innerHTML).toStrictEqual(treatedLocation);
});
