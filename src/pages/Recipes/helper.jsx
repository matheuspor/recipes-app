import { useQuery } from 'react-query';
import apiHelpers from '../../services/apiHelpers';

const useRecipesHelper = () => {
  const { pathname } = window.location;

  const { fetchAllMeals, fetchFoodsCountries } = apiHelpers;

  const { isFetching: isFetchingMeals, data: meals } = useQuery(
    ['meals', pathname], () => fetchAllMeals(pathname),
  );

  const { isFetching: isFetchingCategories, data: categories } = useQuery(
    'categories', () => fetchFoodsCountries(),
  );

  const isAnyLoading = isFetchingMeals || isFetchingCategories;

  return { pathname, isAnyLoading, meals, categories };
};

export default useRecipesHelper;
