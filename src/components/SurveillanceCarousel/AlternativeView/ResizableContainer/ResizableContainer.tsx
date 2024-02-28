import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Resizable from 'components/Resizable/Resizable';
import styles from './ResizableContainer.module.scss';

interface Props {
  children: ReactNode;
}

const ResizableContainer = ({ children }: Props) => (
  <Box sx={{ flexGrow: 1 }}>
    <Resizable
      enable={{
        bottom: true,
      }}
      minHeight={160}
    >
      <Grid container className={styles.container}>
        {children}
      </Grid>
    </Resizable>
  </Box>
);

export default ResizableContainer;
