import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <Routes>
      <Route path="/recipes-app" element={ <Login /> } />
      <Route path="/recipes-app/meals" element={ <Meals /> } />
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
