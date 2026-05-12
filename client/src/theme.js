import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#168aad'
      },
      secondary: {
        main: '#22c55e'
      },
      background: {
        default: mode === 'dark' ? '#071922' : '#f5fbff',
        paper: mode === 'dark' ? '#0f2631' : '#ffffff'
      }
    },
    shape: {
      borderRadius: 8
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 750 },
      button: { textTransform: 'none', fontWeight: 700 }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8 }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 8 }
        }
      }
    }
  });
