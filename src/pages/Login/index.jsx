import { Button, Container, Divider,
  Link, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import useLoginHelper from './helper';

export default function Login() {
  const { isLoginDisabled, handleChange, handleSubmit } = useLoginHelper();

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={ { my: 4 } }
    >
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
          onChange={ handleChange }
        />
        <TextField
          type="password"
          required
          inputProps={ { 'data-testid': 'password-input' } }
          autoComplete="password"
          label="Password"
          variant="outlined"
          onChange={ handleChange }
        />
        <Button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isLoginDisabled }
          variant="contained"
        >
          Enter
        </Button>
      </Stack>
      <Divider sx={ { mt: 5, mb: 2, borderBottomWidth: 2, backgroundColor: 'black' } } />
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {'© '}
        <Link color="text.primary" target="_blank" href="https://github.com/matheuspor/recipes-app">
          matheuspor
        </Link>
        {' 2022'}
      </Typography>
    </Container>
  );
}
