import { createTheme } from '@mui/material/styles';

export const getDynamicTheme = (
  primary: string,
  secondary: string,
  text: string,
  background?: string // 👈 use optional param here
) => {
  return createTheme({
    palette: {
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      text: {
        primary: text,
      },
      background: {
        default: background || '#277145ff', // 👈 safe fallback if not passed
        paper: '#abc8b1ff',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });
};
