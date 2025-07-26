'use client';
import { Box, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
      <Box mb={2}>{icon}</Box>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={1}>
        {description}
      </Typography>
    </Paper>
  );
}
