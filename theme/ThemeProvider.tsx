// /app/theme/ThemeProvider.tsx
'use client';

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { buildTheme } from './theme';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(buildTheme('#1976d2', '#f50057', '#000')); // default colors

  useEffect(() => {
    fetch('/api/portal') // replace with actual API if needed
      .then(res => res.json())
      .then((data) => {
        const { primaryColor, secondaryColor, textColor } = data;
        setTheme(buildTheme(primaryColor, secondaryColor, textColor));
      })
      .catch(() => {
        console.warn('Failed to load theme from API. Using default.');
      });
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
