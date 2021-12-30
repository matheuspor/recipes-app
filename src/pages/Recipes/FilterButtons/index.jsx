import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMealsByCategories, fetchRandomMeal } from '../../../services/apiHelpers';
import client from '../../../services/reactQueryClient';

const foodsCategories = ['Random', 'Beef', 'Lamb', 'Chicken', 'Breakfast', 'Dessert'];
const drinksCategories = ['Random', 'Beer', 'Cocktail', 'Cocoa', 'Shot', 'Other/Unknown'];

const FilterButtons = () => {
  const location = window.location.pathname;
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.includes('/foods')) {
      setCategories([...foodsCategories]);
    } else setCategories([...drinksCategories]);
  }, [location]);

  const handleClick = async ({ target: { value } }) => {
    if (value !== 'Random') {
      // eslint-disable-next-line no-unused-vars
      const meals = await fetchMealsByCategories(value, location);
      client.fetchQuery(['meals', location],
        () => fetchMealsByCategories(value, location));
      console.log(test);
      // client.setQueryData(['meals', location], meals);
    } else {
      const randomMeal = await fetchRandomMeal(location);
      navigate(`${location}/${randomMeal.idMeal || randomMeal.idDrink}`, {
        state: randomMeal,
      });
    }
  };
  return (
    <Grid
      container
      sx={ { textAlign: 'center', mb: { xs: 1, md: 3 } } }
      spacing={ 2 }
      columns={ { xs: 4, sm: 12, md: 12 } }
    >
      {categories.map((category, index) => (
        <Grid
          key={ index }
          item
          xs={ 2 }
          sm={ 4 }
          md={ 4 }
        >
          <Button
            value={ category }
            onClick={ handleClick }
            variant="contained"
            color="secondary"
          >
            {category}
          </Button>
        </Grid>
      )) }
    </Grid>
  );
};

export default FilterButtons;
