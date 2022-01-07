import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import context from '../../context/context';
import apiHelpers from '../../services/apiHelpers';

const countIngredients = ((meal) => {
  const ingredientsCount = [];
  let count = 1;
  while (meal[`strIngredient${count}`]) {
    ingredientsCount.push(count);
    count += 1;
  }
  return ingredientsCount;
});

const splitInstructions = (meal) => meal.strInstructions.split('.');

const checkIfMealAlreadyMade = (mealId, madeRecipes) => (madeRecipes
  .some((recipe) => (recipe.idMeal
    ? recipe.idMeal === mealId
    : recipe.idDrink === mealId)));

const checkFavorite = (meal, favoriteRecipes, setIsFavorite) => setIsFavorite(
  favoriteRecipes.some((recipe) => (
    recipe.idMeal
      ? recipe.idMeal === meal.idMeal
      : recipe.idDrink === meal.idDrink)),
);

const useDetailsHelper = () => {
  const { fetchMealById } = apiHelpers;
  const { state, pathname } = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [treatedInstructions, setTreatedInstructions] = useState([]);
  const [ingredientsCount, setIngredientsCount] = useState([]);
  const navigate = useNavigate();
  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  const { setMadeRecipes, madeRecipes, setFavoriteRecipes, favoriteRecipes,
  } = useContext(context);

  const { isFetching, data: meal } = useQuery('meal',
    () => fetchMealById((state.idMeal || state.idDrink), pathname));

  const clickedFavorite = () => {
    if (isFavorite) {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => (
        recipe.idMeal
          ? recipe.idMeal !== state.idMeal
          : recipe.idDrink !== state.idDrink)));
    } else setFavoriteRecipes([...favoriteRecipes, meal]);
  };

  const clickedMakeRecipe = () => {
    if (!checkIfMealAlreadyMade(state.idMeal || state.idDrink, madeRecipes)) {
      setMadeRecipes(
        [...madeRecipes, { ...meal, madeIn: date }],
      );
    }
    navigate('/recipes-app/made-recipes');
  };

  useEffect(() => {
    checkFavorite(meal, favoriteRecipes, setIsFavorite);
    if (meal) {
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
