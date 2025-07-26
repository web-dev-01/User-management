'use client';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import DevicesIcon from '@mui/icons-material/Devices';

const stats = [
  { icon: <GroupIcon fontSize="large" color="primary" />, label: 'Total Users', value: 124 },
  { icon: <VerifiedIcon fontSize="large" color="secondary" />, label: 'Verified Users', value: 102 },
  { icon: <DevicesIcon fontSize="large" color="primary" />, label: 'Assets Tracked', value: 89 },
];

export default function StatsCards() {
  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card elevation={3}>
            <CardContent>
              {stat.icon}
              <Typography variant="h6">{stat.label}</Typography>
              <Typography variant="h5" fontWeight="bold">{stat.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
