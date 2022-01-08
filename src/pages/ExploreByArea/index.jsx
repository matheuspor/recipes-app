import PropTypes from 'prop-types';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Stack } from '@mui/material';
import client from '../../services/reactQueryClient';
import { fetchFoodsByArea } from '../../services/apiHelpers';

export default function ExploreByArea({ categories }) {
  const location = window.location.pathname;

  return (
    <Stack
      noValidate
      component="form"
    >
      <FormControl sx={ { minWidth: 120 } }>
        <InputLabel>Country</InputLabel>
        <Select
          data-testid="country-area-select"
          defaultValue=""
          label="Country"
          onChange={ ({ target }) => {
            fetchFoodsByArea(target.value)
              .then((meals) => client.setQueryData(['meals', location], meals));
          } }
        >
          {categories.map((category, index) => (
            <MenuItem key={ index } value={ category.strArea }>
              {category.strArea}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

ExploreByArea.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
