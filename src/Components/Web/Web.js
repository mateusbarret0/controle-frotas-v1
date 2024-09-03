import { HashRouter, Routes, Route } from 'react-router-dom';
import Main from './Layouts/Main';
import { createContext, useMemo, useState } from 'react';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import './Web.module.css';
import ControleFrotas from './Pages/ControleFrotas/ControleFrotas';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const Web = () => {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#595959' },
          secondary: { main: '#fff' },
          error: {
            background: '#ffd9d9',
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
          },
          warning: {
            background: '#fff3e3',
            light: '#ffb74d',
            main: '#ff9000',
            dark: '#f57c00',
          },
          info: {
            background: '#cfeeff',
            light: '#4fc3f7',
            main: '#29b6f6',
            dark: '#0288d1',
          },
          success: {
            background: '#d9ffdb',
            light: '#81c784',
            main: '#66bb6a',
            dark: '#388e3c',
          },
          detail1: { main: '#8884D9' },
          detail2: { main: '#ff9000' },
          detail3: { main: '#17CAC2' },
          detail4: { main: '#2975BC' },
          detail5: { main: '#3D6FA0' },
        },
        typography: {
          fontFamily: 'Poppins',
          fontSize: 10,
        },
        components: {
          MuiIconButton: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                ...(ownerState.variant === 'reverse' && {
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: ownerState.color
                    ? theme.palette[ownerState.color].main
                    : theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                  backgroundColor: ownerState.color
                    ? theme.palette[ownerState.color].main
                    : theme.palette.primary.main,
                  '&:hover': {
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: ownerState.color
                      ? theme.palette[ownerState.color].main
                      : theme.palette.primary.main,
                    color: ownerState.color
                      ? theme.palette[ownerState.color].main
                      : theme.palette.primary.main,
                    backgroundColor: alpha(
                      theme.palette[ownerState.color].main,
                      0.1,
                    ),
                  },
                  '&:disabled': {
                    borderColor: ownerState.color
                      ? alpha(theme.palette[ownerState.color].main, 0.36)
                      : alpha(theme.palette.primary.main, 0.36),
                    color: ownerState.color
                      ? alpha(theme.palette[ownerState.color].main, 0.52)
                      : alpha(theme.palette.primary.main, 0.52),
                    backgroundColor: theme.palette.secondary.main,
                  },
                }),
              }),
            },
          },
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                ...(ownerState.variant === 'outlined' &&
                ownerState.custom === 'reverse'
                  ? {
                      textTransform: 'none',
                      fontSize: 12,
                      borderColor: ownerState.color
                        ? theme.palette[ownerState.color].main
                        : theme.palette.primary.main,
                      color: theme.palette.secondary.main,
                      backgroundColor: ownerState.color
                        ? theme.palette[ownerState.color].main
                        : theme.palette.primary.main,
                      '&:hover': {
                        borderColor: ownerState.color
                          ? theme.palette[ownerState.color].main
                          : theme.palette.primary.main,
                        color: ownerState.color
                          ? theme.palette[ownerState.color].main
                          : theme.palette.primary.main,
                        backgroundColor: alpha(
                          theme.palette[ownerState.color].main,
                          0.05,
                        ),
                      },
                    }
                  : ownerState.custom === 'color-transparent' && {
                      borderColor: ownerState.color
                        ? theme.palette[ownerState.color].main
                        : theme.palette.primary.main,
                      color: ownerState.color
                        ? theme.palette[ownerState.color].main
                        : theme.palette.primary.main,
                      backgroundColor: ownerState.color
                        ? alpha(theme.palette[ownerState.color].main, 0.1)
                        : alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        borderColor: theme.palette[ownerState.color].main,
                        color: theme.palette[ownerState.color].main,
                        backgroundColor: ownerState.color
                          ? alpha(theme.palette[ownerState.color].main, 0.07)
                          : alpha(theme.palette.primary.main, 0.07),
                      },
                    }),
                '&:disabled': {
                  borderColor: ownerState.color
                    ? alpha(theme.palette[ownerState.color].main, 0.36)
                    : alpha(theme.palette.primary.main, 0.36),
                  color: ownerState.color
                    ? alpha(theme.palette[ownerState.color].main, 0.52)
                    : alpha(theme.palette.primary.main, 0.52),
                  backgroundColor: theme.palette.secondary.main,
                },
              }),
            },
          },
          MuiLoadingButton: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                ...(ownerState.variant === 'outlined' &&
                ownerState.custom === 'reverse'
                  ? {
                      textTransform: 'none',
                      fontSize: 12,
                      borderColor: ownerState.color
                        ? theme.palette[ownerState.color].main
                        : theme.palette.primary.main,
                      color: theme.palette.secondary.main,
                      backgroundColor: ownerState.color
                        ? theme.palette[ownerState.color].main
                        : theme.palette.primary.main,
                      '&:hover': {
                        borderColor: ownerState.color
                          ? theme.palette[ownerState.color].main
                          : theme.palette.primary.main,
                        color: ownerState.color
                          ? theme.palette[ownerState.color].main
                          : theme.palette.primary.main,
                        backgroundColor: alpha(
                          theme.palette[ownerState.color].main,
                          0.05,
                        ),
                      },
                    }
                  : ownerState.custom === 'color-transparent' && {
                      borderColor: ownerState.color
                        ? theme.palette[ownerState.color].main
                        : theme.palette.primary.main,
                      color: ownerState.color
                        ? theme.palette[ownerState.color].main
                        : theme.palette.primary.main,
                      backgroundColor: ownerState.color
                        ? alpha(theme.palette[ownerState.color].main, 0.1)
                        : alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        borderColor: theme.palette[ownerState.color].main,
                        color: theme.palette[ownerState.color].main,
                        backgroundColor: ownerState.color
                          ? alpha(theme.palette[ownerState.color].main, 0.07)
                          : alpha(theme.palette.primary.main, 0.07),
                      },
                    }),
                '&:disabled': {
                  borderColor: ownerState.color
                    ? alpha(theme.palette[ownerState.color].main, 0.36)
                    : alpha(theme.palette.primary.main, 0.36),
                  color: ownerState.color
                    ? alpha(theme.palette[ownerState.color].main, 0.52)
                    : alpha(theme.palette.primary.main, 0.52),
                  backgroundColor: theme.palette.secondary.main,
                },
              }),
            },
          },
          MuiDataGrid: {
            styleOverrides: {
              root: () =>
                theme.unstable_sx({
                  background: theme.palette.secondary.main,
                  borderRadius: 3,
                  pl: 2,
                }),
            },
          },
          MuiBackdrop: {
            styleOverrides: {
              root: () =>
                theme.unstable_sx({
                  color: theme.palette.secondary.main,
                  zIndex: theme.zIndex.drawer + 1,
                }),
            },
          },
          MuiToolbar: {
            styleOverrides: {
              root: () =>
                theme.unstable_sx({
                  height: '8vh',
                }),
            },
          },
        },
      }),
    [mode],
  );
console.log('teste')
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Routes>     
              <Route path="/" element={<Main />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Web;
