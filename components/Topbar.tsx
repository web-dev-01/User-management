'use client';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';
import { usePortal } from '@/contexts/PortalContext';

export default function Topbar() {
  const portal = usePortal();

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <img src={portal?.logoUrl} alt="Logo" width={40} height={40} />
          <Typography variant="h6">{portal?.portalName}</Typography>
        </Box>
        <Avatar alt={portal?.owner?.name} src={portal?.owner?.profilePic} />
      </Toolbar>
    </AppBar>
  );
}
