'use client';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useRouter } from 'next/navigation';

export default function LoginRegisterPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'login' | 'register' | null
  ) => {
    if (newMode !== null) setMode(newMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (email && password) router.push('/dashboard');
    } else {
      if (email && password && name) router.push('/dashboard');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            {mode === 'login' ? <LockIcon /> : <PersonAddIcon />}
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            {mode === 'login' ? 'Sign In' : 'Register'}
          </Typography>

          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            sx={{ mb: 2 }}
            fullWidth
          >
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="register">Register</ToggleButton>
          </ToggleButtonGroup>

          <Box component="form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              {mode === 'login' ? 'Login' : 'Register'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
