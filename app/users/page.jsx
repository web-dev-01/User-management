'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  TextField,
  Button
} from '@mui/material';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/users') // Replace with your backend API
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, bgcolor: '#0a0a0a', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
        🧑‍💼 Users
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search by name or email"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            bgcolor: '#1e1e1e',
            input: { color: 'white' },
            fieldset: { borderColor: '#555' },
            '& .MuiOutlinedInput-root:hover fieldset': {
              borderColor: '#888',
            },
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
            <Card
              sx={{
                bgcolor: '#fff',
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: '#1976d2' }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip
                    label={user.role || 'User'}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={user.isVerified ? 'Verified' : 'Unverified'}
                    color={user.isVerified ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  color="info"
                  size="small"
                >
                  View
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
