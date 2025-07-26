'use client';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 250;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
  { text: 'User Management', icon: <GroupIcon />, href: '/users' },
  { text: 'Analytics', icon: <BarChartIcon />, href: '/analytics' },
  { text: 'Settings', icon: <SettingsIcon />, href: '/settings' },
];

const adminItems = [
  { text: 'Admin Panel', icon: <AdminPanelSettingsIcon />, href: '/admin' },
];

const supportItems = [
  { text: 'Help Center', icon: <HelpOutlineIcon />, href: '/help' },
  { text: 'Logout', icon: <LogoutIcon />, href: '/login' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#0f172a',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          SaaS Portal
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#334155' }} />

      <List sx={{ mt: 2 }}>
        {navItems.map((item, index) => {
          const active = pathname === item.href;
          return (
            <Link key={index} href={item.href} passHref>
              <ListItemButton
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 2,
                  backgroundColor: active ? '#1e293b' : 'transparent',
                  color: active ? 'primary.main' : '#fff',
                  '&:hover': {
                    backgroundColor: '#1e293b',
                  },
                }}
              >
                <ListItemIcon sx={{ color: active ? 'primary.main' : '#fff' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          );
        })}
      </List>

      <Divider sx={{ borderColor: '#334155', mt: 2 }} />

      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="caption" sx={{ color: '#94a3b8', mb: 1 }}>
          Admin
        </Typography>
        <List>
          {adminItems.map((item, index) => {
            const active = pathname === item.href;
            return (
              <Link key={index} href={item.href} passHref>
                <ListItemButton
                  sx={{
                    mx: 0,
                    my: 0.5,
                    borderRadius: 2,
                    backgroundColor: active ? '#1e293b' : 'transparent',
                    color: active ? 'primary.main' : '#fff',
                    '&:hover': {
                      backgroundColor: '#1e293b',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: active ? 'primary.main' : '#fff' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: '#334155', mt: 2 }} />

      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="caption" sx={{ color: '#94a3b8', mb: 1 }}>
          Support
        </Typography>
        <List>
          {supportItems.map((item, index) => {
            const active = pathname === item.href;
            return (
              <Link key={index} href={item.href} passHref>
                <ListItemButton
                  sx={{
                    mx: 0,
                    my: 0.5,
                    borderRadius: 2,
                    backgroundColor: active ? '#1e293b' : 'transparent',
                    color: active ? 'primary.main' : '#fff',
                    '&:hover': {
                      backgroundColor: '#1e293b',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: active ? 'primary.main' : '#fff' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
