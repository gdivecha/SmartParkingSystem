import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // On successful signup, navigate to login
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupForm;