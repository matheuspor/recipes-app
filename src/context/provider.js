import PropTypes from 'prop-types';
import React, { useState } from 'react';
import context from './context';

export default function Provider({ children }) {
  const [madeRecipes, setMadeRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const contextValue = {
    madeRecipes, favoriteRecipes, setMadeRecipes, setFavoriteRecipes };
  return (
    <context.Provider
      value={ contextValue }
    >
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
