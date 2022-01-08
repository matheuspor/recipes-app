import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './renderWithRouter';
import { searchAndFetchMeals } from '../services/apiHelpers';

const MEALS_NUMBER = 12;
const FILTER_BTN_NUMBER = 5;

const mockedResult = [
  {
    idMeal: '52978',
    strMeal: 'Kumpir',
    strDrinkAlternate: null,
    strCategory: 'Side',
    strArea: 'Turkish',
    strInstructions: 'If you order kumpir in Turkey, the standard filling is first, lots of butter mashed into the potato, followed by cheese. There’s then a row of other toppings that you can just point at to your heart’s content – sweetcorn, olives, salami, coleslaw, Russian salad, allsorts – and you walk away with an over-stuffed potato because you got ever-excited by the choices on offer.\r\n\r\nGrate (roughly – you can use as much as you like) 150g of cheese.\r\nFinely chop one onion and one sweet red pepper.\r\nPut these ingredients into a large bowl with a good sprinkling of salt and pepper, chilli flakes (optional).',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    strTags: 'SideDish',
    strYoutube: 'https://www.youtube.com/watch?v=IEDEtZ4UVtI',
    strIngredient1: 'Potatoes',
    strIngredient2: 'Butter',
    strIngredient3: 'Cheese',
    strIngredient4: 'Onion',
    strIngredient5: 'Red Pepper',
    strIngredient6: 'Red Chile Flakes',
    strIngredient7: '',
    strIngredient8: '',
    strIngredient9: '',
    strIngredient10: '',
    strIngredient11: '',
    strIngredient12: '',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '2 large',
    strMeasure2: '2 tbs',
    strMeasure3: '150g',
    strMeasure4: '1 large',
    strMeasure5: '1 large',
    strMeasure6: 'Pinch',
    strMeasure7: ' ',
    strMeasure8: ' ',
    strMeasure9: ' ',
    strMeasure10: ' ',
    strMeasure11: ' ',
    strMeasure12: ' ',
    strMeasure13: ' ',
    strMeasure14: ' ',
    strMeasure15: ' ',
    strMeasure16: ' ',
    strMeasure17: ' ',
    strMeasure18: ' ',
    strMeasure19: ' ',
    strMeasure20: ' ',
    strSource: 'http://www.turkeysforlife.com/2013/10/firinda-kumpir-turkish-street-food.html',
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
  },
];

jest.spyOn(searchAndFetchMeals, 'default').mockResolvedValue(mockedResult);

const routes = {
  foodsPage: '/recipes-app/foods',
  exploreAreaPage: '/recipes-app/explore/foods/area',
};

test('Tests Header title on RecipesPage and redirection', async () => {
  renderWithRouter(<Recipes />, { route: routes.foodsPage });
  const pageTitle = await screen.findByTestId('page-title');
  const drinksIcon = await screen.findByTestId('drinks-icon-btn');

  expect(pageTitle.innerHTML).toStrictEqual('foods');
  userEvent.click(drinksIcon);
  const drinksTitle = await screen.findByTestId('page-title');
  expect(drinksTitle.innerHTML).toStrictEqual('drinks');
});

test('Renders Recipes page and test RecipesCard', async () => {
  renderWithRouter(<Recipes />, { route: routes.foodsPage });
  const recipesCard = await screen.findByTestId('1-recipe-card');
  await waitFor(() => {
    Array(MEALS_NUMBER).fill(0).forEach((index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    });
  });
  userEvent.click(recipesCard);
  expect(window.location.pathname).toBe('/recipes-app/foods/53060');
});

test('Tests filter buttons exists on the main meals page', async () => {
  renderWithRouter(<Recipes />, { route: routes.foodsPage });
  await waitFor(() => {
    Array(FILTER_BTN_NUMBER).fill(0).forEach((index) => {
      expect(screen.getByTestId(`${index}-filter-btn`)).toBeInTheDocument();
    });
  });
});

test('Tests area select exists on the explore origin page', async () => {
  renderWithRouter(<Recipes />, { route: routes.exploreAreaPage });
  const areaSelect = await screen.findByTestId('country-area-select');
  expect(areaSelect).toBeInTheDocument();
});

test('Tests search recipe button', async () => {
  renderWithRouter(<Recipes />, { route: routes.foodsPage });
  const searchRecipeBtn = await screen.findByTestId('SearchIcon');
  userEvent.click(searchRecipeBtn);
  const searchInput = await screen.findByTestId('search-input');
  expect(searchInput).toBeInTheDocument();
  userEvent.type(searchInput, 'big mac');
  const searchBtn = await screen.findByTestId('submit-search-btn');
  userEvent.click(searchBtn);
  await waitFor(() => {
    const kumpir = screen.getByTestId('1-recipe-card');
    expect(kumpir).not.toBeInTheDocument();
  });
});
