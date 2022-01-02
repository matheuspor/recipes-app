import { Button, Container, Grid } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Index';
import MadeFavoriteRecipes from '../../components/MadeFavoriteRecipes';
import context from '../../context/context';

export default function MadeRecipes() {
  const { madeRecipes } = useContext(context);
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    setRecipes(madeRecipes);
  }, [madeRecipes]);

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Header />
      <Grid container spacing={ 2 } sx={ { justifyContent: 'space-evenly' } }>
        <Grid item>
          <Button
            sx={ { mt: 2 } }
            variant="contained"
            onClick={ () => {
              setRecipes(madeRecipes);
            } }
          >
            All
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={ { mt: 2 } }
            variant="contained"
            onClick={ () => {
              const justFoods = madeRecipes.filter((recipe) => Object.keys(recipe)
                .find((key) => key === 'strMeal'));
              setRecipes(justFoods);
            } }
          >
            Food
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={ { mt: 2 } }
            variant="contained"
            onClick={ () => {
              const justDrinks = madeRecipes.filter((recipe) => Object.keys(recipe)
                .find((key) => key === 'strDrink'));
              setRecipes(justDrinks);
            } }
          >
            Drinks
          </Button>
        </Grid>
      </Grid>
      {recipes && recipes.map((meal) => (
        <MadeFavoriteRecipes key={ meal.idMeal } meal={ meal } />))}
      <Footer />
    </Container>
  );
}
