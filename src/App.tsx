import { JSX } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Downloads from './pages/Downloads';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#4d9aff' },
    background: { default: '#0b182d', paper: '#091425' },
    secondary: { main: '#f2f2f2' },
  },
  spacing: 8,
});

const App = (): JSX.Element => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Downloads />
    </Box>
  </ThemeProvider>
);

export default App;
