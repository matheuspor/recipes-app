/* eslint-disable react/jsx-max-depth */
import { Card, CardActionArea, CardContent,
  CardMedia, Container, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailsPage = () => {
  const location = useLocation();
  const { state: meal } = location;
  console.log(location);
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={ { my: 4 } }
    >
      <Card sx={ { maxWidth: 600 } } spacing={ 2 }>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={ meal.strMealThumb || meal.strDrinkThumb }
            alt="meal photo"
          />
          <CardContent>
            <Typography variant="h5" sx={ { mb: -0.5 } }>
              {meal.strMeal || meal.strDrink}
            </Typography>
            <Typography sx={ { mb: 1.5 } } variant="body2" color="text.secondary">
              {meal.strCategory}
            </Typography>
            <Typography variant="h6" sx={ { mb: 0.5 } }>
              Ingredients
            </Typography>
            <Paper elevation={ 6 } sx={ { backgroundColor: '#fafafa' } }>
              <Typography variant="body1" sx={ { ml: 1 } }>
                {`- ${meal.strIngredient1} - ${meal.strMeasure1}`}
              </Typography>
            </Paper>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

DetailsPage.propTypes = {
  meal: PropTypes.shape({
    strIngredient1: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
  }).isRequired,
};

export default DetailsPage;
