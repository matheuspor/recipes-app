const MEALS_NUMBER = 12;
const FOODS_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FOODS_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const DRINKS_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const FOODS_BY_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const DRINKS_BY_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const FOOD_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const ONE_RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const ONE_RANDOM_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const FOODS_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINKS_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const FOODS_AREA = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const FOODS_BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export const fetcher = (url) => fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (data.meals || data.drinks) {
      return (data.meals || data.drinks).slice(0, MEALS_NUMBER);
    }
    return null;
  });

export const fetchMealsByCategories = (name = '', location) => (
  location.includes('/foods')
    ? fetcher(`${FOODS_BY_CATEGORIES}${name}`)
    : fetcher(`${DRINKS_BY_CATEGORIES}${name}`));

export const searchAndFetchMeals = (name = '', category = '', location) => {
  if (category !== 'Name') {
    return location.includes('/foods')
      ? fetcher(`${FOODS_BY_INGREDIENT}${name}`)
      : fetcher(`${DRINKS_BY_INGREDIENT}${name}`);
  }
  return location.includes('/foods')
    ? fetcher(`${FOODS_BY_NAME}${name}`)
    : fetcher(`${DRINKS_BY_NAME}${name}`);
};

export const fetchAllMeals = (location) => {
  if (location.includes('/foods')) {
    return fetcher(FOODS_BY_NAME);
  }
  return fetcher(DRINKS_BY_NAME);
};

export const fetchMealById = (id, location) => {
  if (location.includes('foods')) {
    return fetch(`${FOOD_BY_ID}${id}`)
      .then((response) => response.json())
      .then(({ meals }) => meals[0]);
  }
  return fetch(`${DRINK_BY_ID}${id}`)
    .then((response) => response.json())
    .then(({ drinks }) => drinks[0]);
};

export const fetchRandomMeal = (location) => {
  if (location.includes('foods')) {
    return fetch(ONE_RANDOM_MEAL)
      .then((response) => response.json())
      .then((data) => data.meals[0]);
  }
  return fetch(ONE_RANDOM_DRINK)
    .then((response) => response.json())
    .then((data) => data.drinks[0]);
};

export const fetchIngredients = (location) => {
  if (location.includes('foods')) {
    return fetcher(FOODS_INGREDIENTS);
  }
  return fetcher(DRINKS_INGREDIENTS);
};

export const fetchByIngredients = (ingredient, location) => {
  if (location.includes('foods')) {
    return fetcher(`${FOODS_BY_INGREDIENT}${ingredient}`);
  }
  return fetcher(`${DRINKS_BY_INGREDIENT}${ingredient}`);
};

export const fetchFoodsCountries = () => fetch(FOODS_AREA)
  .then((response) => response.json())
  .then((data) => data.meals);

export const fetchFoodsByArea = (area) => fetcher(`${FOODS_BY_AREA}${area}`);
