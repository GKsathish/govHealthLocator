import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#0891b2',
        dark: '#0e7490',
        light: '#67e8f9'
      },
      secondary: {
        main: '#10b981',
        dark: '#047857',
        light: '#86efac'
      },
      error: {
        main: '#ef4444'
      },
      background: {
        default: mode === 'dark' ? '#04131b' : '#eef9fb',
        paper: mode === 'dark' ? '#102936' : '#ffffff'
      },
      text: {
        primary: mode === 'dark' ? '#f8fafc' : '#0f2f3a',
        secondary: mode === 'dark' ? '#bdd6df' : '#496873'
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
      h5: { fontWeight: 750 },
      h6: { fontWeight: 720 },
      button: { textTransform: 'none', fontWeight: 700 }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === 'dark'
              ? 'linear-gradient(90deg, rgba(7, 31, 43, 0.92), rgba(13, 80, 84, 0.92))'
              : 'linear-gradient(90deg, rgba(8, 145, 178, 0.94), rgba(13, 148, 136, 0.94))',
            borderBottom: '1px solid rgba(255,255,255,0.16)'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            minHeight: 42
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #0891b2, #0d9488)',
            boxShadow: '0 12px 28px rgba(8, 145, 178, 0.28)',
            '&:hover': {
              boxShadow: '0 16px 34px rgba(8, 145, 178, 0.34)'
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            border: mode === 'dark' ? '1px solid rgba(125, 211, 252, 0.12)' : '1px solid rgba(14, 116, 144, 0.1)',
            boxShadow: mode === 'dark' ? '0 18px 50px rgba(0,0,0,0.28)' : '0 18px 50px rgba(15, 118, 110, 0.12)'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: mode === 'dark' ? '1px solid rgba(125, 211, 252, 0.1)' : '1px solid rgba(14, 116, 144, 0.08)'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? 'rgba(15, 40, 50, 0.72)' : 'rgba(255, 255, 255, 0.74)',
            transition: 'box-shadow 160ms ease, border-color 160ms ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0891b2'
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 4px rgba(8, 145, 178, 0.12)'
            }
          },
          notchedOutline: {
            borderColor: mode === 'dark' ? 'rgba(148, 163, 184, 0.32)' : 'rgba(14, 116, 144, 0.18)'
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            borderRadius: 8
          }
        }
      }
    }
  });
