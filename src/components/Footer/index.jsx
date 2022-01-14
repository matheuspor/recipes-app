import { Explore, LocalBar, RestaurantMenu } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const [value, setValue] = useState();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/recipes-app/foods') {
      setValue(0);
    } else if (path.includes('explore')) {
      setValue(1);
    } else if (path === '/recipes-app/drinks') {
      setValue(2);
    } else setValue('');
  }, []);
  return (
    <>
      <Paper
        sx={ { mt: 4, position: 'fixed', bottom: 0, left: 0, right: 0 } }
        elevation={ 3 }
      >
        <BottomNavigation
          value={ value }
          onChange={ (event, newValue) => {
            setValue(newValue);
          } }
          sx={ {
            backgroundColor: 'primary.main',
            '& .Mui-selected, .Mui-selected > svg': {
              color: 'background.default',
            },
            '& .MuiBottomNavigationAction-root, svg': {
              color: 'secondary.main',
            },
          } }
        >
          <BottomNavigationAction
            onClick={ () => navigate('/recipes-app/foods') }
            label="Foods"
            icon={ <RestaurantMenu /> }
          />
          <BottomNavigationAction
            onClick={ () => navigate('/recipes-app/explore') }
            label="Explore"
            icon={ <Explore /> }
          />
          <BottomNavigationAction
            onClick={ () => navigate('/recipes-app/drinks') }
            label="Drinks"
            icon={ <LocalBar /> }
          />
        </BottomNavigation>
      </Paper>
      <Toolbar />
    </>
  );
}
