import { Button, Grid } from '@mui/material';
import React from 'react';
import { fetchMealsByCategories,
  searchAndFetchMeals } from '../../../services/apiHelpers';
import client from '../../../services/reactQueryClient';

const FilterButtons = () => {
  const location = window.location.pathname;
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    const foodsCategories = ['All', 'Beef', 'Lamb', 'Chicken', 'Breakfast', 'Dessert'];
    const drinksCategories = ['All', 'Beer',
      'Cocktail', 'Cocoa', 'Shot', 'Other/Unknown'];
    if (location.endsWith('/foods')) {
      setCategories([...foodsCategories]);
    } else setCategories([...drinksCategories]);
  }, [location]);

  const handleClick = async ({ target: { value } }) => {
    if (value !== 'All') {
      const meals = await fetchMealsByCategories(value);
      client.setQueryData('meals', meals);
    } else {
      const allMeals = await searchAndFetchMeals();
      client.setQueryData('meals', allMeals);
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
