import { Container, Grid } from '@mui/material';
import React from 'react';
import Header from '../../components/Header';
import useGetMeals from '../../hooks/useGetMeals';
import MealCard from './MealCard';

export default function Meals() {
  const { isLoading, meals } = useGetMeals();
  if (isLoading) {
    return (
      <h1>Loading...</h1>
    );
  }
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={ { my: 4, textAlign: 'center' } }
    >
      <Header />
      <Grid container spacing={ { xs: 2, md: 3 } } columns={ { xs: 4, sm: 8, md: 12 } }>
        {meals.map((meal) => (
          <Grid item xs={ 2 } sm={ 4 } md={ 4 } key={ meal.idMeal }>
            <MealCard meal={ meal } />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
