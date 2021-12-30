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
        <Toolbar sx={ { justifyContent: 'space-between' } }>
          <IconButton
            size="large"
            color="inherit"
            onClick={ () => navigate('/recipes-app/drinks') }
          >
            <LocalBar sx={ { width: 30, height: 30 } } />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={ () => navigate('/recipes-app/explore') }
            data-testid="profile-top-btn"
          >
            <Explore sx={ { width: 30, height: 30 } } />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            data-testid="search-top-btn"
            onClick={ () => navigate('/recipes-app/foods') }
          >
            <RestaurantMenu sx={ { width: 30, height: 30 } } />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
