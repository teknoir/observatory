import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from "muiThemes/dark";

interface Props {
  children: ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default BaseLayout;
