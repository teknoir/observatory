import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: blue[700],
    }
  },
});

export default darkTheme;
