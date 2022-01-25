import { screen } from '@testing-library/react';
import React from 'react';
import Recipes from '../pages/Recipes';
import renderWithRouter from './renderWithRouter';
import useRecipesHelper from '../pages/Recipes/helper';

const mocks = {
  mockedMeal: [
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
  ],
  mockedCategories: [{ strArea: 'American' }, { strArea: 'British' },
    { strArea: 'Canadian' }, { strArea: 'Chinese' },
    { strArea: 'Croatian' }, { strArea: 'Dutch' },
    { strArea: 'Egyptian' }, { strArea: 'French' },
    { strArea: 'Greek' }, { strArea: 'Indian' },
    { strArea: 'Irish' }, { strArea: 'Italian' },
    { strArea: 'Jamaican' }, { strArea: 'Japanese' },
    { strArea: 'Kenyan' }, { strArea: 'Malaysian' },
    { strArea: 'Mexican' }, { strArea: 'Moroccan' },
    { strArea: 'Polish' }, { strArea: 'Portuguese' },
    { strArea: 'Russian' }, { strArea: 'Spanish' },
    { strArea: 'Thai' }, { strArea: 'Tunisian' },
    { strArea: 'Turkish' }, { strArea: 'Unknown' }, { strArea: 'Vietnamese' }],
};

const routes = {
  foodsPage: '/recipes-app/foods',
  drinksPage: '/recipes-app/drinks',
  exploreAreaPage: '/recipes-app/explore/foods/area',
};

const testArray = new Array(6).fill(0);

jest.mock('../pages/Recipes/helper');

describe('Tests Recipes Page', () => {
  test('When page is loading', () => {
    useRecipesHelper.mockReturnValue({
      isAnyLoading: true,
    });
    renderWithRouter(<Recipes />, { route: routes.foodsPage });

    const loadingCircular = screen.getByTestId('loading-circular');

    expect(loadingCircular).toBeInTheDocument();
  });

  test('When page doesn\'t have data', () => {
    useRecipesHelper.mockReturnValue({
      isAnyLoading: false,
      meals: null,
    });
    renderWithRouter(<Recipes />, { route: routes.foodsPage });

    const text = screen.getByText('No recipes found...');

    expect(text).toBeInTheDocument();
  });

  test('If meals or drinks are fetched based on pathname', () => {
    useRecipesHelper.mockReturnValue({
      isAnyLoading: false,
      meals: null,
    });
    renderWithRouter(<Recipes />, { route: routes.drinksPage });

    expect(useRecipesHelper).toHaveBeenCalledWith(window.location.pathname);
  });

  test('When page have data', () => {
    useRecipesHelper.mockReturnValue({
      isAnyLoading: false,
      meals: mocks.mockedMeal,
    });
    renderWithRouter(<Recipes />, { route: routes.foodsPage });

    const recipeCard = screen.getByTestId('0-recipe-card');

    expect(recipeCard).toBeInTheDocument();
  });

  test('If filter buttons exist only on main page', () => {
    useRecipesHelper.mockReturnValue({
      isAnyLoading: false,
      meals: mocks.mockedMeal,
    });
    renderWithRouter(<Recipes />, { route: routes.foodsPage });

    testArray.forEach((_item, index) => expect(screen
      .getByTestId(`${index}-filter-btn`)).toBeInTheDocument());
    expect(screen.queryByTestId('country-area-select')).not.toBeInTheDocument();
  });

  test('If explore by origin select exists only on explore by area page', () => {
    useRecipesHelper.mockReturnValue({
      isAnyLoading: false,
      meals: mocks.mockedMeal,
      categories: mocks.mockedCategories,
    });
    renderWithRouter(<Recipes />, { route: routes.exploreAreaPage });

    expect(screen.getByTestId('country-area-select')).toBeInTheDocument();
    testArray.forEach((_item, index) => expect(screen
      .queryByTestId(`${index}-filter-btn`)).not.toBeInTheDocument());
  });
});
