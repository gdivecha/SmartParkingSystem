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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred while logging in.');
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
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;