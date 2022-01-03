/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Card, CardContent,
  CardMedia, Chip, Grid, IconButton, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import context from '../../context/context';

export default function MadeFavoriteRecipesCard({ meal }) {
  const location = window.location.pathname;
  const tagsArray = meal.strTags && meal.strTags.split(',');
  const { setFavoriteRecipes, favoriteRecipes } = useContext(context);
  return (
    <Card sx={ { my: 2 } }>
      <Grid container>
        <Grid item xs={ 4 }>
          <CardMedia
            height="200"
            component="img"
            image={ meal.strMealThumb || meal.strDrinkThumb }
            alt="meal photo"
          />
        </Grid>
        <Grid item xs={ 8 }>
          <CardContent>
            <Grid container>
              <Typography variant="body2" color="text.secondary">
                {meal.strArea ? `${meal.strArea} - ${meal.strCategory}`
                  : meal.strCategory}
              </Typography>
              <Grid item sx={ { ml: 'auto', mt: -2 } }>
                {location.includes('favorite')
                && (
                  <IconButton
                    onClick={ () => {
                      const filteredRecipes = favoriteRecipes.filter((recipe) => (
                        recipe.idMeal
                          ? recipe.idMeal !== meal.idMeal
                          : recipe.idDrink !== meal.idDrink));
                      setFavoriteRecipes(filteredRecipes);
                    } }
                  >
                    <Favorite sx={ { fontSize: 30 } } />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Typography variant="h6">
              {meal.strMeal || meal.strDrink}
            </Typography>
            {location.includes('made-recipes') && (
              <Typography variant="body2">
                {`Made in ${meal.madeIn}`}
              </Typography>
            )}
            {tagsArray && tagsArray.map((tag, index) => (
              <Chip sx={ { mr: 1, mt: 1 } } label={ tag } key={ index } />
            ))}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

MadeFavoriteRecipesCard.propTypes = {
  meal: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    madeIn: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
};
