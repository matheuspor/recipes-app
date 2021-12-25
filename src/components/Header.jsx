import { AccountCircle, Search } from '@mui/icons-material';
import { AppBar, IconButton,
  Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const treatedLocation = pathname.split('/')[2];
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
      >
        <Toolbar sx={ { justifyContent: 'center' } }>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={ () => navigate('/recipes-app/profile') }
          >
            <AccountCircle
              data-testid="profile-top-btn"
              sx={ { width: 30, height: 30 } }
            />
          </IconButton>
          <Typography
            data-testid="page-title"
            variant="h6"
            component="div"
            sx={ { mx: 4, textTransform: 'capitalize' } }
          >
            {treatedLocation}
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            data-testid="search-top-btn"
          >
            <Search sx={ { width: 30, height: 30 } } />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
