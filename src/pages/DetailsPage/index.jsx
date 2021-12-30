import { Button, Card, CardActionArea, CardContent,
  CardMedia, Container, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMealById } from '../../services/apiHelpers';

export default function DetailsPage() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const { isLoading, data: meal } = useQuery('meal',
    () => fetchMealById((state.idMeal || state.idDrink), location.pathname), {
      cacheTime: 0,
    });

  const countIngredients = (() => {
    const ingredientsCount = [];
    let count = 1;
    while (meal[`strIngredient${count}`]) {
      ingredientsCount.push(count);
      count += 1;
    }
    return ingredientsCount;
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
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
          <Typography variant="h5" sx={ { mb: -0.5 } }>
            {meal.strMeal || meal.strDrink}
          </Typography>
          <Typography sx={ { mb: 1.5 } } variant="body2" color="text.secondary">
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
            <Typography variant="body1" sx={ { ml: 1 } }>
              {meal.strInstructions}
            </Typography>
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
            onClick={ () => (
              navigate(`${location.pathname}/in-progress`)
            ) }
          >
            Start Recipe
          </Button>
        </CardContent>
      </Card>
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
  }).isRequired,
};