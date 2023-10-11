import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavigationBar from './NavigationBar';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MainLayoutProvider } from "context/mainLayoutContext";
import darkTheme from "muiThemes/dark.ts";

export default function MainLayout() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainLayoutProvider>
        <Box sx={{ display: 'flex' }}>
          <NavigationBar />
          <Outlet />
        </Box>
      </MainLayoutProvider>
    </ThemeProvider>
  );
}
