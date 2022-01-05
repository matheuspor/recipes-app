import { Button, Container, Grid } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Index';
import MadeFavoriteRecipesCard from '../../components/MadeFavoriteRecipes';
import context from '../../context/context';

export default function MadeFavoriteRecipes() {
  const location = window.location.pathname;
  const { madeRecipes, favoriteRecipes } = useContext(context);
  const [recipes, setRecipes] = useState();
  const recipesBasedOnLocation = location.includes('favorite')
    ? favoriteRecipes : madeRecipes;

  useEffect(() => {
    setRecipes(recipesBasedOnLocation);
  }, [recipesBasedOnLocation]);

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
              setRecipes(recipesBasedOnLocation);
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
              const justFoods = recipesBasedOnLocation
                .filter((recipe) => Object.prototype.hasOwnProperty
                  .call(recipe, 'strMeal'));
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
              const justDrinks = recipesBasedOnLocation
                .filter((recipe) => Object.prototype.hasOwnProperty
                  .call(recipe, 'strDrink'));
              setRecipes(justDrinks);
            } }
          >
            Drinks
          </Button>
        </Grid>
      </Grid>
      {recipes && recipes.map((meal) => (
        <MadeFavoriteRecipesCard key={ meal.idMeal } meal={ meal } />))}
      <Footer />
    </Container>
  );
}
