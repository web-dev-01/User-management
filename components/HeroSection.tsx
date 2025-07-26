'use client';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  return (
    <Box sx={{ py: 12, bgcolor: 'background.paper', textAlign: 'center' }}>
      <Container>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to AssetPro
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Your complete asset tracking & management SaaS solution.
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => router.push('/login')}>
          Get Started
        </Button>
      </Container>
    </Box>
  );
}
