/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react/jsx-max-depth */
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Button, Card, CardActionArea, CardContent,
  CardMedia, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import LoadingCircular from '../../components/LoadingCircular';
import context from '../../context/context';
import { fetchMealById } from '../../services/apiHelpers';

export default function DetailsPage() {
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const { state } = location;
  const navigate = useNavigate();
  const { setMadeRecipes, madeRecipes, setFavoriteRecipes, favoriteRecipes,
  } = useContext(context);

  const checkIfMealAlreadyMade = (mealId) => (madeRecipes
    .some((recipe) => (recipe.idMeal
      ? recipe.idMeal === mealId
      : recipe.idDrink === mealId)));

  const { isFetching, data: meal } = useQuery('meal',
    () => fetchMealById((state.idMeal || state.idDrink), location.pathname));
  const countIngredients = (() => {
    const ingredientsCount = [];
    let count = 1;
    while (meal[`strIngredient${count}`]) {
      ingredientsCount.push(count);
      count += 1;
    }
    return ingredientsCount;
  });

  const splitInstructions = () => meal && meal.strInstructions.split('.');

  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const checkFavorite = favoriteRecipes.some((recipe) => (
    recipe.idMeal
      ? recipe.idMeal === meal.idMeal
      : recipe.idDrink === meal.idDrink));

  useEffect(() => {
    if (checkFavorite) setIsFavorite(true);
    else setIsFavorite(false);
  }, [favoriteRecipes, meal, checkFavorite]);

  if (isFetching) {
    return <LoadingCircular open={ isFetching } />;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={ { my: 4 } }
    >
      <Card sx={ { maxWidth: 600 } } spacing={ 2 }>
        <CardMedia
          component="img"
          height="140"
          image={ meal.strMealThumb || meal.strDrinkThumb }
          alt="meal photo"
        />
        <CardContent>
          <Grid container>
            <Typography variant="h5">
              {meal.strMeal || meal.strDrink}
            </Typography>
            <Grid item sx={ { ml: 'auto' } }>
              <IconButton
                onClick={ () => {
                  if (checkFavorite) {
                    const removeFavorite = favoriteRecipes
                      .filter((recipe) => recipe.idMeal !== meal.idMeal);
                    setFavoriteRecipes(removeFavorite);
                  } else setFavoriteRecipes([...favoriteRecipes, meal]);
                } }
              >
                {isFavorite
                  ? <Favorite sx={ { fontSize: 30 } } />
                  : <FavoriteBorder sx={ { fontSize: 30 } } />}
              </IconButton>
            </Grid>
          </Grid>
          <Typography sx={ { mb: 1.5, mt: -2 } } variant="body2" color="text.secondary">
            {meal.strCategory}
          </Typography>
          <Typography variant="h6" sx={ { mb: 0.5 } }>
            Ingredients
          </Typography>
          <Paper
            elevation={ 6 }
            sx={ { py: 1,
              mb: 2,
              backgroundColor: '#CDCDCD' } }
          >
            {countIngredients().map((count) => (
              <Typography key={ count } variant="body1" sx={ { ml: 1 } }>
                {`- ${meal[`strIngredient${count}`]} - ${meal[`strMeasure${count}`]}`}
              </Typography>
            )) }
          </Paper>
          <Typography variant="h6" sx={ { mb: 0.5 } }>
            Instructions
          </Typography>
          <Paper
            elevation={ 2 }
            sx={ { py: 1,
              mb: 2,
              backgroundColor: '#CDCDCD' } }
          >
            {splitInstructions().map((instruction, index) => (
              instruction && (
                <Typography
                  key={ index }
                  variant="body1"
                  sx={ { ml: 1 } }
                >
                  {`${instruction}.`}
                </Typography>
              ))) }
          </Paper>
          {meal.strYoutube
            && (
              <>
                <Typography variant="h6" sx={ { mb: 0.5 } }>
                  Video
                </Typography>
                <Paper
                  elevation={ 2 }
                  sx={ { py: 1,
                    mb: 2,
                    backgroundColor: '#CDCDCD' } }
                >
                  <CardActionArea>
                    <CardMedia
                      component="iframe"
                      image={ meal.strYoutube.replace('watch?v=', 'embed/') }
                    />
                  </CardActionArea>
                </Paper>
              </>
            ) }
          <Button
            variant="contained"
            sx={ { margin: '0 auto', display: 'flex' } }
            onClick={ () => {
              if (!checkIfMealAlreadyMade(meal.idMeal || meal.idDrink)) {
                const mealWithDate = { ...meal, madeIn: date };
                setMadeRecipes([...madeRecipes, mealWithDate]);
              }
              navigate('/recipes-app/made-recipes');
            } }
          >
            Make Recipe
          </Button>
        </CardContent>
      </Card>
      <Footer />
    </Container>
  );
}

DetailsPage.propTypes = {
  meal: PropTypes.shape({
    strIngredient1: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
  }),
};

DetailsPage.defaultProps = {
  meal: undefined,
};
