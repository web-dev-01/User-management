'use client';
import { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Grid } from '@mui/material';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import Footer from '@/components/Footer';

// Import MUI icons
import {
  Security,
  Speed,
  Devices,
  BarChart,
  FlashOn,
  Storage,
  Business,
} from '@mui/icons-material';

const iconMap: any = {
  Security: <Security fontSize="large" color="primary" />,
  Speed: <Speed fontSize="large" color="primary" />,
  Devices: <Devices fontSize="large" color="primary" />,
  BarChart: <BarChart fontSize="large" color="primary" />,
  FlashOn: <FlashOn fontSize="large" color="primary" />,
  Storage: <Storage fontSize="large" color="primary" />,
  Business: <Business fontSize="large" color="primary" />,
};

export default function LandingPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portal')
      .then(res => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching portal data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
  }

  if (!data || !Array.isArray(data.features)) {
    return <Typography align="center" mt={10}>No features available or portal data is missing.</Typography>;
  }

  return (
    <>
      <Navbar logo={data.logoUrl} title={data.portalName} color={data.primaryColor} />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h3" align="center" fontWeight={600} gutterBottom color={data.primaryColor}>
          Welcome to {data.portalName}
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" mb={5}>
          {data.portalDescription || 'Your all-in-one platform for asset monitoring, analytics, and secure control.'}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {data.features.map((f: any, i: number) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <FeatureCard
                title={f.title}
                description={f.description}
                icon={iconMap[f.icon] || <Business fontSize="large" color="primary" />} // fallback icon
                color={data.primaryColor}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer color={data.secondaryColor} />
    </>
  );
}
