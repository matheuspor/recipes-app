import PropTypes from 'prop-types';
import { AccountCircle, Search } from '@mui/icons-material';
import { AppBar, IconButton,
  Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ location }) {
  const treatedLocation = location.replace('/', '');
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="fixed"
        color="secondary"
      >
        <Toolbar sx={ { justifyContent: 'center' } }>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            data-testid="profile-top-btn"
            onClick={ () => navigate('/recipes-app/profile') }
          >
            <AccountCircle sx={ { width: 30, height: 30 } } />
          </IconButton>
          <Typography
            noWrap
            data-testid="page-title"
            variant="h6"
            component="div"
            sx={ { mx: 4 } }
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

Header.propTypes = {
  location: PropTypes.string.isRequired,
};
