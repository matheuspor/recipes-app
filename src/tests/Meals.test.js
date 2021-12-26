import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import Meals from '../pages/Meals';

const MEALS_NUMBER = 12;

test('Tests Header title on MealsPage', async () => {
  renderWithRouter(<Meals />, { route: '/recipes-app/meals' });
  await waitFor(() => {
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle.innerHTML).toStrictEqual('meals');
  });
});

test('Renders Meals page and test MealCards', async () => {
  renderWithRouter(<Meals />);
  await waitFor(() => {
    Array(MEALS_NUMBER).fill(0).forEach((arr, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    });
  });
});
