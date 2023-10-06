import Button from '@mui/material/Button';
import styles from "./Button.module.scss";
import { ReactNode } from 'react';

export default function ButtonMUI({ onClick, children }:
  { onClick: () => void, children: ReactNode }) {
  return (
    <Button className={styles.button}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
