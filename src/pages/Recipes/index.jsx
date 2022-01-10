import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Index';
import LoadingCircular from '../../components/LoadingCircular';
import ExploreByArea from '../ExploreByArea';
import FilterButtons from './FilterButtons';
import useRecipesHelper from './helper';
import RecipeCard from './RecipeCard';

export default function Recipes() {
  const { pathname, isAnyLoading, meals, categories } = useRecipesHelper();

  if (isAnyLoading) {
    return (
      <LoadingCircular open={ isAnyLoading } />
    );
  }
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={ { my: 2 } }
    >
      <Header />
      {pathname.includes('explore')
        ? (
          <ExploreByArea categories={ categories } />
        )
        : (
          <FilterButtons />
        )}
      <Grid
        container
        spacing={ { xs: 2, md: 3 } }
        columns={ { xs: 4, sm: 8, md: 12 } }
        sx={ { justifyContent: 'center',
        } }
      >
        {meals ? meals.map((meal, index) => (
          <Grid
            item
            xs={ 2 }
            sm={ 4 }
            md={ 4 }
            key={ `${index}-${meal.idMeal}` }
          >
            <RecipeCard dataTestid={ `${index}-recipe-card` } meal={ meal } />
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
