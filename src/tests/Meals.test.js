import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import Recipes from '../pages/Recipes';
import renderWithRouter from './renderWithRouter';

const MEALS_NUMBER = 12;

test('Tests Header title on MealsPage', async () => {
  renderWithRouter(<Recipes />, { route: '/recipes-app/meals' });
  await waitFor(() => {
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle.innerHTML).toStrictEqual('meals');
  });
});

test('Renders Meals page and test MealCards', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    Array(MEALS_NUMBER).fill(0).forEach((arr, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    });
  });
});
