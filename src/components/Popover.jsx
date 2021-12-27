import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Menu, MenuItem, TextField } from '@mui/material';
import client from '../services/reactQueryClient';
import { fetchMealsByName } from '../services/apiHelpers';

export default function BasicPopover({ openPopover, closePopover }) {
  const [name, setName] = useState('');
  return (
    <div>
      <Menu
        open={ openPopover }
        onClose={ closePopover }
        anchorOrigin={ {
          horizontal: 'center',
        } }
        sx={ { mt: 3 } }
      >
        <MenuItem sx={ { p: 2 } }>
          <TextField
            inputRef={ (input) => input && input.focus() }
            type="text"
            label="Search Recipe"
            variant="filled"
            onChange={ ({ target }) => setName(target.value) }
          />
          <Button
            onClick={ async () => {
              const meals = await fetchMealsByName(name);
              client.setQueryData('meals', meals);
            } }
          >
            Search
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}

BasicPopover.propTypes = {
  openPopover: PropTypes.bool.isRequired,
  closePopover: PropTypes.func.isRequired,
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.string,
  }).isRequired,
};
