import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/recipes-app" element={ <Login /> } />
    </Routes>
  );
}

export default App;
