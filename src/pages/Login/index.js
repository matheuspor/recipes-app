import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const MIN_PASSWORD_LENGTH = 6;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formCheck, setFormCheck] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (email && (password.length >= MIN_PASSWORD_LENGTH)) {
      setFormCheck(false);
    } else setFormCheck(true);
  }, [email, password]);
  useEffect(() => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/recipes-app/meals');
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={ { my: 4 } }
    >
      <Header location={ location.pathname } />
      <Stack
        component="form"
        spacing={ 3 }
        sx={ { alignItems: 'center', textAlign: 'center' } }
        onSubmit={ handleSubmit }
      >
        <Typography variant="h2">
          Login
        </Typography>
        <TextField
          type="email"
          required
          inputProps={ { 'data-testid': 'email-input' } }
          autoComplete="email"
          label="Email"
          variant="outlined"
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
        <TextField
          type="password"
          required
          inputProps={ { 'data-testid': 'password-input' } }
          autoComplete="password"
          label="Password"
          variant="outlined"
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
        <Button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ formCheck }
          variant="contained"
        >
          Enter
        </Button>
      </Stack>
    </Container>
  );
}
