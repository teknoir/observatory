import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '../../routes/DarkTheme/Tabs.tsx';
import AppBar from './components/AppBar';
import Main from './components/Main';
import NavigationBar from './NavigationBar';
import RightSideBar from './RightSideBar';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from "muiThemes/dark.ts";

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(true);
  const [openRight, setOpenRight] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpenRight = () => {
    setOpenRight(true);
  };

  const handleDrawerCloseRight = () => {
    setOpenRight(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <NavigationBar
          isOpen={open}
          handleOpen={handleDrawerOpen}
          handleClose={handleDrawerClose}
        />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Main open={open} openRight={openRight}>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
          </Typography>
        </Main>
        <RightSideBar
          isOpen={openRight}
          handleClose={handleDrawerCloseRight}
        >
          <Tabs />
        </RightSideBar>
      </Box>
    </ThemeProvider>
  );
}
