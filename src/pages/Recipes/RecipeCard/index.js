import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const RecipeCard = ({ meal }) => (
  <Card sx={ { mt: 2 } }>
    <CardMedia
      component="img"
      image={ meal.strMealThumb || meal.strDrinkThumb }
      alt="meal photo"
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {meal.strMeal || meal.strDrink}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {meal.strCategory}
      </Typography>
    </CardContent>
  </Card>
);

RecipeCard.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
