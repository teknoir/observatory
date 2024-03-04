import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from './components/AppBar';
import NavigationBar from './NavigationBar/NavigationBarContainer';
import RightSideBar from './RightSideBar/RightSideBar';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MainLayoutProvider } from 'context/mainLayoutContext';
import darkTheme from 'muiThemes/dark';
import { DisplaySettingsProvider } from 'context/DisplaySettingsContext/displaySettingsContext';
import styles from './MainLayout.module.scss';

export default function MainLayout() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainLayoutProvider>
        <Box className={styles.root}>
          <AppBar />
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
