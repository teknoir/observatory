import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavigationBar from './NavigationBar/NavigationBar';
import RightSideBar from './RightSideBar';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MainLayoutProvider } from 'context/mainLayoutContext';
import darkTheme from 'muiThemes/dark';
import DisplaySettingsProvider from "../../context/DisplaySettingsContext/DisplaySettingsProvider.tsx";

export default function MainLayout() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainLayoutProvider>
        <Box sx={{ display: 'flex' }}>
          <NavigationBar />
          <DisplaySettingsProvider>
            <Outlet />
            <RightSideBar />
          </DisplaySettingsProvider>
        </Box>
      </MainLayoutProvider>
    </ThemeProvider>
  );
}
