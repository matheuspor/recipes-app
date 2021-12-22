import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const MIN_PASSWORD_LENGTH = 6;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formCheck, setFormCheck] = useState(true);

  useEffect(() => {
    if (email && (password.length >= MIN_PASSWORD_LENGTH)) {
      setFormCheck(false);
    } else setFormCheck(true);
  }, [email, password]);

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
      >
        <Typography variant="h2">
          Login
        </Typography>
        <TextField
          required
          autoComplete="email"
          type="email"
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
        <Button disabled={ formCheck } variant="contained">
          Enter
        </Button>
      </Stack>
    </Container>
  );
}
