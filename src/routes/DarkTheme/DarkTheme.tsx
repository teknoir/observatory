import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from "muiThemes/dark";

import Typography from '@mui/material/Typography';
import Box from "./Box";
import Buttons from "./Buttons";
import Menu from "./Menu";
import Select from "./Select";
import Tabs  from "./Tabs";
import Dialog  from "./Dialog";
import TypographyComponent  from "./Typography";

const DarkTheme = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Typography variant="h4" gutterBottom>
        Dark Theme
      </Typography>
      <Box>
        <Typography variant="h6" gutterBottom>
          Buttons
        </Typography>
        <Buttons />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Menu
        </Typography>
        <Menu />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Select
        </Typography>
        <Select />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Tabs
        </Typography>
        <Tabs />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Dialog
        </Typography>
        <Dialog />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Typography
        </Typography>
        <TypographyComponent />
      </Box>
      {/*<Box>*/}
      {/*  <Typography variant="h6" gutterBottom>*/}
      {/*    PersistentDrawerLeft*/}
      {/*  </Typography>*/}
      {/*  <PersistentDrawerLeft />*/}
      {/*</Box>*/}

    </ThemeProvider>
  )
}

export default DarkTheme
