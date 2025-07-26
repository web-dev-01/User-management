'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Stack,
  Chip,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
  Email,
  Phone,
  LocationOn,
  Send,
  ArrowUpward
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface FooterProps {
  color?: string;
}

export default function Footer({ color }: FooterProps) {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const theme = useTheme();
  const router = useRouter();
  
  const currentYear = new Date().getFullYear();
  
  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setSubscriptionStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
      setEmail('');
      
      // Reset status after 3 seconds
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    } catch (error) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    }
  };

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Footer links data
  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Asset Management', href: '/services/management' },
        { label: 'Portfolio Analytics', href: '/services/analytics' },
        { label: 'Risk Assessment', href: '/services/risk' },
        { label: 'Consulting', href: '/services/consulting' },
        { label: 'API Access', href: '/services/api' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Help Center', href: '/help' },
        { label: 'Community', href: '/community' },
        { label: 'Webinars', href: '/webinars' },
        { label: 'Case Studies', href: '/case-studies' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Compliance', href: '/compliance' },
        { label: 'Security', href: '/security' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, href: 'https://facebook.com/assetpro', label: 'Facebook' },
    { icon: <Twitter />, href: 'https://twitter.com/assetpro', label: 'Twitter' },
    { icon: <LinkedIn />, href: 'https://linkedin.com/company/assetpro', label: 'LinkedIn' },
    { icon: <Instagram />, href: 'https://instagram.com/assetpro', label: 'Instagram' },
    { icon: <YouTube />, href: 'https://youtube.com/assetpro', label: 'YouTube' }
  ];

  const footerBgColor = color || theme.palette.primary.main;

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: footerBgColor,
        color: theme.palette.primary.contrastText,
        mt: 'auto',
        position: 'relative'
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Company Info & Newsletter */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: theme.palette.secondary.main
                }}
              >
                AssetPro Inc.
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Leading the future of asset management with innovative solutions and cutting-edge technology.
              </Typography>
              
              {/* Contact Info */}
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Email sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
                  <Typography variant="body2">contact@assetpro.com</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Phone sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
                  <Typography variant="body2">+1 (555) 123-4567</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOn sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
                  <Typography variant="body2">New York, NY 10001</Typography>
                </Box>
              </Stack>

              {/* Newsletter Signup */}
              <Box component="form" onSubmit={handleNewsletterSubmit} sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Stay Updated
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscriptionStatus === 'loading'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          size="small"
                          disabled={subscriptionStatus === 'loading' || !email.trim()}
                          sx={{ color: theme.palette.secondary.main }}
                        >
                          <Send fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: alpha(theme.palette.common.white, 0.1),
                      color: theme.palette.primary.contrastText,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha(theme.palette.secondary.main, 0.3)
                      }
                    }
                  }}
                />
                {subscriptionStatus === 'success' && (
                  <Typography variant="caption" sx={{ color: theme.palette.success.main, mt: 1 }}>
                    Successfully subscribed!
                  </Typography>
                )}
                {subscriptionStatus === 'error' && (
                  <Typography variant="caption" sx={{ color: theme.palette.error.main, mt: 1 }}>
                    Subscription failed. Please try again.
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <Grid item xs={6} sm={3} md={2} key={index}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: theme.palette.secondary.main,
                  fontSize: '1rem'
                }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(link.href);
                    }}
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        opacity: 1,
                        color: theme.palette.secondary.main,
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider sx={{ borderColor: alpha(theme.palette.secondary.main, 0.2) }} />

      {/* Bottom Footer */}
      <Container maxWidth="lg">
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          {/* Copyright */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © {currentYear} AssetPro Inc. All rights reserved.
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Chip
                label="SOC 2 Compliant"
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.secondary.main, 0.2),
                  color: theme.palette.secondary.main,
                  fontSize: '0.7rem'
                }}
              />
              <Chip
                label="ISO 27001"
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.secondary.main, 0.2),
                  color: theme.palette.secondary.main,
                  fontSize: '0.7rem'
                }}
              />
            </Box>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  color: 'inherit',
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    color: theme.palette.secondary.main,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            zIndex: 1000,
            '&:hover': {
              bgcolor: theme.palette.secondary.dark,
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
          aria-label="Scroll to top"
        >
          <ArrowUpward />
        </IconButton>
      )}
    </Box>
  );
}