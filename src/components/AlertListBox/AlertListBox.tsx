import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import styleVariables from 'enums/styleVariables.module.scss';
import styles from './AlertListBox.module.scss';

interface AlertListBoxProps {
  children: ReactNode;
}

const AlertListBox = ({ children }: AlertListBoxProps) => {
  return (
    <Box
      className={styles.root}
      sx={{
        '& .BoxClass': {
          borderRight: `1px solid ${styleVariables.offWhite}`,
          position: 'relative',
        },
        '& .BoxClass.BoxClosed:first-child .box_border_2': {
          position: 'absolute',
          top: '10px',
          left: 0,
          width: '1px',
          height: 'calc(100% - 10px)',
          borderLeft: `1px solid ${styleVariables.offWhite}`,
        },
        '& .BoxClass:not(:first-child)': {
          borderLeft: `1px solid ${styleVariables.offWhite}`,
        },
        '& .BoxOpen': {
          borderTop: `1px solid ${styleVariables.offWhite}`,
          borderLeft: `1px solid ${styleVariables.offWhite}`,
        },
        '& .BoxClosed::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '10px',
          display: 'inline-block',
          width: 'calc(100% - 10px)',
          height: '100%',
          borderTop: `1px solid ${styleVariables.offWhite}`,
        },
        '& .BoxClosed::after': {
          position: 'absolute',
          top: '10px',
          left: 0,
          display: 'inline-block',
          width: '1px',
          height: 'calc(100% - 10px)',
          borderLeft: `1px solid ${styleVariables.offWhite}`,
        },
        '& .BoxClosed .box_border_1': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '14px',
          height: '14px',
        },
        '& .BoxClosed .box_border_1::before': {
          content: '""',
          position: 'absolute',
          top: '0.5px',
          left: '-9.3px',
          width: '100%',
          height: '100%',
          borderBottom: `1px solid ${styleVariables.offWhite}`,
          transform: 'rotate(-45deg)',
          transformOrigin: '0 0',
        },
        '&>:last-child': {
          borderBottom: `1px solid ${styleVariables.offWhite}`,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default AlertListBox;
