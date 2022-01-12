import { Button, Grid } from '@mui/material';
import React from 'react';
import useFilterButtonsHelper from './helper';

const FilterButtons = () => {
  const { categories, handleClick } = useFilterButtonsHelper();
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
            sx={ { fontWeight: 'bold' } }
            data-testid={ `${index}-filter-btn` }
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
