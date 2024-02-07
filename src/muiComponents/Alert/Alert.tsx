import { ReactNode, useState } from 'react';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Alert.module.scss';

interface AlertComponentMUIProps {
  children: ReactNode;
}

const successIcon = (
  <div className={styles.successRoot}>
    <CheckIcon className={styles.successIcon} />
  </div>
);

const AlertComponentMUI = ({ children }: AlertComponentMUIProps) => {
  const [open, setOpen] = useState(true);
  return (
    <Backdrop open={open} onClick={() => setOpen(false)}>
      <Collapse in={open}>
        <Alert
          severity="success"
          className={styles.alert}
          sx={{
            '& .MuiAlert-icon': {
              position: 'absolute',
              top: -30,
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: 1,
            },
            '& .MuiAlert-action': {
              position: 'absolute',
              top: 10,
              right: 20,
            },
          }}
          iconMapping={{
            success: successIcon,
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {children}
        </Alert>
      </Collapse>
    </Backdrop>
  );
};

export default AlertComponentMUI;
