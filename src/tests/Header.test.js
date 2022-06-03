import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header/Index';

const datatestIds = {
  profileIcon: 'profile-top-btn',
  pageTitle: 'page-title',
  searchIcon: 'search-recipe-btn',
};

describe('Tests Header component', () => {
  describe('When route is /recipes-app/foods', () => {
    test('Renders Header with correct title', async () => {
      renderWithRouter(<Header />, { route: '/recipes-app/foods' });
      await waitFor(() => {
        const profileIcon = screen.getByTestId(datatestIds.profileIcon);
        const pageTitle = screen.getByTestId(datatestIds.pageTitle);
        const searchIcon = screen.getByTestId(datatestIds.searchIcon);
        expect(profileIcon).toBeInTheDocument();
        expect(pageTitle).toBeInTheDocument();
        expect(pageTitle.innerHTML).toStrictEqual('foods');
        expect(searchIcon).toBeInTheDocument();
      });
    });
  });
  describe('When route is /recipes-app/made-recipes', () => {
    test('Renders Header with correct title', async () => {
      renderWithRouter(<Header />, { route: '/recipes-app/made-recipes' });
      await waitFor(() => {
        const profileIcon = screen.getByTestId(datatestIds.profileIcon);
        const pageTitle = screen.getByTestId(datatestIds.pageTitle);
        const searchIcon = screen.getByTestId(datatestIds.searchIcon);
        expect(profileIcon).toBeInTheDocument();
        expect(searchIcon).toBeInTheDocument();
        expect(pageTitle.innerHTML).toStrictEqual('made recipes');
        expect(pageTitle).toBeInTheDocument();
      });
    });
  });
  test('Tests profileIcon redirection', async () => {
    renderWithRouter(<Header />, { route: '/recipes-app/foods' });

    const profileIcon = screen.getByTestId(datatestIds.profileIcon);
    userEvent.click(profileIcon);
    expect(window.location.pathname).toStrictEqual('/recipes-app/profile');
  });
});
