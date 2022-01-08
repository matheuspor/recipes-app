import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, FormControlLabel, Menu,
  MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import client from '../../../services/reactQueryClient';
import { searchAndFetchMeals } from '../../../services/apiHelpers';

export default function SearchButton({ openPopover, closePopover }) {
  const location = window.location.pathname;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Name');
  return (
    <Menu
      component="form"
      open={ openPopover }
      onClose={ closePopover }
      anchorOrigin={ {
        horizontal: 'center',
      } }
      sx={ { mt: 3 } }
    >
      <TextField
        inputRef={ (input) => input && input.focus() }
        inputProps={ { 'data-testid': 'search-input' } }
        type="text"
        label="Search Recipe"
        variant="filled"
        onChange={ ({ target }) => setName(target.value) }
      />
      <Button
        data-testid="submit-search-btn"
        onClick={ async (event) => {
          event.preventDefault();
          client.fetchQuery(['meals', location],
            () => searchAndFetchMeals(name, category, location));
        } }
        color="primary"
        sx={ { ml: 2 } }
        type="submit"
      >
        Search
      </Button>
      <MenuItem sx={ { p: 2 } }>
        <RadioGroup
          row
          defaultValue="Name"
          onChange={ ({ target: { value } }) => setCategory(value) }
        >
          <FormControlLabel value="Name" control={ <Radio /> } label="Name" />
          <FormControlLabel value="Ingredient" control={ <Radio /> } label="Ingredient" />
        </RadioGroup>
      </MenuItem>
    </Menu>
  );
}

SearchButton.propTypes = {
  openPopover: PropTypes.bool.isRequired,
  closePopover: PropTypes.func.isRequired,
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.string,
  }).isRequired,
};
