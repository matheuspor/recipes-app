import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, FormControlLabel, Grid, Menu,
  Radio, RadioGroup, TextField } from '@mui/material';
import client from '../../../services/reactQueryClient';
import { searchAndFetchMeals } from '../../../services/apiHelpers';

export default function SearchButton({ openPopover, closePopover }) {
  const location = window.location.pathname;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Name');
  return (
    <Menu
      component="form"
      onSubmit={ async (event) => {
        event.preventDefault();
        client.fetchQuery(['meals', location],
          () => searchAndFetchMeals(name, category, location));
      } }
      open={ openPopover }
      onClose={ closePopover }
      anchorOrigin={ {
        horizontal: 'center',
      } }
      sx={ { mt: 3 } }
    >
      <Grid item display="flex" sx={ { mx: 2, mb: 1 } }>
        <TextField
          inputRef={ (input) => input && input.focus() }
          type="text"
          label="Search Recipe"
          variant="filled"
          onChange={ ({ target }) => setName(target.value) }
        />
        <Button
          color="primary"
          sx={ { ml: 2 } }
          type="submit"
        >
          Search
        </Button>
      </Grid>
      <Grid item display="flex" sx={ { mx: 2 } }>
        <RadioGroup
          row
          defaultValue="Name"
          onChange={ ({ target: { value } }) => setCategory(value) }
        >
          <FormControlLabel
            value="Name"
            control={ <Radio /> }
            label="Name"
          />
          <FormControlLabel
            value="Ingredient"
            control={ <Radio /> }
            label="Ingredient"
          />
        </RadioGroup>
      </Grid>
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
