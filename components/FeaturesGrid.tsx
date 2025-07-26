import FeatureCard from '@/components/FeatureCard';
import { Security, Speed, Devices } from '@mui/icons-material';

const features = [
  {
    icon: <Security fontSize="large" color="primary" />,
    title: 'Secure Login',
    description: 'Your data stays protected with end-to-end encryption.',
  },
  ...
];

// inside return:
<Grid container spacing={4} justifyContent="center">
  {features.map((f, i) => (
    <Grid item xs={12} sm={6} md={4} key={i}>
      <FeatureCard icon={f.icon} title={f.title} description={f.description} />
    </Grid>
  ))}
</Grid>
