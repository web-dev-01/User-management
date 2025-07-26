'use client';
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Box } from '@mui/material';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" height="100vh" bgcolor="background.default">
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <Topbar />
        <Box p={3} overflow="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
