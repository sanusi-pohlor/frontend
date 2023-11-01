import React from "react";
import AppRoutes from "./AppRoutes";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import THChara from './fonts/TH-Chara.ttf';

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 700; /* ใช้ 700 เพื่อให้มีการแสดงเป็นตัวหนา */
          src: local('Raleway-Bold'), url(${THChara}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <AppRoutes />
    </div></ThemeProvider>
  );
};

export default App;
