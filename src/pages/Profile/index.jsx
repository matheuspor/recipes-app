import { Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Index';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={ { my: 4 } }
    >
      <Header />
      <Stack
        spacing={ 3 }
        sx={ { alignItems: 'center', textAlign: 'center' } }
      >
        <Typography variant="h5">
          {user.email}
        </Typography>
        <Button
          variant="outlined"
          onClick={ () => navigate('/recipes-app/made-recipes') }
        >
          Made Recipes
        </Button>
        <Button
          variant="outlined"
          onClick={ () => navigate('/recipes-app/favorite-recipes') }
        >
          Favorite Recipes
        </Button>
      </Stack>
      <Footer />
    </Container>
  );
}
