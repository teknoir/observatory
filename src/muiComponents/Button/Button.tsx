import Button from '@mui/material/Button';
import styles from './Button.module.scss';
import { ReactNode } from 'react';

// TODO: this component should be extend with props like variant, .etc
export default function ButtonMUI({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button className={styles.button} onClick={onClick}>
      {children}
    </Button>
  );
}
