import { Button, Container, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Index';

export default function Explore() {
  const navigate = useNavigate();
  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Header />
      <Stack
        comonent="div"
        spacing={ 5 }
        sx={ { textAlign: 'center', mt: '25%' } }
      >
        <Button
          variant="outlined"
          sx={ { py: 4 } }
          onClick={ () => navigate('/recipes-app/explore/foods') }
        >
          Explore Foods
        </Button>
        <Button
          variant="outlined"
          sx={ { py: 4 } }
          onClick={ () => navigate('/recipes-app/explore/drinks') }
        >
          Explore Drinks
        </Button>
      </Stack>
      <Footer />
    </Container>
  );
}
