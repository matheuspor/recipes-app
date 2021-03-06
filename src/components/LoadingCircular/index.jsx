import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export default function LoadingCircular({ open = true }) {
  return (
    <Backdrop
      sx={ { color: '#fff' } }
      open={ open }
      data-testid="loading-circular"
    >
      <CircularProgress color="inherit" />
    </Backdrop>);
}

LoadingCircular.propTypes = {
  open: PropTypes.bool.isRequired,
};
