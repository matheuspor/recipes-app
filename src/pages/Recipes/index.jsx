import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Index';
import LoadingCircular from '../../components/LoadingCircular';
import apiHelpers from '../../services/apiHelpers';
import ExploreByArea from '../ExploreByArea';
import FilterButtons from './FilterButtons';
import RecipeCard from './RecipeCard';

export default function Recipes() {
  const { pathname } = useLocation();
  const { fetchAllMeals, fetchFoodsCountries } = apiHelpers;

  const { isLoading: isFetchingMeals, data: meals } = useQuery(
    ['meals', pathname], () => fetchAllMeals(pathname),
  );

  const { isLoading: isFetchingCategories, data: categories } = useQuery(
    'categories', () => fetchFoodsCountries(),
  );

  const isBothLoading = isFetchingMeals || isFetchingCategories;

  if (isBothLoading) {
    return (
      <LoadingCircular open={ isBothLoading } />
    );
  }
  return (
    <Container
      component="main"
      maxWidth="xs"
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
