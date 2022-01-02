import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardContent,
  CardMedia, Chip, Grid, Typography } from '@mui/material';

export default function MadeFavoriteRecipes({ meal }) {
  const tagsArray = meal.strTags && meal.strTags.split(',');
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
            <Typography variant="body2" color="text.secondary">
              {meal.strArea ? `${meal.strArea} - ${meal.strCategory}`
                : meal.strCategory}
            </Typography>
            <Typography variant="h6" component="div">
              {meal.strMeal || meal.strDrink}
            </Typography>
            <Typography variant="body2">
              {`Made in ${meal.madeIn}`}
            </Typography>
            {tagsArray && tagsArray.map((tag) => (
              <Chip sx={ { mr: 1, mt: 1 } } label={ tag } key={ tag } />
            ))}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

MadeFavoriteRecipes.propTypes = {
  meal: PropTypes.shape({
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
