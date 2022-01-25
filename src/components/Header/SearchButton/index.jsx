import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, FormControlLabel, Grid,
  Popover, Radio, RadioGroup, TextField } from '@mui/material';
import client from '../../../services/reactQueryClient';
import { searchAndFetchMeals } from '../../../services/apiHelpers';

export default function SearchButton({ anchorEl, openPopover, closePopover }) {
  const location = window.location.pathname;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Name');
  return (
    <Popover
      component="form"
      onSubmit={ async (event) => {
        event.preventDefault();
        client.fetchQuery(['meals', location],
          () => searchAndFetchMeals(name, category, location));
      } }
      anchorEl={ anchorEl }
      open={ openPopover }
      onClose={ closePopover }
      sx={ { mt: 3 } }
    >
      <Grid item display="flex" sx={ { mx: 2, mt: 2 } }>
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
      <Grid item display="flex" sx={ { mx: 2, my: 1 } }>
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
    </Popover>
  );
}

SearchButton.propTypes = {
  openPopover: PropTypes.bool.isRequired,
  closePopover: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

SearchButton.defaultProps = {
  anchorEl: null,
};
