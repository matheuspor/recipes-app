import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const MealCard = ({ meal }) => (
  <Card sx={ { mt: 2 } }>
    <CardMedia
      component="img"
      image={ meal.strMealThumb }
      alt="meal photo"
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {meal.strMeal}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {meal.strCategory}
      </Typography>
    </CardContent>
  </Card>
);

MealCard.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
  }).isRequired,
};

export default MealCard;
