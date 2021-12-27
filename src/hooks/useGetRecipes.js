import { useQuery } from 'react-query';
import { fetcher } from '../services/apiHelpers';

const FOODS_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const fetchMeals = () => {
  const location = window.location.pathname;
  return location.endsWith('/foods')
    ? fetcher(FOODS_API_URL)
    : fetcher(DRINKS_API_URL);
};

const useGetRecipes = () => {
  const { isLoading, data: meals } = useQuery('meals', fetchMeals);
  return { isLoading, meals };
};

export default useGetRecipes;
