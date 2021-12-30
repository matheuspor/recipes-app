import { AccountCircle, Search } from '@mui/icons-material';
import { AppBar, IconButton,
  Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchButton from './SearchButton';

export default function Header() {
  const [openPopover, setOpenPopover] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const treatedLocation = () => {
    const PATHNAME_LENGTH = 3;
    const untreatedLocation = pathname.split('/');
    if (untreatedLocation.length > PATHNAME_LENGTH) {
      return `${untreatedLocation[2]} ${untreatedLocation[3]}`;
    }
    return untreatedLocation[2];
  };
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
        <Toolbar sx={ { justifyContent: 'space-evenly' } }>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={ () => navigate('recipes-app/profile') }
            data-testid="profile-top-btn"
          >
            <AccountCircle
              sx={ { width: 35, height: 35 } }
            />
          </IconButton>
          <Typography
            data-testid="page-title"
            variant="h5"
            component="div"
            sx={ { textTransform: 'capitalize' } }
          >
            {treatedLocation()}
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            data-testid="search-top-btn"
            onClick={ () => setOpenPopover(!openPopover) }
          >
            <Search sx={ { width: 35, height: 35 } } />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
