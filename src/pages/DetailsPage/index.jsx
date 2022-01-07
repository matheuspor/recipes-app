/* eslint-disable react/jsx-max-depth */
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Button, Card, CardActionArea, CardContent,
  CardMedia, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../components/Footer';
import LoadingCircular from '../../components/LoadingCircular';
import useDetailsHelper from './helper';

export default function DetailsPage() {
  const { isFetching,
    meal,
    ingredientsCount,
    treatedInstructions,
    isFavorite,
    clickedFavorite,
    clickedMakeRecipe,
  } = useDetailsHelper();

  if (isFetching) {
    return <LoadingCircular open={ isFetching } />;
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
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
                onClick={ clickedFavorite }
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
            {ingredientsCount.map((count) => (
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
            {treatedInstructions.map((instruction, index) => (
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
                      sx={ { height: '400px' } }
                    />
                  </CardActionArea>
                </Paper>
              </>
            ) }
          <Button
            variant="contained"
            sx={ { margin: '0 auto', display: 'flex' } }
            onClick={ clickedMakeRecipe }
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
