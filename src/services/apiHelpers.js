const MEALS_NUMBER = 12;
const FOODS_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FOODS_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const DRINKS_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const FOODS_BY_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const DRINKS_BY_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const location = window.location.pathname;

export const fetcher = (url) => fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (data.meals || data.drinks) {
      return (data.meals || data.drinks).slice(0, MEALS_NUMBER);
    }
    return null;
  });

export const fetchMealsByCategories = (name = '') => (
  location.endsWith('/foods')
    ? fetcher(`${FOODS_BY_CATEGORIES}${name}`)
    : fetcher(`${DRINKS_BY_CATEGORIES}${name}`));

export const searchAndFetchMeals = (name = '', category = '') => {
  if (category !== 'Name') {
    return location.endsWith('/foods')
      ? fetcher(`${FOODS_BY_INGREDIENT}${name}`)
      : fetcher(`${DRINKS_BY_INGREDIENT}${name}`);
  }
  return location.endsWith('/foods')
    ? fetcher(`${FOODS_BY_NAME}${name}`)
    : fetcher(`${DRINKS_BY_NAME}${name}`);
};
