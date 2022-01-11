export default {
  countIngredients: ((meal) => {
    const ingredientsCount = [];
    let count = 1;
    while (meal[`strIngredient${count}`]) {
      ingredientsCount.push(count);
      count += 1;
    }
    return ingredientsCount;
  }),

  splitInstructions: (meal) => meal.strInstructions.split('.'),

  checkIfMealAlreadyMade: (mealId, madeRecipes) => (madeRecipes
    .some((recipe) => (recipe.idMeal
      ? recipe.idMeal === mealId
      : recipe.idDrink === mealId))),

  checkFavorite: (meal, favoriteRecipes, setIsFavorite) => setIsFavorite(
    favoriteRecipes.some((recipe) => (
      recipe.idMeal
        ? recipe.idMeal === meal.idMeal
        : recipe.idDrink === meal.idDrink)),
  ),
};
