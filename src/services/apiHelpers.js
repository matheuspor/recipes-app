const MEALS_NUMBER = 12;
const FOODS_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FOODS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const DRINKS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const location = window.location.pathname;

export const fetcher = (url) => fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (data.meals || data.drinks) {
      return (data.meals || data.drinks).slice(0, MEALS_NUMBER);
    }
    return null;
  });

export const fetchMealsByName = (name = '') => (
  location.endsWith('/foods')
    ? fetcher(`${FOODS_API_URL}${name}`)
    : fetcher(`${DRINKS_API_URL}${name}`));

export const fetchMealsByCategories = (name = '') => (
  location.endsWith('/foods')
    ? fetcher(`${FOODS_CATEGORIES}${name}`)
    : fetcher(`${DRINKS_CATEGORIES}${name}`));
