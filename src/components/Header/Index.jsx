import { AccountCircle, Search } from '@mui/icons-material';
import { AppBar, IconButton,
  Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchButton from './SearchButton';

export default function Header() {
  const [openPopover, setOpenPopover] = useState(false);
  const { pathname } = useLocation();
  const treatedLocation = pathname.split('/')[2];
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
      >
        <SearchButton
          closePopover={ () => setOpenPopover(!openPopover) }
          openPopover={ openPopover }
        />
        <Toolbar sx={ { justifyContent: 'center' } }>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={ () => navigate('recipes-app/profile') }
            data-testid="profile-top-btn"
          >
            <AccountCircle
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
            onClick={ () => setOpenPopover(!openPopover) }
          >
            <Search sx={ { width: 30, height: 30 } } />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
