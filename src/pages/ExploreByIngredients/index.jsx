import { Card, CardActionArea, CardContent, CardMedia,
  Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Index';
import LoadingCircular from '../../components/LoadingCircular';
import { fetchByIngredients, fetchIngredients } from '../../services/apiHelpers';
import client from '../../services/reactQueryClient';

export default function ExploreByIngredients() {
  const navigate = useNavigate();
  const location = window.location.pathname;

  const redirectLocation = location.includes('foods')
    ? '/recipes-app/foods' : '/recipes-app/drinks';

  const { isFetching, data: ingredients } = useQuery(
    ['ingredients', location], () => fetchIngredients(location),
  );

  if (isFetching) {
    return (
      <LoadingCircular open={ isFetching } />
    );
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Header />
      <Grid
        container
        spacing={ { xs: 2, md: 3 } }
        columns={ { xs: 4, sm: 8, md: 12 } }
        sx={ { justifyContent: 'center', py: 2,
        } }
      >
        {ingredients.map((ingredient, index) => (
          <Grid
            item
            xs={ 2 }
            sm={ 4 }
            md={ 4 }
            key={ index }
          >
            <Card sx={ { mt: 2 } }>
              <CardActionArea
                onClick={ ({ target }) => {
                  client.fetchQuery(
                    ['meals', redirectLocation],
                    () => fetchByIngredients(target.name, location),
                  );
                  navigate(redirectLocation);
                } }
              >
                <CardMedia
                  name={ ingredient.strIngredient || ingredient.strIngredient1 }
                  component="img"
                  image={ location.includes('foods')
                    ? `http://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`
                    : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}.png` }
                  alt="meal photo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {ingredient.strIngredient || ingredient.strIngredient1}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Container>
  );
}
