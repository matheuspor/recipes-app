import { useQuery } from 'react-query';

const MEALS_NUMBER = 12;

const fetcher = () => (fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((response) => response.json())
  .then((data) => data.meals.slice(0, MEALS_NUMBER)));

const useGetMeals = () => {
  const { isLoading, data: meals } = useQuery('meals', fetcher);

  return { isLoading, meals };
};

export default useGetMeals;
