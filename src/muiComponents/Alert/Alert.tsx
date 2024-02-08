import { ReactNode, useState } from 'react';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import styleVariables from 'enums/styleVariables.module.scss';
import styles from './Alert.module.scss';

type AlertSeverity = 'success' | 'error';

interface AlertComponentMUIProps {
  children: ReactNode;
  severity: AlertSeverity;
}

const iconColor = {
  success: styleVariables.greenSuccess,
  error: styleVariables.redAlert,
};

const iconContainer = (children: ReactNode, severity: AlertSeverity) => {
  const color = { backgroundColor: iconColor[severity] };
  return (
    <div className={styles.iconContainer} style={color}>
      <div className={styles.iconBackground} style={color} />
      {children}
    </div>
  );
};

const iconMapping = {
  success: iconContainer(<CheckIcon />, 'success'),
  error: iconContainer(<CloseIcon />, 'error'),
};

const AlertComponentMUI = ({ children, severity }: AlertComponentMUIProps) => {
  const [open, setOpen] = useState(true);
  return (
    <Backdrop open={open} onClick={() => setOpen(false)}>
      <Collapse in={open}>
        <Alert
          severity={severity}
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
            '&::after': {
              backgroundColor: iconColor[severity],
            },
          }}
          iconMapping={iconMapping}
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
          <Typography variant="BodyLarge">{children}</Typography>
        </Alert>
      </Collapse>
    </Backdrop>
  );
};

export default AlertComponentMUI;
