import { useNavigate } from 'react-router-dom';
import { fetchMealsByCategories, fetchRandomMeal } from '../../../services/apiHelpers';
import client from '../../../services/reactQueryClient';

const foodsCategories = ['Random', 'Beef', 'Lamb', 'Chicken', 'Breakfast', 'Dessert'];
const drinksCategories = ['Random', 'Beer', 'Cocktail', 'Cocoa', 'Shot', 'Other/Unknown'];

const useFilterButtonsHelper = () => {
  const location = window.location.pathname;
  const navigate = useNavigate();
  const categoriesByLocation = location.includes('/foods')
    ? foodsCategories : drinksCategories;

  const handleClick = async ({ target: { value } }) => {
    if (value !== 'Random') {
      client.fetchQuery(['meals', location],
        () => fetchMealsByCategories(value, location));
    } else {
      const randomMeal = await fetchRandomMeal(location);
      navigate(`${location}/${randomMeal.idMeal || randomMeal.idDrink}`, {
        state: randomMeal,
      });
    }
  };

  return {
    categories: categoriesByLocation,
    handleClick,
  };
};

export default useFilterButtonsHelper;
