import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import context from '../../context/context';
import apiHelpers from '../../services/apiHelpers';
import helperFunctions from '../../services/helperFunctions';

const useDetailsHelper = (id) => {
  const { countIngredients,
    splitInstructions,
    checkIfMealAlreadyMade,
    checkFavorite } = helperFunctions;
  const { fetchMealById } = apiHelpers;
  const { pathname } = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [treatedInstructions, setTreatedInstructions] = useState([]);
  const [ingredientsCount, setIngredientsCount] = useState([]);
  const navigate = useNavigate();
  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  const { setMadeRecipes, madeRecipes, setFavoriteRecipes, favoriteRecipes,
  } = useContext(context);

  const { isFetching, data: meal } = useQuery('meal',
    () => fetchMealById(id, pathname));

  const clickedFavorite = () => {
    if (isFavorite) {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => (
        recipe.idMeal
          ? recipe.idMeal !== id
          : recipe.idDrink !== id)));
    } else setFavoriteRecipes([...favoriteRecipes, meal]);
  };

  const clickedMakeRecipe = () => {
    if (!checkIfMealAlreadyMade(id, madeRecipes)) {
      setMadeRecipes(
        [...madeRecipes, { ...meal, madeIn: date }],
      );
    }
    navigate('/recipes-app/made-recipes');
  };

  useEffect(() => {
    if (meal) {
      checkFavorite(meal, favoriteRecipes, setIsFavorite);
      setTreatedInstructions(splitInstructions(meal));
      setIngredientsCount(countIngredients(meal));
    }
  }, [meal, favoriteRecipes]);

  return { meal,
    isFavorite,
    isFetching,
    clickedFavorite,
    treatedInstructions,
    ingredientsCount,
    clickedMakeRecipe };
};

export default useDetailsHelper;
