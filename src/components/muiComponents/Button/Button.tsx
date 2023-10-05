import Button from '@mui/material/Button';
import styles from "./Button.module.scss";
import { ReactNode } from 'react';

// TODO: Add children type
export default function ButtonMUI({ children }: { children: ReactNode }) {
  return (
    <Button className={styles.button}>
      {children}
    </Button>
  );
}
