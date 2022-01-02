import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import DetailsPage from './pages/DetailsPage';
import Explore from './pages/Explore';
import ExploreFoodsDrinks from './pages/ExploreFoodsDrinks';
import ExploreByIngredients from './pages/ExploreByIngredients';
import MadeRecipes from './pages/MadeRecipes';

function App() {
  return (
    <Routes>
      <Route path="/recipes-app/explore" element={ <Explore /> } />
      <Route path="/recipes-app/made-recipes" element={ <MadeRecipes /> } />
      <Route
        path="/recipes-app/explore/foods/ingredients"
        element={ <ExploreByIngredients /> }
      />
      <Route
        path="/recipes-app/explore/drinks/ingredients"
        element={ <ExploreByIngredients /> }
      />
      <Route path="/recipes-app/explore/foods" element={ <ExploreFoodsDrinks /> } />
      <Route path="/recipes-app/explore/drinks" element={ <ExploreFoodsDrinks /> } />
      <Route path="/recipes-app/explore/foods/area" element={ <Recipes /> } />
      <Route path="/recipes-app" element={ <Login /> } />
      <Route path="/recipes-app/foods" element={ <Recipes /> } />
      <Route path="/recipes-app/drinks" element={ <Recipes /> } />
      <Route path="/recipes-app/foods/:id" element={ <DetailsPage /> } />
      <Route path="/recipes-app/drinks/:id" element={ <DetailsPage /> } />
      <Route
        path="/recipes-app/profile"
        element={
          <h1 data-testid="profile-text">Profile</h1>
        }
      />
    </Routes>
  );
}

export default App;
