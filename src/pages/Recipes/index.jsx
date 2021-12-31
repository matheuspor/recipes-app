import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Index';
import LoadingCircular from '../../components/LoadingCircular';
import { fetchAllMeals } from '../../services/apiHelpers';
import FilterButtons from './FilterButtons';
import RecipeCard from './RecipeCard';

export default function Recipes() {
  const location = useLocation();
  const { isFetching, data: meals } = useQuery(['meals', location.pathname],
    () => fetchAllMeals(location.pathname), {
      cacheTime: 0,
      staleTime: Infinity,
    });
  if (isFetching) {
    return (
      <LoadingCircular open={ isFetching } />
    );
  }
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={ { my: 2 } }
    >
      <Header />
      <FilterButtons />
      <Grid
        container
        spacing={ { xs: 2, md: 3 } }
        columns={ { xs: 4, sm: 8, md: 12 } }
        sx={ { justifyContent: 'center',
        } }
      >
        {meals ? meals.map((meal, index) => (
          <Grid
            data-testid={ `${index}-recipe-card` }
            item
            xs={ 2 }
            sm={ 4 }
            md={ 4 }
            key={ `${index}-${meal.idMeal}` }
          >
            <RecipeCard meal={ meal } />
          </Grid>
        )) : (
          <Typography
            variant="h6"
            sx={ { mt: 4 } }
          >
            No recipes found...
          </Typography>
        )}
      </Grid>
      <Footer />
    </Container>
  );
}
