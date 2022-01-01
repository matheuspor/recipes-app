import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ meal }) => {
  const navigate = useNavigate();
  return (
    <Card sx={ { mt: 2 } }>
      <CardActionArea
        onClick={ () => navigate(meal.idMeal
          ? `/recipes-app/foods/${meal.idMeal}`
          : `/recipes-app/drinks/${meal.idDrink}`,
        { state: meal }) }
      >
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
      </CardActionArea>
    </Card>
  );
};

RecipeCard.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
