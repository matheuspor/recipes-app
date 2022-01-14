import { AccountCircle, Search } from '@mui/icons-material';
import { AppBar, IconButton,
  Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchButton from './SearchButton';

const treatLocation = (pathname) => {
  const PATHNAME_LENGTH = 3;
  const untreatedLocation = pathname.split('/');
  if (untreatedLocation.length > PATHNAME_LENGTH) {
    return `${untreatedLocation[2]} ${untreatedLocation[3]}`;
  }
  if (untreatedLocation[2].includes('made')
  || untreatedLocation[2].includes('favorite')) {
    return untreatedLocation[2].replace('-', ' ');
  }
  return untreatedLocation[2];
};

export default function Header() {
  const [openPopover, setOpenPopover] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const treatedLocation = treatLocation(pathname);

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
            color="inherit"
            onClick={ () => navigate('/recipes-app/profile') }
            data-testid="profile-top-btn"
          >
            <AccountCircle
              sx={ { fontSize: 35 } }
            />
          </IconButton>
          <Typography
            variant="h6"
            data-testid="page-title"
            sx={ { textTransform: 'capitalize', px: 4 } }
          >
            {pathname.includes('area') ? 'Explore Origin' : treatedLocation}
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            data-testid="search-recipe-btn"
            onClick={ () => setOpenPopover(!openPopover) }
          >
            <Search sx={ { fontSize: 35 } } />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
