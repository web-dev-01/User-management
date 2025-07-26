'use client';

import React, { useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  alpha
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { AccountCircle, NotificationsNone, Settings } from '@mui/icons-material';

export default function Navbar() {
  const [portalData, setPortalData] = useState({ 
    portalName: 'My Portal', 
    logoUrl: '' 
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const theme = useTheme();
  
  useEffect(() => {
    const fetchPortal = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/portal');
        if (res.ok) {
          const data = await res.json();
          setPortalData(data);
        }
      } catch (error) {
        console.error('Failed to fetch portal data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortal();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleProfile = () => {
    router.push('/profile');
    handleMenuClose();
  };

  const handleSettings = () => {
    router.push('/settings');
    handleMenuClose();
  };

  return (
    <AppBar 
      position="static" 
      elevation={2}
      sx={{
        backgroundColor: theme.palette.primary.main,
        borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between',
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 2, sm: 3 }
        }}
      >
        {/* Left Section - Logo and Brand */}
        <Box 
          display="flex" 
          alignItems="center" 
          gap={2}
          sx={{ cursor: 'pointer' }}
          onClick={() => router.push('/')}
        >
          {portalData.logoUrl ? (
            <Avatar 
              src={portalData.logoUrl} 
              alt="logo"
              sx={{ 
                width: 40, 
                height: 40,
                border: `2px solid ${alpha(theme.palette.secondary.main, 0.2)}`
              }}
            />
          ) : (
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                fontWeight: 'bold'
              }}
            >
              {portalData.portalName.charAt(0).toUpperCase()}
            </Avatar>
          )}
          
          <Typography 
            variant="h6" 
            component="h1"
            sx={{
              fontWeight: 600,
              letterSpacing: 0.5,
              color: theme.palette.primary.contrastText,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            {loading ? 'Loading...' : portalData.portalName}
          </Typography>
        </Box>

        {/* Right Section - Actions */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* Notifications */}
          <IconButton
            color="inherit"
            sx={{
              color: alpha(theme.palette.primary.contrastText, 0.8),
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.primary.contrastText
              }
            }}
          >
            <NotificationsNone />
          </IconButton>

          {/* User Menu */}
          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
            sx={{
              color: alpha(theme.palette.primary.contrastText, 0.8),
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.primary.contrastText
              }
            }}
          >
            <AccountCircle />
          </IconButton>

          {/* Login Button */}
          <Button 
            variant="outlined" 
            onClick={handleLogin}
            sx={{
              color: theme.palette.primary.contrastText,
              borderColor: alpha(theme.palette.secondary.main, 0.5),
              backgroundColor: 'transparent',
              fontWeight: 500,
              textTransform: 'none',
              px: 3,
              py: 1,
              ml: 1,
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                borderColor: theme.palette.secondary.main,
                color: theme.palette.primary.contrastText
              },
              '&:focus': {
                outline: `2px solid ${theme.palette.secondary.main}`,
                outlineOffset: 2
              }
            }}
          >
            Sign In
          </Button>

          {/* User Menu Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 180,
                boxShadow: theme.shadows[8],
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`
              }
            }}
          >
            <MenuItem 
              onClick={handleProfile}
              sx={{
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05)
                }
              }}
            >
              <AccountCircle sx={{ mr: 2, color: theme.palette.primary.main }} />
              Profile
            </MenuItem>
            <MenuItem 
              onClick={handleSettings}
              sx={{
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05)
                }
              }}
            >
              <Settings sx={{ mr: 2, color: theme.palette.primary.main }} />
              Settings
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}