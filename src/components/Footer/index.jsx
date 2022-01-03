import { Explore, LocalBar, RestaurantMenu } from '@mui/icons-material';
import { AppBar, IconButton,
  Toolbar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={ { top: 'auto', bottom: 0 } }
      >
        <Toolbar sx={ { justifyContent: 'center' } }>
          <IconButton
            size="large"
            color="inherit"
            onClick={ () => navigate('/recipes-app/drinks') }
          >
            <LocalBar sx={ { width: 35, height: 35 } } />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            onClick={ () => navigate('/recipes-app/explore') }
            data-testid="profile-top-btn"
            sx={ { mx: 10 } }
          >
            <Explore sx={ { width: 35, height: 35, mx: 8 } } />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            data-testid="search-top-btn"
            onClick={ () => navigate('/recipes-app/foods') }
          >
            <RestaurantMenu sx={ { width: 35, height: 35 } } />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
