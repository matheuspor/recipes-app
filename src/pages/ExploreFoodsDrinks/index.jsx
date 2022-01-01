import { Button, Container, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Index';
import { fetchRandomMeal } from '../../services/apiHelpers';

export default function ExploreFoodsDrinks() {
  const navigate = useNavigate();
  const location = window.location.pathname;
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={ { mb: 10 } }
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
          onClick={ () => navigate(`${location}/ingredients`) }
        >
          By Ingredients
        </Button>
        {location.includes('foods') && (
          <Button
            variant="outlined"
            sx={ { py: 4 } }
            onClick={ () => navigate(`${location}/area`) }
          >
            By Area
          </Button>
        )}
        <Button
          variant="outlined"
          sx={ { py: 4 } }
          onClick={ async () => {
            const randomMeal = await fetchRandomMeal(location);
            const treatedLocation = location.replace('/explore', '');
            navigate(`${treatedLocation}/${randomMeal.idMeal || randomMeal.idDrink}`,
              {
                state: randomMeal,
              });
          } }
        >
          Surprise Me!
        </Button>
      </Stack>
      <Footer />
    </Container>
  );
}
